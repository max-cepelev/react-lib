import { clsx } from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import * as styles from './styles.css';
import { clampProgress } from './utils';

export type ProgressBarProps = Omit<
	ComponentPropsWithRef<'div'>,
	'children'
> & {
	/** Current progress from 0 to 100. */
	value: number;
};

export const ProgressBar = ({
	value,
	className,
	ref,
	...props
}: ProgressBarProps) => {
	const clampedValue = clampProgress(value);

	return (
		<div
			{...props}
			data-slot="progress-bar"
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={clampedValue}
			ref={ref}
			className={clsx(styles.root, className)}
		>
			<div
				data-slot="progress-bar-indicator"
				className={styles.indicator}
				style={{ transform: `scaleX(${clampedValue / 100})` }}
			/>
		</div>
	);
};
