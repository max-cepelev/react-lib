import type { ButtonProps } from '../Button';
import styles from './styles.css';

export const Content = ({
	children,
	startAdornment,
	endAdornment,
	...props
}: ButtonProps) => (
	<button {...props}>
		{startAdornment && (
			<span className={styles.startAdornment}>{startAdornment}</span>
		)}
		{children}
		{endAdornment && (
			<span className={styles.endAdornment}>{endAdornment}</span>
		)}
	</button>
);
