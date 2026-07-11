import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useCarousel } from '../CarouselContext';
import { buttonNext, buttonPrev, iconWrapper } from './styles.css';

export function Arrows({ className, ...props }: ComponentProps<'button'>) {
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
				className={clsx(buttonPrev[orientation], className)}
				type="button"
				data-slot="carousel-previous"
				aria-label="Previous slide"
				aria-disabled={!canScrollPrev}
				disabled={!canScrollPrev}
				onClick={scrollPrev}
				{...props}
			>
				<span className={iconWrapper}>
					<ArrowLeft />
				</span>
			</button>
			<button
				type="button"
				className={clsx(buttonNext[orientation], className)}
				data-slot="carousel-next"
				aria-label="Next slide"
				aria-disabled={!canScrollNext}
				disabled={!canScrollNext}
				onClick={scrollNext}
				{...props}
			>
				<span className={iconWrapper}>
					<ArrowRight />
				</span>
			</button>
		</>
	);
}
