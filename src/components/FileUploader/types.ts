import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';

export type FileId = string;

export type FileUploaderInputSource = 'fileInput' | 'dragAndDrop';

export type FileUploaderMetaInfo = {
	inputSourceType?: FileUploaderInputSource;
};

export type FileStatus = {
	isLoading?: boolean;
	isUploadError?: boolean;
	isRestrictionError?: boolean;
	errorMsg?: string;
	progress?: number;
};

export type UploadFile = {
	id: FileId;
	name: string;
	type: string;
	size?: number;
	file?: File;
	url?: string;
	status?: FileStatus;
};

export type UploadedFileData = Omit<UploadFile, 'status'>;

export type RestrictionFnResult = {
	code: string;
	message: string;
};

export type RestrictionFn = (value: File) => RestrictionFnResult | undefined;

export type FileUploaderNotifyOptions = {
	content?: string;
};

export type FileUploaderNotify = {
	success: (
		title: string,
		options?: FileUploaderNotifyOptions,
	) => number | string;
	error: (
		title: string,
		options?: FileUploaderNotifyOptions,
	) => number | string;
	warning: (
		title: string,
		options?: FileUploaderNotifyOptions,
	) => number | string;
	info: (title: string, options?: FileUploaderNotifyOptions) => number | string;
};

export type FileUploadProgress = {
	loaded: number;
	total?: number;
};

type BaseFileUploaderProps = Omit<
	ComponentPropsWithRef<'div'>,
	'children' | 'onChange'
> & {
	name?: string;
	label?: ReactNode;
	accept?: string[];
	maxFileSize?: number;
	isDisabled?: boolean;
	isError?: boolean;
	required?: boolean;
	helperText?: ReactNode;
	restrictions?: RestrictionFn[];
	placeholder?: ReactNode;
	inputRef?: Ref<HTMLInputElement>;
	notify?: FileUploaderNotify;
	generateDownloadLink?: (
		fileId: FileId,
		file?: File,
		fileUrl?: string,
	) => string;
	onUploadFile?: (
		fileId: FileId,
		file: File,
		options: {
			signal: AbortSignal;
			setProgress: (
				progressFileId: FileId,
				progress: FileUploadProgress,
			) => void;
		},
	) => Promise<UploadedFileData>;
	onDeleteFile?: (fileId: FileId) => Promise<void>;
	onView?: (fileId: FileId, file?: File, fileUrl?: string) => void;
	getErrorMessage?: (fileId: FileId, error: Error) => string;
};

export type SingleFileUploaderProps = BaseFileUploaderProps & {
	value: UploadFile | null | undefined;
	isMultiple?: false;
	maxFileCount?: never;
	onChange: (value: UploadFile | null, metaInfo?: FileUploaderMetaInfo) => void;
};

export type MultipleFileUploaderProps = BaseFileUploaderProps & {
	value: UploadFile[];
	isMultiple: true;
	maxFileCount: number;
	onChange: (value: UploadFile[], metaInfo?: FileUploaderMetaInfo) => void;
};

export type FileUploaderProps =
	| MultipleFileUploaderProps
	| SingleFileUploaderProps;
