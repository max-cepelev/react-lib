import { useCallback, useId } from 'react';
import { useFileUploader } from '../hooks';
import type { FileUploaderProps } from '../types';
import { formatAccept, formatFileSize, pluralizeFiles } from '../utils';

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
	if (typeof ref === 'function') {
		ref(value);
	} else if (ref) {
		ref.current = value;
	}
}

export const useLogic = (props: FileUploaderProps) => {
	const {
		inputRef,
		isMultiple,
		maxFileCount,
		maxFileSize,
		accept = [],
	} = props;
	const inputId = useId();
	const helperTextId = `${inputId}-helper-text`;
	const { inputRef: internalInputRef, ...restFileUploader } =
		useFileUploader(props);
	const setInputRef = useCallback(
		(node: HTMLInputElement | null) => {
			internalInputRef.current = node;
			assignRef(inputRef, node);
		},
		[inputRef, internalInputRef],
	);
	const effectiveMaxFileCount = isMultiple ? (maxFileCount ?? 1) : 1;
	const acceptedFormats = formatAccept(accept);
	const constraints = [
		isMultiple
			? `Не более ${effectiveMaxFileCount} ${pluralizeFiles(effectiveMaxFileCount)}`
			: undefined,
		maxFileSize ? `До ${formatFileSize(maxFileSize)}` : undefined,
		acceptedFormats || undefined,
	]
		.filter(Boolean)
		.join(' · ');
	const defaultPrompt = isMultiple
		? 'Перетащите файлы сюда или выберите на устройстве'
		: 'Перетащите файл сюда или выберите на устройстве';

	const onDownloadClick = () => {
		internalInputRef.current?.click();
	};

	return {
		inputId,
		helperTextId,
		setInputRef,
		constraints,
		defaultPrompt,
		effectiveMaxFileCount,
		onDownloadClick,
		...restFileUploader,
	};
};
