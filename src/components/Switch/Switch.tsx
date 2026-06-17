import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { clsx } from 'clsx';
import * as styles from './styles.css';
import type { SwitchProps } from './types';

export function Switch({
	className,
	size = 'default',
	...props
}: SwitchProps.Root) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={clsx(styles.root, className)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={styles.thumb}
			/>
		</SwitchPrimitive.Root>
	);
}
