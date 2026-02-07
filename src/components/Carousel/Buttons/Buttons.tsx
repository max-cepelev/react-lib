import { clsx } from 'clsx';
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import { useCarousel } from '../CarouselContext';
import { next, orientations, prev } from './styles.css';

export function Buttons({ className, ...props }: ComponentProps<'button'>) {
	const {
		orientation = 'horizontal',
		canScrollNext,
		scrollNext,
		canScrollPrev,
		scrollPrev,
	} = useCarousel();

	return (
		<>
			<button
				className={clsx(next, orientations[orientation])}
				type="button"
				data-slot="carousel-next"
				disabled={!canScrollNext}
				onClick={scrollNext}
				{...props}
			>
				{orientation === 'horizontal' ? <ChevronRight /> : <ChevronDown />}
			</button>
			<button
				type="button"
				className={clsx(prev, orientations[orientation])}
				data-slot="carousel-previous"
				disabled={!canScrollPrev}
				onClick={scrollPrev}
				{...props}
			>
				{orientation === 'horizontal' ? <ChevronLeft /> : <ChevronUp />}
			</button>
		</>
	);
}
