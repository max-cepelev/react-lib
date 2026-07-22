import type { RestrictionFn, RestrictionFnResult, UploadFile } from './types';

export const FILE_MAX_SIZE_ERROR = 'file-max-size';
export const FILE_TYPE_ERROR = 'file-type';
export const FILE_MIME_MISMATCH_ERROR = 'inconsistency-file-type';

const MIME_EXTENSIONS: Record<string, string[]> = {
	'application/json': ['json'],
	'application/msword': ['doc', 'dot'],
	'application/pdf': ['pdf'],
	'application/vnd.ms-excel': ['xls'],
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
		'docx',
	],
	'application/xml': ['xml'],
	'application/zip': ['zip'],
	'image/avif': ['avif'],
	'image/bmp': ['bmp'],
	'image/gif': ['gif'],
	'image/jpeg': ['jpeg', 'jpg', 'jpe'],
	'image/png': ['png'],
	'image/svg+xml': ['svg'],
	'image/webp': ['webp'],
	'text/csv': ['csv'],
	'text/plain': ['txt'],
	'text/xml': ['xml'],
};

const DEFAULT_STATUS = {
	isLoading: false,
	isUploadError: false,
	isRestrictionError: false,
} as const;

export function formatFileSize(size: number) {
	if (!Number.isFinite(size) || size <= 0) return '0 Б';

	const units = ['Б', 'КБ', 'МБ', 'ГБ'];
	const unitIndex = Math.min(
		Math.floor(Math.log(size) / Math.log(1024)),
		units.length - 1,
	);
	const value = size / 1024 ** unitIndex;

	return `${unitIndex === 0 ? Math.round(value) : value.toFixed(2)} ${units[unitIndex]}`;
}

export function getFileExtension(fileName: string) {
	const lastDotIndex = fileName.lastIndexOf('.');

	return lastDotIndex < 0 ? '' : fileName.slice(lastDotIndex + 1).toLowerCase();
}

export function canOpenInBrowser(file: UploadFile) {
	const extension = getFileExtension(file.name);
	const mimeType = file.file?.type || file.type;

	return (
		mimeType.startsWith('image/') ||
		mimeType === 'application/pdf' ||
		mimeType.startsWith('text/') ||
		['jpg', 'jpeg', 'png', 'pdf', 'txt'].includes(extension)
	);
}

function normalizeAcceptEntry(entry: string) {
	return entry.trim().toLowerCase();
}

export function formatAccept(accept: string[]) {
	const formatted = accept
		.map(normalizeAcceptEntry)
		.filter(Boolean)
		.map((entry) => {
			if (entry.startsWith('.')) return entry.slice(1).toUpperCase();
			if (entry.endsWith('/*')) return entry.slice(0, -2).toUpperCase();

			return (entry.split('/').at(-1) ?? entry).toUpperCase();
		});

	return [...new Set(formatted)].join(', ');
}

function matchesAcceptEntry(file: File, entry: string) {
	const normalizedEntry = normalizeAcceptEntry(entry);
	const extension = getFileExtension(file.name);
	const mimeType = file.type.toLowerCase();

	if (normalizedEntry.startsWith('.')) {
		return extension === normalizedEntry.slice(1);
	}

	if (normalizedEntry.endsWith('/*')) {
		return mimeType.startsWith(`${normalizedEntry.slice(0, -1)}`);
	}

	return mimeType === normalizedEntry;
}

function hasMimeMismatch(file: File) {
	const extension = getFileExtension(file.name);
	const registeredExtensions = MIME_EXTENSIONS[file.type.toLowerCase()];

	return Boolean(
		file.type &&
			extension &&
			registeredExtensions &&
			!registeredExtensions.includes(extension),
	);
}

export function restrictFileType(accept: string[]): RestrictionFn {
	return (file) => {
		if (!accept.length) return undefined;

		if (!accept.some((entry) => matchesAcceptEntry(file, entry))) {
			return {
				code: FILE_TYPE_ERROR,
				message: 'Тип файла недопустим',
			};
		}

		if (hasMimeMismatch(file)) {
			return {
				code: FILE_MIME_MISMATCH_ERROR,
				message: 'Содержимое файла не соответствует его расширению',
			};
		}

		return undefined;
	};
}

export function restrictFileMaxSize(maxFileSize?: number): RestrictionFn {
	return (file) => {
		if (!maxFileSize || file.size <= maxFileSize) return undefined;

		return {
			code: FILE_MAX_SIZE_ERROR,
			message: `Файл должен быть до ${formatFileSize(maxFileSize)}`,
		};
	};
}

export function validateFile(
	file: File,
	{
		accept,
		maxFileSize,
		restrictions = [],
	}: {
		accept: string[];
		maxFileSize?: number;
		restrictions?: RestrictionFn[];
	},
) {
	const validators = [
		restrictFileMaxSize(maxFileSize),
		restrictFileType(accept),
		...restrictions,
	];

	for (const validator of validators) {
		const error = validator(file);
		if (error) return error;
	}

	return undefined;
}

export function compareFile(
	fileA: Pick<File, 'name' | 'size'>,
	fileB: Pick<UploadFile, 'name' | 'size'>,
) {
	return fileA.name === fileB.name && fileA.size === fileB.size;
}

export function createUploadFile(
	file: File,
	id: string,
	error?: RestrictionFnResult,
): UploadFile {
	return {
		id,
		name: file.name,
		type: file.type,
		size: file.size,
		file,
		status: error
			? {
					...DEFAULT_STATUS,
					isRestrictionError: true,
					errorMsg: error.message,
				}
			: DEFAULT_STATUS,
	};
}

export function toFileArray(
	value: UploadFile | UploadFile[] | null | undefined,
) {
	if (Array.isArray(value)) return value;

	return value ? [value] : [];
}

export function pluralizeFiles(value: number) {
	const lastTwoDigits = value % 100;
	const lastDigit = value % 10;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'файлов';
	if (lastDigit === 1) return 'файл';
	if (lastDigit >= 2 && lastDigit <= 4) return 'файла';

	return 'файлов';
}
