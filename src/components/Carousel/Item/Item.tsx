import * as styles from './styles.css';

export function Item(props: React.ComponentProps<'div'>) {
	return (
		<div
			className={styles.item}
			role="presentation"
			aria-roledescription="slide"
			data-slot="carousel-item"
			{...props}
		/>
	);
}
