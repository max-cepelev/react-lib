import { clsx } from 'clsx';
import { type ComponentProps, useCallback } from 'react';
import { useCarousel } from '../CarouselContext';
import * as styles from './styles.css';

export function Content({ className, ref, ...props }: ComponentProps<'div'>) {
	const { carouselRef, orientation = 'horizontal' } = useCarousel();
	const handleRef = useCallback(
		(node: HTMLDivElement | null) => {
			carouselRef(node);

			if (typeof ref === 'function') {
				ref(node);
			} else if (ref) {
				ref.current = node;
			}
		},
		[carouselRef, ref],
	);

	return (
		<div
			className={clsx(
				styles.content,
				styles.orientations[orientation],
				className,
			)}
			ref={handleRef}
			data-slot="carousel-content"
			data-orientation={orientation}
			{...props}
		/>
	);
}
