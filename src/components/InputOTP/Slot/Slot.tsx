import { clsx } from 'clsx';
import type { SlotProps } from 'input-otp';
import * as styles from './styles.css';

export const Slot = ({ char, hasFakeCaret, isActive, ...props }: SlotProps) => {
	return (
		<div
			className={clsx(styles.slot, { [styles.active]: isActive })}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className={styles.caretContainer}>
					<div className={styles.caret} />
				</div>
			)}
		</div>
	);
};
