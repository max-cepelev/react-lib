import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import { type ReactNode, useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type {
	FileUploaderMetaInfo,
	FileUploaderNotify,
	SingleFileUploaderProps,
	UploadedFileData,
	UploadFile,
} from './types';

vi.mock('./styles.css', () => ({
	constraints: 'constraints',
	dropzone: 'dropzone',
	fileAction: 'file-action',
	fileActions: 'file-actions',
	fileContent: 'file-content',
	fileError: 'file-error',
	fileItem: 'file-item',
	fileList: 'file-list',
	fileMeta: 'file-meta',
	fileName: 'file-name',
	fileSize: 'file-size',
	helperText: 'helper-text',
	input: 'input',
	limitNotice: 'limit-notice',
	prompt: 'prompt',
	promptContent: 'prompt-content',
	promptText: 'prompt-text',
	root: 'root',
	uploadButton: 'upload-button',
	uploadIcon: 'upload-icon',
}));

vi.mock('./FileItem/styles.css', () => ({
	actions: 'file-actions',
	content: 'file-content',
	fileAction: 'file-action',
	fileError: 'file-error',
	fileName: 'file-name',
	fileSize: 'file-size',
	item: 'file-item',
	meta: 'file-meta',
}));

vi.mock('../Button/button.css', () => ({
	buttonBase: 'button',
	buttonSizes: {
		icon: 'button-icon',
		iconSmall: 'button-icon-small',
		large: 'button-large',
		medium: 'button-medium',
		small: 'button-small',
	},
	buttonVariants: {
		default: 'button-default',
		destructive: 'button-destructive',
		ghost: 'button-ghost',
		link: 'button-link',
		outline: 'button-outline',
	},
	endAdornment: 'end-adornment',
	fullWidthStyle: 'button-full-width',
	loading: 'button-loading',
	startAdornment: 'start-adornment',
}));

vi.mock('../Label/label.css', () => ({
	disabled: 'label-disabled',
	error: 'label-error',
	required: 'label-required',
	root: 'label',
}));

vi.mock('../ProgressBar/styles.css', () => ({
	indicator: 'progress-indicator',
	root: 'progress',
}));

vi.mock('../Typography/styles.css', () => ({
	alignments: { center: '', justify: '', left: '', right: '' },
	colors: {
		disabled: '',
		error: '',
		info: '',
		muted: '',
		primary: '',
		secondary: '',
		success: '',
		warning: '',
	},
	decorations: { lineThrough: '', none: '', underline: '' },
	displays: { block: '', inline: '' },
	gutterBottomClass: '',
	transforms: { capitalize: '', lowercase: '', uppercase: '' },
	variants: {
		body1: '',
		body2: '',
		caption: '',
		h1: '',
		h2: '',
		h3: '',
		h4: '',
		h5: '',
		h6: '',
		overline: '',
		subtitle1: '',
		subtitle2: '',
	},
	weights: { bold: '', medium: '', normal: '', semibold: '' },
}));

vi.mock('../Tooltip/Tooltip', () => ({
	Tooltip: ({ children }: { children: ReactNode }) => children,
}));

import { FileUploader } from './FileUploader';

function createDeferred<T>() {
	let resolve!: (value: T) => void;
	let reject!: (reason?: unknown) => void;
	const promise = new Promise<T>((promiseResolve, promiseReject) => {
		resolve = promiseResolve;
		reject = promiseReject;
	});

	return { promise, reject, resolve };
}

function SingleUploader({
	initialValue = null,
	onValueChange,
	children,
}: {
	initialValue?: UploadFile | null;
	onValueChange?: (
		value: UploadFile | null,
		metaInfo?: FileUploaderMetaInfo,
	) => void;
	children?: (
		value: UploadFile | null,
		onChange: (
			nextValue: UploadFile | null,
			metaInfo?: FileUploaderMetaInfo,
		) => void,
	) => ReactNode;
}) {
	const [value, setValue] = useState<UploadFile | null>(initialValue);
	const onChange = (
		nextValue: UploadFile | null,
		metaInfo?: FileUploaderMetaInfo,
	) => {
		setValue(nextValue);
		onValueChange?.(nextValue, metaInfo);
	};

	return children?.(value, onChange);
}

const uploadedFile = (id: string, name: string, url?: string): UploadFile => ({
	id,
	name,
	size: 1024,
	type: 'text/plain',
	url,
});

describe('FileUploader', () => {
	beforeEach(() => {
		Object.defineProperty(URL, 'createObjectURL', {
			configurable: true,
			value: vi.fn(() => 'blob:file'),
		});
		Object.defineProperty(URL, 'revokeObjectURL', {
			configurable: true,
			value: vi.fn(),
		});
	});

	it('renders the label, constraints and helper text', () => {
		render(
			<FileUploader
				value={null}
				onChange={() => undefined}
				label="Документы"
				accept={['.pdf', 'image/png']}
				maxFileSize={5 * 1024}
				helperText="Добавьте подписанный документ"
			/>,
		);

		expect(screen.getByText('Документы')).toBeInTheDocument();
		expect(screen.getByText('До 5.00 КБ · PDF, PNG')).toBeInTheDocument();
		expect(
			screen.getByText('Добавьте подписанный документ'),
		).toBeInTheDocument();
		expect(screen.getByLabelText('Загрузить')).toHaveAttribute(
			'accept',
			'.pdf,image/png',
		);
	});

	it('adds a file through the native input and reports its source', () => {
		const onValueChange = vi.fn();
		render(
			<SingleUploader onValueChange={onValueChange}>
				{(value, onChange) => (
					<FileUploader value={value} onChange={onChange} accept={['.txt']} />
				)}
			</SingleUploader>,
		);
		const file = new File(['content'], 'document.txt', {
			type: 'text/plain',
		});

		fireEvent.change(screen.getByLabelText('Загрузить'), {
			target: { files: [file] },
		});

		expect(onValueChange).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'document.txt' }),
			{ inputSourceType: 'fileInput' },
		);
		expect(screen.getByText('document.txt')).toBeInTheDocument();
	});

	it('shows a restriction error without starting an upload', () => {
		const onUploadFile = vi.fn();
		render(
			<SingleUploader>
				{(value, onChange) => (
					<FileUploader
						value={value}
						onChange={onChange}
						accept={['.png']}
						onUploadFile={onUploadFile}
					/>
				)}
			</SingleUploader>,
		);
		const file = new File(['content'], 'document.pdf', {
			type: 'application/pdf',
		});

		fireEvent.change(screen.getByLabelText('Загрузить'), {
			target: { files: [file] },
		});

		expect(screen.getByText('Тип файла недопустим')).toBeInTheDocument();
		expect(onUploadFile).not.toHaveBeenCalled();
	});

	it('updates progress and applies uploaded file data', async () => {
		const deferred = createDeferred<UploadedFileData>();
		const onUploadFile = vi.fn<
			NonNullable<SingleFileUploaderProps['onUploadFile']>
		>(() => deferred.promise);
		render(
			<SingleUploader>
				{(value, onChange) => (
					<FileUploader
						value={value}
						onChange={onChange}
						accept={['.txt']}
						onUploadFile={onUploadFile}
					/>
				)}
			</SingleUploader>,
		);
		const file = new File(['content'], 'document.txt', {
			type: 'text/plain',
		});

		fireEvent.change(screen.getByLabelText('Загрузить'), {
			target: { files: [file] },
		});
		await waitFor(() => expect(onUploadFile).toHaveBeenCalledTimes(1));
		const [fileId, , options] = onUploadFile.mock.calls[0];

		act(() => options.setProgress(fileId, { loaded: 5, total: 10 }));
		expect(screen.getByRole('progressbar')).toHaveAttribute(
			'aria-valuenow',
			'50',
		);

		await act(async () => {
			deferred.resolve({
				id: fileId,
				name: 'document.txt',
				size: file.size,
				type: file.type,
				url: '/files/document.txt',
			});
			await deferred.promise;
		});

		await waitFor(() =>
			expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(),
		);
		expect(screen.getByRole('button', { name: 'Скачать' })).toHaveAttribute(
			'href',
			'/files/document.txt',
		);
	});

	it('supports aborting an active upload', async () => {
		let uploadSignal: AbortSignal | undefined;
		const onUploadFile = vi.fn(
			(_fileId: string, _file: File, { signal }: { signal: AbortSignal }) => {
				uploadSignal = signal;
				return new Promise<UploadedFileData>((_resolve, reject) => {
					signal.addEventListener('abort', () => reject(new Error('Aborted')));
				});
			},
		);
		render(
			<SingleUploader>
				{(value, onChange) => (
					<FileUploader
						value={value}
						onChange={onChange}
						onUploadFile={onUploadFile}
					/>
				)}
			</SingleUploader>,
		);

		fireEvent.change(screen.getByLabelText('Загрузить'), {
			target: {
				files: [new File(['content'], 'document.txt', { type: 'text/plain' })],
			},
		});
		await waitFor(() => expect(onUploadFile).toHaveBeenCalledTimes(1));
		fireEvent.click(screen.getByRole('button', { name: 'Отменить загрузку' }));

		expect(uploadSignal?.aborted).toBe(true);
		expect(await screen.findByText('Загрузка прервана')).toBeInTheDocument();
	});

	it('allows retrying an upload error', async () => {
		const onUploadFile = vi
			.fn()
			.mockRejectedValueOnce(new Error('Network error'))
			.mockImplementationOnce((fileId: string, file: File) =>
				Promise.resolve({
					id: fileId,
					name: file.name,
					size: file.size,
					type: file.type,
					url: '/files/document.txt',
				}),
			);
		render(
			<SingleUploader>
				{(value, onChange) => (
					<FileUploader
						value={value}
						onChange={onChange}
						onUploadFile={onUploadFile}
						getErrorMessage={() => 'Сервис временно недоступен'}
					/>
				)}
			</SingleUploader>,
		);

		fireEvent.change(screen.getByLabelText('Загрузить'), {
			target: {
				files: [new File(['content'], 'document.txt', { type: 'text/plain' })],
			},
		});
		expect(
			await screen.findByText('Сервис временно недоступен'),
		).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Повторить загрузку' }));

		await waitFor(() => expect(onUploadFile).toHaveBeenCalledTimes(2));
		await waitFor(() =>
			expect(
				screen.queryByText('Сервис временно недоступен'),
			).not.toBeInTheDocument(),
		);
	});

	it('waits for async deletion before removing a file', async () => {
		const deferred = createDeferred<void>();
		const onDeleteFile = vi.fn(() => deferred.promise);
		render(
			<SingleUploader
				initialValue={uploadedFile('file-1', 'document.txt', '/document.txt')}
			>
				{(value, onChange) => (
					<FileUploader
						value={value}
						onChange={onChange}
						onDeleteFile={onDeleteFile}
					/>
				)}
			</SingleUploader>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Удалить' }));
		expect(onDeleteFile).toHaveBeenCalledWith('file-1');
		expect(screen.getByText('document.txt')).toBeInTheDocument();

		await act(async () => {
			deferred.resolve();
			await deferred.promise;
		});

		await waitFor(() =>
			expect(screen.queryByText('document.txt')).not.toBeInTheDocument(),
		);
	});

	it('reports the file count limit for drag and drop', () => {
		const warning = vi.fn(() => 'warning-id');
		const notify: FileUploaderNotify = {
			error: vi.fn(() => 'error-id'),
			info: vi.fn(() => 'info-id'),
			success: vi.fn(() => 'success-id'),
			warning,
		};
		const initialValue = [uploadedFile('file-1', 'first.txt')];
		render(
			<FileUploader
				isMultiple
				maxFileCount={1}
				value={initialValue}
				onChange={() => undefined}
				notify={notify}
			/>,
		);

		fireEvent.drop(screen.getByRole('group', { name: 'Загрузка файлов' }), {
			dataTransfer: {
				files: [new File(['second'], 'second.txt', { type: 'text/plain' })],
				types: ['Files'],
			},
		});

		expect(warning).toHaveBeenCalledWith('Не все файлы добавлены', {
			content: 'Можно загрузить не более 1',
		});
	});
});
