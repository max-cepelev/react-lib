import { useMemo } from 'react';
import { useDisplayedProgress, useObjectUrl } from '../../hooks';
import { canOpenInBrowser } from '../../utils';
import type { FileItemProps } from '../FileItem';

export const useLogic = ({
	generateDownloadLink,
	file,
	onView,
}: FileItemProps) => {
	const { status = {} } = file;
	const {
		isLoading = false,
		isUploadError = false,
		isRestrictionError = false,
		errorMsg,
		progress,
	} = status;
	const isError = isUploadError || isRestrictionError;
	const displayedProgress = useDisplayedProgress(isLoading, progress);
	const generatedDownloadLink = useMemo(
		() => generateDownloadLink?.(file.id, file.file, file.url),
		[generateDownloadLink, file.file, file.id, file.url],
	);
	const localUrl = useObjectUrl(
		generatedDownloadLink || file.url ? undefined : file.file,
	);
	const downloadLink = generatedDownloadLink || file.url || localUrl;
	const isViewable = Boolean(
		onView || (downloadLink && canOpenInBrowser(file)),
	);
	const fileState = isLoading ? 'loading' : isError ? 'error' : 'ready';

	return {
		isError,
		isUploadError,
		displayedProgress,
		downloadLink,
		isViewable,
		fileState,
		errorMsg,
		isLoading,
	};
};
