import { clsx } from 'clsx';
import { Input, type InputProps } from '../Input';
import { Label } from '../Label';
import { Typography } from '../Typography';
import {
	container,
	disabledClass,
	errorClass,
	fullWidthClass,
	helperTextClass,
	labelClass,
} from './styles.css';

export type TextFieldProps = InputProps & {
	label?: string;
	labelClassName?: string;
	helperText?: string;
};

export const TextField = ({
	label,
	helperText,
	className,
	disabled,
	fullWidth,
	ref,
	labelClassName,
	...props
}: TextFieldProps) => {
	return (
		<div
			className={clsx(container, { [fullWidthClass]: fullWidth }, className)}
		>
			{label && (
				<Label
					htmlFor={props.id || label}
					disabled={disabled}
					required={props.required}
					error={props.error}
					className={clsx(labelClass, labelClassName)}
				>
					{label}
				</Label>
			)}
			<Input
				ref={ref}
				disabled={disabled}
				fullWidth={fullWidth}
				id={props.id || label}
				{...props}
			/>
			{helperText && (
				<Typography
					variant="caption"
					className={clsx(helperTextClass, {
						[errorClass]: props.error,
						[disabledClass]: disabled,
					})}
				>
					{helperText}
				</Typography>
			)}
		</div>
	);
};
