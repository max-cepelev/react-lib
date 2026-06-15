import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { useCarousel } from '../CarouselContext';
import * as styles from './styles.css';

export function Item({ className, ...props }: ComponentProps<'div'>) {
	const { orientation = 'horizontal' } = useCarousel();

	return (
		// biome-ignore lint/a11y/useSemanticElements: Carousel slides need group semantics without fieldset behavior.
		<div
			className={clsx(styles.item, styles.orientations[orientation], className)}
			role="group"
			aria-roledescription="slide"
			data-orientation={orientation}
			data-slot="carousel-item"
			{...props}
		/>
	);
}
