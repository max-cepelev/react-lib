import { clsx } from 'clsx';
import type React from 'react';

import {
	adornment,
	container,
	disabledClass,
	errorClass,
	fullWidthClass,
	input,
	sizes,
	variants,
	withEndAdornment,
	withStartAdornment,
} from './styles.css';

export type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & {
	variant?: 'outlined' | 'standard';
	size?: 'small' | 'medium' | 'large';
	error?: boolean;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
	disabled?: boolean;
	fullWidth?: boolean;
};
export const Input = ({
	error,
	variant = 'outlined',
	size = 'medium',
	startAdornment,
	endAdornment,
	className,
	disabled,
	fullWidth,
	value,
	ref,
	...props
}: InputProps) => {
	return (
		<div
			className={clsx(
				container,
				variants[variant],
				{ [errorClass]: error },
				{ [disabledClass]: disabled },
				{ [fullWidthClass]: fullWidth },
				className,
			)}
		>
			{startAdornment && <span className={adornment}>{startAdornment}</span>}
			<input
				className={clsx(input, sizes[size], {
					[disabledClass]: disabled,
					[withStartAdornment]: Boolean(startAdornment),
					[withEndAdornment]: Boolean(endAdornment),
				})}
				ref={ref}
				disabled={disabled}
				value={value || ''}
				{...props}
			/>
			{endAdornment && <span className={adornment}>{endAdornment}</span>}
		</div>
	);
};
