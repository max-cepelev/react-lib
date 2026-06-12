import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { clsx } from 'clsx';
import * as styles from './button.css';
import type { ButtonSize, ButtonVariant } from './types';

export type ButtonProps = ButtonPrimitive.Props & {
	isLoading?: boolean;
	fullWidth?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
};

const Button = ({
	className,
	variant = 'default',
	size = 'md',
	startAdornment,
	endAdornment,
	isLoading = false,
	fullWidth,
	children,
	nativeButton,
	...props
}: ButtonProps) => {
	return (
		<ButtonPrimitive
			nativeButton={nativeButton ?? !props.render}
			className={clsx(
				styles.buttonBase,
				styles.buttonVariants[variant],
				styles.buttonSizes[size],
				{ [styles.fullWidthStyle]: fullWidth, [styles.loading]: isLoading },
				className,
			)}
			{...props}
		>
			{startAdornment && (
				<span className={styles.startAdornment}>{startAdornment}</span>
			)}
			{children}
			{endAdornment && (
				<span className={styles.endAdornment}>{endAdornment}</span>
			)}
		</ButtonPrimitive>
	);
};

const { buttonVariants, buttonSizes } = styles;

export { Button, buttonSizes, buttonVariants };
