import {
	type ChangeEvent,
	type DragEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';
import { notification } from '../../Notification/Notification';
import type {
	FileId,
	FileStatus,
	FileUploaderMetaInfo,
	FileUploaderProps,
	MultipleFileUploaderProps,
	SingleFileUploaderProps,
	UploadFile,
} from '../types';
import {
	compareFile,
	createUploadFile,
	toFileArray,
	validateFile,
} from '../utils';

const DEFAULT_FILE_STATUS: FileStatus = {
	isLoading: false,
	isUploadError: false,
	isRestrictionError: false,
};

const ABORT_ERROR_MESSAGE = 'Загрузка прервана';
const UPLOAD_ERROR_MESSAGE = 'Ошибка загрузки файла';

function toError(error: unknown) {
	return error instanceof Error ? error : new Error(String(error));
}

function replaceFile(
	files: UploadFile[],
	fileId: FileId,
	update: (file: UploadFile) => UploadFile,
) {
	const fileIndex = files.findIndex(({ id }) => id === fileId);

	if (fileIndex < 0) return files;

	const nextFiles = [...files];
	nextFiles[fileIndex] = update(files[fileIndex]);

	return nextFiles;
}

function useFileUploader(props: FileUploaderProps) {
	const {
		value,
		onChange,
		isMultiple = false,
		maxFileCount,
		accept = [],
		maxFileSize,
		restrictions,
		onUploadFile,
		onDeleteFile,
		getErrorMessage,
		isDisabled,
		notify = notification,
	} = props;
	const generatedId = useId();
	const nextFileId = useRef(0);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dragDepth = useRef(0);
	const controllers = useRef(new Map<FileId, AbortController>());
	const metaInfoByFileId = useRef(new Map<FileId, FileUploaderMetaInfo>());
	const isMounted = useRef(true);
	const files = useMemo(() => toFileArray(value), [value]);
	const filesRef = useRef(files);
	const [isDragActive, setIsDragActive] = useState(false);
	const [deletingFileIds, setDeletingFileIds] = useState<Set<FileId>>(
		new Set(),
	);
	const effectiveMaxFileCount = isMultiple ? (maxFileCount ?? 1) : 1;

	const emitFiles = useCallback(
		(nextFiles: UploadFile[], metaInfo?: FileUploaderMetaInfo) => {
			filesRef.current = nextFiles;

			if (isMultiple) {
				(onChange as MultipleFileUploaderProps['onChange'])(
					nextFiles,
					metaInfo,
				);
				return;
			}

			(onChange as SingleFileUploaderProps['onChange'])(
				nextFiles[0] ?? null,
				metaInfo,
			);
		},
		[isMultiple, onChange],
	);

	const updateFile = useCallback(
		(
			fileId: FileId,
			update: (file: UploadFile) => UploadFile,
			metaInfo = metaInfoByFileId.current.get(fileId),
		) => {
			const currentFiles = filesRef.current;
			const nextFiles = replaceFile(currentFiles, fileId, update);

			if (nextFiles !== currentFiles && isMounted.current) {
				emitFiles(nextFiles, metaInfo);
			}
		},
		[emitFiles],
	);

	const uploadFile = useCallback(
		(fileToUpload: UploadFile, metaInfo?: FileUploaderMetaInfo) => {
			const { id: fileId, file } = fileToUpload;

			if (!onUploadFile || !file) return;

			controllers.current.get(fileId)?.abort();

			const controller = new AbortController();
			controllers.current.set(fileId, controller);
			if (metaInfo) metaInfoByFileId.current.set(fileId, metaInfo);

			updateFile(
				fileId,
				(currentFile) => ({
					...currentFile,
					status: {
						...DEFAULT_FILE_STATUS,
						isLoading: true,
						progress: 0,
					},
				}),
				metaInfo,
			);

			onUploadFile(fileId, file, {
				signal: controller.signal,
				setProgress: (progressFileId, progress) => {
					if (controller.signal.aborted || !isMounted.current) return;

					const targetFileId = progressFileId || fileId;
					const progressValue = progress.total
						? Math.round((progress.loaded * 100) / progress.total)
						: undefined;

					updateFile(targetFileId, (currentFile) => ({
						...currentFile,
						status: {
							...DEFAULT_FILE_STATUS,
							isLoading: true,
							progress: progressValue,
						},
					}));
				},
			})
				.then((uploadedFile) => {
					if (controller.signal.aborted || !isMounted.current) return;

					updateFile(fileId, (currentFile) => ({
						...currentFile,
						...uploadedFile,
						status: DEFAULT_FILE_STATUS,
					}));
				})
				.catch((error: unknown) => {
					if (controller.signal.aborted || !isMounted.current) return;

					const errorMessage =
						getErrorMessage?.(fileId, toError(error)) ?? UPLOAD_ERROR_MESSAGE;

					updateFile(fileId, (currentFile) => ({
						...currentFile,
						status: {
							...DEFAULT_FILE_STATUS,
							isUploadError: true,
							errorMsg: errorMessage,
						},
					}));
				})
				.finally(() => {
					if (controllers.current.get(fileId) === controller) {
						controllers.current.delete(fileId);
					}
				});
		},
		[getErrorMessage, onUploadFile, updateFile],
	);

	const addFiles = useCallback(
		(
			fileList: FileList | File[],
			inputSourceType: FileUploaderMetaInfo['inputSourceType'],
		) => {
			if (isDisabled) return;

			const incomingFiles = Array.from(fileList);
			const currentFiles = filesRef.current;
			const uniqueFiles = incomingFiles.filter((file, index, allFiles) => {
				const alreadyAdded = currentFiles.some((currentFile) =>
					compareFile(file, currentFile),
				);
				const duplicateInSelection = allFiles.findIndex(
					(candidate) =>
						candidate.name === file.name && candidate.size === file.size,
				);

				return !alreadyAdded && duplicateInSelection === index;
			});
			const availableSlots = Math.max(
				0,
				effectiveMaxFileCount - currentFiles.length,
			);
			const selectedFiles = uniqueFiles.slice(0, availableSlots);
			const metaInfo = { inputSourceType } satisfies FileUploaderMetaInfo;
			const newFiles = selectedFiles.map((file) => {
				const error = validateFile(file, {
					accept,
					maxFileSize,
					restrictions,
				});
				const id = `${generatedId}-${nextFileId.current++}`;

				metaInfoByFileId.current.set(id, metaInfo);

				return createUploadFile(file, id, error);
			});

			if (newFiles.length) {
				const nextFiles = isMultiple
					? [...currentFiles, ...newFiles]
					: newFiles.slice(0, 1);

				emitFiles(nextFiles, metaInfo);
				newFiles
					.filter(({ status }) => !status?.isRestrictionError)
					.forEach((file) => {
						uploadFile(file, metaInfo);
					});
			}

			if (uniqueFiles.length > selectedFiles.length) {
				notify.warning('Не все файлы добавлены', {
					content: `Можно загрузить не более ${effectiveMaxFileCount}`,
				});
			}
		},
		[
			accept,
			effectiveMaxFileCount,
			emitFiles,
			generatedId,
			isDisabled,
			isMultiple,
			maxFileSize,
			notify,
			restrictions,
			uploadFile,
		],
	);

	const abortUpload = useCallback(
		(fileId: FileId) => {
			controllers.current.get(fileId)?.abort();
			controllers.current.delete(fileId);

			updateFile(fileId, (currentFile) => ({
				...currentFile,
				status: {
					...DEFAULT_FILE_STATUS,
					isUploadError: true,
					errorMsg: ABORT_ERROR_MESSAGE,
				},
			}));
		},
		[updateFile],
	);

	const retryUpload = useCallback(
		(fileId: FileId) => {
			const file = filesRef.current.find(({ id }) => id === fileId);

			if (file?.file) uploadFile(file, metaInfoByFileId.current.get(fileId));
		},
		[uploadFile],
	);

	const removeFile = useCallback(
		(fileId: FileId) => {
			controllers.current.get(fileId)?.abort();
			controllers.current.delete(fileId);
			metaInfoByFileId.current.delete(fileId);
			emitFiles(filesRef.current.filter(({ id }) => id !== fileId));
		},
		[emitFiles],
	);

	const deleteFile = useCallback(
		async (fileId: FileId) => {
			if (!onDeleteFile) {
				removeFile(fileId);
				return;
			}

			setDeletingFileIds((current) => new Set(current).add(fileId));

			try {
				await onDeleteFile(fileId);
				if (isMounted.current) removeFile(fileId);
			} catch {
				if (isMounted.current) notify.error('Ошибка удаления файла');
			} finally {
				if (isMounted.current) {
					setDeletingFileIds((current) => {
						const next = new Set(current);
						next.delete(fileId);
						return next;
					});
				}
			}
		},
		[notify, onDeleteFile, removeFile],
	);

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (event.currentTarget.files) {
				addFiles(event.currentTarget.files, 'fileInput');
			}

			event.currentTarget.value = '';
		},
		[addFiles],
	);

	const onDragEnter = useCallback(
		(event: DragEvent<HTMLElement>) => {
			event.preventDefault();
			if (isDisabled || !event.dataTransfer.types.includes('Files')) return;

			dragDepth.current += 1;
			setIsDragActive(true);
		},
		[isDisabled],
	);

	const onDragOver = useCallback(
		(event: DragEvent<HTMLElement>) => {
			event.preventDefault();
			if (!isDisabled) event.dataTransfer.dropEffect = 'copy';
		},
		[isDisabled],
	);

	const onDragLeave = useCallback((event: DragEvent<HTMLElement>) => {
		event.preventDefault();
		dragDepth.current = Math.max(0, dragDepth.current - 1);
		if (dragDepth.current === 0) setIsDragActive(false);
	}, []);

	const onDrop = useCallback(
		(event: DragEvent<HTMLElement>) => {
			event.preventDefault();
			dragDepth.current = 0;
			setIsDragActive(false);
			if (!isDisabled) addFiles(event.dataTransfer.files, 'dragAndDrop');
		},
		[addFiles, isDisabled],
	);

	useEffect(() => {
		filesRef.current = files;

		for (const [fileId, controller] of controllers.current) {
			if (!files.some(({ id }) => id === fileId)) {
				controller.abort();
				controllers.current.delete(fileId);
				metaInfoByFileId.current.delete(fileId);
			}
		}
	}, [files]);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
			for (const controller of controllers.current.values()) {
				controller.abort();
			}
			controllers.current.clear();
		};
	}, []);

	return {
		abortUpload,
		deleteFile,
		deletingFileIds,
		files,
		inputRef,
		isDragActive,
		isLimitReached: files.length >= effectiveMaxFileCount,
		onDragEnter,
		onDragLeave,
		onDragOver,
		onDrop,
		onInputChange,
		retryUpload,
	};
}

export { useFileUploader };
