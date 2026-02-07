import { useCarousel } from '../CarouselContext';
import * as styles from './styles.css';

export function Content(props: React.ComponentProps<'div'>) {
	const { carouselRef, orientation = 'horizontal' } = useCarousel();

	return (
		<div
			className={styles.wrapper}
			ref={carouselRef}
			data-slot="carousel-content"
		>
			<div className={styles.orientations[orientation]} {...props} />
		</div>
	);
}
