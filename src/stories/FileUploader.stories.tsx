import { useCallback, useRef, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import {
	FileUploader,
	type FileUploadProgress,
	type UploadedFileData,
	type UploadFile,
} from '~/components';

type UploadOptions = {
	signal: AbortSignal;
	setProgress: (fileId: string, progress: FileUploadProgress) => void;
};

function simulateUpload(
	fileId: string,
	file: File,
	{ signal, setProgress }: UploadOptions,
) {
	return new Promise<UploadedFileData>((resolve, reject) => {
		const total = Math.max(file.size, 100);
		let loaded = 0;
		const abort = () => {
			window.clearInterval(interval);
			reject(new DOMException('Загрузка отменена', 'AbortError'));
		};
		const interval = window.setInterval(() => {
			loaded = Math.min(total, loaded + total / 8);
			setProgress(fileId, { loaded, total });

			if (loaded >= total) {
				window.clearInterval(interval);
				signal.removeEventListener('abort', abort);
				resolve({
					id: fileId,
					name: file.name,
					size: file.size,
					type: file.type,
				});
			}
		}, 180);

		if (signal.aborted) abort();
		else signal.addEventListener('abort', abort, { once: true });
	});
}

function SingleExample() {
	const [file, setFile] = useState<UploadFile | null>(null);

	return (
		<FileUploader
			value={file}
			onChange={setFile}
			label="Документ"
			accept={['.pdf', '.png', '.jpg']}
			maxFileSize={5 * 1024 * 1024}
			helperText="Добавьте один файл для проверки"
			onUploadFile={simulateUpload}
		/>
	);
}

function MultipleExample() {
	const [files, setFiles] = useState<UploadFile[]>([]);

	return (
		<FileUploader
			value={files}
			onChange={setFiles}
			isMultiple
			maxFileCount={4}
			label="Вложения"
			accept={['image/*', '.pdf']}
			maxFileSize={10 * 1024 * 1024}
			onUploadFile={simulateUpload}
			onDeleteFile={() => Promise.resolve()}
		/>
	);
}

function RetryExample() {
	const [file, setFile] = useState<UploadFile | null>(null);
	const attempts = useRef(new Map<string, number>());
	const upload = useCallback(
		async (fileId: string, selectedFile: File, options: UploadOptions) => {
			const nextAttempt = (attempts.current.get(fileId) ?? 0) + 1;
			attempts.current.set(fileId, nextAttempt);

			if (nextAttempt === 1) {
				await new Promise((resolve) => window.setTimeout(resolve, 500));
				throw new Error('Сервис временно недоступен');
			}

			return simulateUpload(fileId, selectedFile, options);
		},
		[],
	);

	return (
		<FileUploader
			value={file}
			onChange={setFile}
			label="Повторная загрузка"
			onUploadFile={upload}
			getErrorMessage={(_, error) => error.message}
			helperText="Первая попытка завершится ошибкой; затем нажмите повтор"
		/>
	);
}

const invalidFile: UploadFile = {
	id: 'invalid-file',
	name: 'archive.zip',
	type: 'application/zip',
	size: 8.4 * 1024 * 1024,
	status: {
		isRestrictionError: true,
		errorMsg: 'Допустимы только PDF, PNG и JPG',
	},
};

const meta: Meta<typeof FileUploader> = {
	title: 'FileUploader',
	component: FileUploader,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: 'min(680px, 90vw)' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
};

export default meta;

export function SingleFile() {
	return <SingleExample />;
}

export function MultipleFiles() {
	return <MultipleExample />;
}

export function UploadErrorAndRetry() {
	return <RetryExample />;
}

export function RestrictionError() {
	const [file, setFile] = useState<UploadFile | null>(invalidFile);

	return (
		<FileUploader
			value={file}
			onChange={setFile}
			label="Документ"
			accept={['.pdf', '.png', '.jpg']}
		/>
	);
}

export function Disabled() {
	return (
		<FileUploader
			value={null}
			onChange={() => undefined}
			label="Документ"
			isDisabled
			helperText="Загрузка недоступна"
		/>
	);
}
