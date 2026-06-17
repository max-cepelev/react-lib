import { clsx } from 'clsx';
import { Loader } from 'lucide-react';
import type { ComponentProps } from 'react';
import * as styles from './styles.css';

export type SpinnerProps = ComponentProps<typeof Loader>;

function Spinner({
	className,
	role = 'status',
	'aria-label': ariaLabel = 'Loading',
	...props
}: SpinnerProps) {
	return (
		<Loader
			role={role}
			aria-label={ariaLabel}
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

export { Spinner };
