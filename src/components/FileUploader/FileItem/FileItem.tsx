import {
	DownloadIcon,
	EyeIcon,
	RefreshCwIcon,
	Trash2Icon,
	XIcon,
} from 'lucide-react';
import { Button } from '../../Button/Button';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Typography } from '../../Typography/Typography';
import type { FileId, UploadFile } from '../types';
import { formatFileSize } from '../utils';
import * as styles from './styles.css';
import { useLogic } from './useLogic';

export type FileItemProps = {
	file: UploadFile;
	isDeleting: boolean;
	onAbort: (fileId: FileId) => void;
	onDelete: (fileId: FileId) => void;
	onRetry: (fileId: FileId) => void;
	onView?: (fileId: FileId, file?: File, fileUrl?: string) => void;
	generateDownloadLink?: (
		fileId: FileId,
		file?: File,
		fileUrl?: string,
	) => string;
};

const FileAction = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactElement;
}) => <Tooltip text={label}>{children}</Tooltip>;

export const FileItem = (props: FileItemProps) => {
	const { file, isDeleting, onAbort, onDelete, onRetry, onView } = props;

	const {
		fileState,
		isLoading,
		displayedProgress,
		isError,
		errorMsg,
		isViewable,
		downloadLink,
		isUploadError,
	} = useLogic(props);

	return (
		<li
			data-slot="file-uploader-file"
			data-state={fileState}
			className={styles.item}
		>
			<div className={styles.content}>
				<div className={styles.meta}>
					<Typography
						component="span"
						variant="body2"
						weight="medium"
						className={styles.fileName}
						title={file.name}
					>
						{file.name}
					</Typography>
					{typeof file.size === 'number' && (
						<Typography
							component="span"
							variant="caption"
							color="secondary"
							className={styles.fileSize}
						>
							{formatFileSize(file.size)}
						</Typography>
					)}
				</div>

				{isLoading && (
					<ProgressBar
						value={displayedProgress}
						aria-label={`Загрузка ${file.name}`}
					/>
				)}

				{isError && errorMsg && (
					<Typography
						component="p"
						variant="caption"
						color="error"
						display="block"
						className={styles.fileError}
					>
						{errorMsg}
					</Typography>
				)}
			</div>

			<div className={styles.actions}>
				{isLoading && (
					<FileAction label="Отменить загрузку">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={styles.fileAction}
							onClick={() => onAbort(file.id)}
							aria-label="Отменить загрузку"
						>
							<XIcon />
						</Button>
					</FileAction>
				)}

				{!isLoading && isUploadError && file.file && (
					<FileAction label="Повторить загрузку">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={styles.fileAction}
							onClick={() => onRetry(file.id)}
							aria-label="Повторить загрузку"
						>
							<RefreshCwIcon />
						</Button>
					</FileAction>
				)}

				{!isLoading && !isError && isViewable && onView && (
					<FileAction label="Посмотреть">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={styles.fileAction}
							onClick={() => onView(file.id, file.file, file.url)}
							aria-label="Посмотреть"
						>
							<EyeIcon />
						</Button>
					</FileAction>
				)}

				{!isLoading && !isError && isViewable && !onView && downloadLink && (
					<FileAction label="Посмотреть">
						<Button
							render={
								<a href={downloadLink} target="_blank" rel="noreferrer" />
							}
							variant="ghost"
							size="icon"
							className={styles.fileAction}
							aria-label="Посмотреть"
						>
							<EyeIcon />
						</Button>
					</FileAction>
				)}

				{!isLoading && !isError && downloadLink && (
					<FileAction label="Скачать">
						<Button
							render={<a href={downloadLink} download={file.name} />}
							variant="ghost"
							size="icon"
							className={styles.fileAction}
							aria-label="Скачать"
						>
							<DownloadIcon />
						</Button>
					</FileAction>
				)}

				{!isLoading && (
					<FileAction label="Удалить">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={styles.fileAction}
							isLoading={isDeleting}
							onClick={() => onDelete(file.id)}
							aria-label="Удалить"
						>
							<Trash2Icon />
						</Button>
					</FileAction>
				)}
			</div>
		</li>
	);
};
