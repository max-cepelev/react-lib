import { clsx } from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Label } from '../Label/Label';
import { Typography } from '../Typography/Typography';
import * as styles from './styles.css';

type FormControlLayoutProps =
	| {
			label?: ReactNode;
			orientation?: 'vertical';
	  }
	| {
			label: ReactNode;
			orientation: 'inline';
	  };

export type FormControlProps = Omit<
	ComponentPropsWithRef<'div'>,
	'children'
> & {
	children: ReactNode;
	disabled?: boolean;
	error?: string;
	htmlFor?: string;
	labelClassName?: string;
	required?: boolean;
} & FormControlLayoutProps;

export const FormControl = ({
	children,
	className,
	disabled,
	error,
	htmlFor,
	label,
	labelClassName,
	orientation = 'vertical',
	required,
	...props
}: FormControlProps) => (
	<div
		data-disabled={disabled || undefined}
		data-invalid={Boolean(error) || undefined}
		data-orientation={orientation}
		data-slot="form-control"
		className={clsx(styles.root, className)}
		{...props}
	>
		{label && (
			<Label
				data-orientation={orientation}
				data-slot="form-control-label"
				className={clsx(styles.label, labelClassName)}
				disabled={disabled}
				error={Boolean(error)}
				htmlFor={htmlFor}
				required={required}
			>
				{label}
			</Label>
		)}
		<div data-slot="form-control-control" className={styles.control}>
			{children}
		</div>
		{error && (
			<Typography
				data-slot="form-control-error"
				className={styles.error}
				color="error"
				display="block"
				role="alert"
				variant="caption"
			>
				{error}
			</Typography>
		)}
	</div>
);
