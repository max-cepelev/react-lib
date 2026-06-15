import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { useCarousel } from '../CarouselContext';
import * as styles from './styles.css';

export function Content({ className, ...props }: ComponentProps<'div'>) {
	const { carouselRef, orientation = 'horizontal' } = useCarousel();

	return (
		<div
			className={clsx(
				styles.content,
				styles.orientations[orientation],
				className,
			)}
			ref={carouselRef}
			data-slot="carousel-content"
			data-orientation={orientation}
			{...props}
		/>
	);
}
