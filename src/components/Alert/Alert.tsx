import { clsx } from 'clsx';
import {
	CircleCheck,
	Info,
	OctagonAlert,
	TriangleAlert,
	XIcon,
} from 'lucide-react';
import { Button } from '../Button';
import { Typography } from '../Typography';
import * as styles from './styles.css';
import type { AlertProps, AlertSeverity } from './types';

const severityIcons = {
	info: Info,
	success: CircleCheck,
	warning: TriangleAlert,
	error: OctagonAlert,
} satisfies Record<AlertSeverity, typeof Info>;

function Alert({
	children,
	title,
	closeText = 'Скрыть',
	display = true,
	actions,
	onClose,
	severity = 'info',
	className,
	icon,
	unmountOnExit = false,
	role = 'alert',
	ref,
	...props
}: AlertProps) {
	if (!display && unmountOnExit) {
		return null;
	}

	const SeverityIcon = severityIcons[severity];
	const messageComponent =
		typeof children === 'string' || typeof children === 'number' ? 'p' : 'div';

	return (
		<div
			{...props}
			data-slot="alert"
			data-severity={severity}
			data-has-title={title != null ? '' : undefined}
			data-has-actions={actions != null ? '' : undefined}
			data-closable={onClose ? '' : undefined}
			hidden={!display}
			role={role}
			ref={ref}
			className={clsx(
				styles.root,
				styles.severityVariants[severity],
				className,
			)}
		>
			<div
				data-slot="alert-icon"
				className={clsx(styles.icon, styles.iconVariants[severity])}
				aria-hidden="true"
			>
				{icon ?? <SeverityIcon />}
			</div>

			<div data-slot="alert-content" className={styles.content}>
				{title != null && (
					<Typography
						component="div"
						variant="subtitle2"
						weight="semibold"
						display="block"
						className={styles.title}
					>
						{title}
					</Typography>
				)}
				<Typography
					component={messageComponent}
					variant="body2"
					display="block"
					className={styles.message}
				>
					{children}
				</Typography>
			</div>

			{onClose && (
				<Button
					data-slot="alert-close"
					type="button"
					variant="ghost"
					size="icon"
					className={styles.closeButton}
					onClick={onClose}
					aria-label={closeText}
					title={closeText}
				>
					<XIcon />
				</Button>
			)}

			{actions != null && (
				<div data-slot="alert-actions" className={styles.actions}>
					{actions}
				</div>
			)}
		</div>
	);
}

export { Alert };
