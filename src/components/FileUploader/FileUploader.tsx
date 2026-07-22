import { clsx } from 'clsx';
import { UploadCloudIcon } from 'lucide-react';
import { Button } from '../Button/Button';
import { Label } from '../Label/Label';
import { Typography } from '../Typography/Typography';
import { FileItem } from './FileItem';
import * as styles from './styles.css';
import type { FileUploaderProps } from './types';
import { useLogic } from './useLogic';
import { pluralizeFiles } from './utils';

export const FileUploader = (props: FileUploaderProps) => {
	const {
		value: _value,
		onChange: _onChange,
		isMultiple = false,
		maxFileCount,
		name,
		label,
		accept = [],
		maxFileSize,
		isDisabled = false,
		isError = false,
		required,
		helperText,
		restrictions: _restrictions,
		placeholder,
		inputRef,
		notify: _notify,
		generateDownloadLink,
		onUploadFile: _onUploadFile,
		onDeleteFile: _onDeleteFile,
		onView,
		getErrorMessage: _getErrorMessage,
		className,
		ref,
		...rootProps
	} = props;

	const {
		abortUpload,
		deleteFile,
		deletingFileIds,
		files,
		inputId,
		setInputRef,
		helperTextId,
		isDragActive,
		isLimitReached,
		onDragEnter,
		onDragLeave,
		onDragOver,
		onDrop,
		onInputChange,
		retryUpload,
		defaultPrompt,
		constraints,
		effectiveMaxFileCount,
		onDownloadClick,
	} = useLogic(props);

	return (
		<div
			{...rootProps}
			data-slot="file-uploader"
			ref={ref}
			className={clsx(styles.root, className)}
		>
			{label != null && (
				<Label
					htmlFor={inputId}
					disabled={isDisabled}
					error={isError}
					required={required}
				>
					{label}
				</Label>
			)}

			<fieldset
				data-slot="file-uploader-dropzone"
				aria-label="Загрузка файлов"
				data-active={isDragActive ? '' : undefined}
				data-error={isError ? '' : undefined}
				data-disabled={isDisabled ? '' : undefined}
				className={styles.dropzone}
				onDragEnter={onDragEnter}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				<input
					data-slot="file-uploader-input"
					id={inputId}
					ref={setInputRef}
					className={styles.input}
					type="file"
					name={name}
					value=""
					accept={accept.join(',')}
					multiple={isMultiple}
					disabled={isDisabled || isLimitReached}
					required={required && files.length === 0}
					aria-label="Загрузить"
					aria-invalid={isError || undefined}
					aria-describedby={helperText ? helperTextId : undefined}
					onChange={onInputChange}
				/>

				{files.length > 0 && (
					<ul data-slot="file-uploader-list" className={styles.fileList}>
						{files.map((file) => (
							<FileItem
								key={file.id}
								file={file}
								isDeleting={deletingFileIds.has(file.id)}
								onAbort={abortUpload}
								onDelete={deleteFile}
								onRetry={retryUpload}
								onView={onView}
								generateDownloadLink={generateDownloadLink}
							/>
						))}
					</ul>
				)}

				{!isLimitReached ? (
					<div
						data-slot="file-uploader-prompt"
						data-has-files={files.length ? '' : undefined}
						className={styles.prompt}
					>
						<div className={styles.uploadIcon} aria-hidden="true">
							<UploadCloudIcon />
						</div>
						<div className={styles.promptContent}>
							{typeof placeholder === 'string' || placeholder == null ? (
								<Typography
									component="p"
									variant="body2"
									weight="medium"
									className={styles.promptText}
								>
									{isDragActive
										? 'Отпустите файлы, чтобы добавить'
										: (placeholder ?? defaultPrompt)}
								</Typography>
							) : (
								placeholder
							)}
							{constraints && (
								<Typography
									component="p"
									variant="caption"
									color="secondary"
									className={styles.constraints}
								>
									{constraints}
								</Typography>
							)}
						</div>
						<Button
							type="button"
							size="small"
							className={styles.uploadButton}
							disabled={isDisabled}
							onClick={onDownloadClick}
						>
							Загрузить
						</Button>
					</div>
				) : (
					<Typography
						component="p"
						variant="caption"
						color="secondary"
						className={styles.limitNotice}
					>
						Достигнут лимит в {effectiveMaxFileCount}{' '}
						{pluralizeFiles(effectiveMaxFileCount)}. Чтобы добавить новый,
						удалите один из текущих.
					</Typography>
				)}
			</fieldset>

			{helperText != null && (
				<Typography
					id={helperTextId}
					component="p"
					variant="caption"
					color={isError ? 'error' : 'secondary'}
					display="block"
					className={styles.helperText}
				>
					{helperText}
				</Typography>
			)}
		</div>
	);
};
