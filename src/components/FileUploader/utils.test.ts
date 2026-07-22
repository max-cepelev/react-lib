import { describe, expect, it } from 'vitest';
import {
	compareFile,
	FILE_MAX_SIZE_ERROR,
	FILE_MIME_MISMATCH_ERROR,
	FILE_TYPE_ERROR,
	formatAccept,
	formatFileSize,
	restrictFileMaxSize,
	restrictFileType,
	validateFile,
} from './utils';

describe('file uploader utilities', () => {
	it('formats sizes and accept values for the UI', () => {
		expect(formatFileSize(5 * 1024)).toBe('5.00 КБ');
		expect(formatAccept(['.jpg', 'image/png', 'image/*', '.jpg'])).toBe(
			'JPG, PNG, IMAGE',
		);
	});

	it('supports extensions, exact MIME types and wildcard MIME types', () => {
		const jpeg = new File([], 'photo.JPG', { type: 'image/jpeg' });

		expect(restrictFileType(['.jpg'])(jpeg)).toBeUndefined();
		expect(restrictFileType(['image/jpeg'])(jpeg)).toBeUndefined();
		expect(restrictFileType(['image/*'])(jpeg)).toBeUndefined();
		expect(restrictFileType(['application/pdf'])(jpeg)?.code).toBe(
			FILE_TYPE_ERROR,
		);
	});

	it('detects a known mismatch between an extension and MIME type', () => {
		const disguisedPdf = new File([], 'document.jpg', {
			type: 'application/pdf',
		});

		expect(restrictFileType(['.jpg'])(disguisedPdf)?.code).toBe(
			FILE_MIME_MISMATCH_ERROR,
		);
	});

	it('checks file size before custom restrictions', () => {
		const file = new File(['12345'], 'large.txt', { type: 'text/plain' });
		const customRestriction = () => ({
			code: 'custom',
			message: 'Custom restriction',
		});

		expect(restrictFileMaxSize(3)(file)?.code).toBe(FILE_MAX_SIZE_ERROR);
		expect(
			validateFile(file, {
				accept: ['.txt'],
				maxFileSize: 3,
				restrictions: [customRestriction],
			})?.code,
		).toBe(FILE_MAX_SIZE_ERROR);
	});

	it('compares files by name and size', () => {
		const file = new File(['content'], 'document.txt');

		expect(compareFile(file, { name: 'document.txt', size: file.size })).toBe(
			true,
		);
		expect(compareFile(file, { name: 'other.txt', size: file.size })).toBe(
			false,
		);
	});
});
