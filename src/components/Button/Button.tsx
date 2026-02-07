import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import styles from './button.css';
import { Content } from './Content';
import type { ButtonSize, ButtonVariant } from './types';

export type ButtonProps = React.ComponentProps<'button'> & {
	asChild?: boolean;
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
	asChild = false,
	isLoading = false,
	fullWidth,
	...props
}: ButtonProps) => {
	const Component = asChild ? Slot : Content;

	return (
		<Component
			className={clsx(
				styles.buttonBase,
				styles.buttonVariants[variant],
				styles.buttonSizes[size],
				{ [styles.fullWidthStyle]: fullWidth, [styles.loading]: isLoading },
				className,
			)}
			{...props}
		/>
	);
};

const { buttonVariants, buttonSizes } = styles;

export { Button, buttonSizes, buttonVariants };
