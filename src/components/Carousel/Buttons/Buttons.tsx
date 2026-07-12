import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type ComponentProps, useCallback } from 'react';
import { useCarousel } from '../CarouselContext';
import { buttonNext, buttonPrev, iconWrapper } from './styles.css';

export function Arrows({
	className,
	onClick,
	...props
}: ComponentProps<'button'>) {
	const {
		orientation = 'horizontal',
		canScrollNext,
		scrollNext,
		canScrollPrev,
		scrollPrev,
	} = useCarousel();
	const handlePreviousClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			onClick?.(event);
			if (!event.defaultPrevented) scrollPrev();
		},
		[onClick, scrollPrev],
	);
	const handleNextClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			onClick?.(event);
			if (!event.defaultPrevented) scrollNext();
		},
		[onClick, scrollNext],
	);

	return (
		<>
			<button
				{...props}
				className={clsx(buttonPrev[orientation], className)}
				type="button"
				data-slot="carousel-previous"
				aria-label="Previous slide"
				aria-disabled={!canScrollPrev}
				disabled={!canScrollPrev}
				onClick={handlePreviousClick}
			>
				<span className={iconWrapper}>
					<ArrowLeft />
				</span>
			</button>
			<button
				{...props}
				type="button"
				className={clsx(buttonNext[orientation], className)}
				data-slot="carousel-next"
				aria-label="Next slide"
				aria-disabled={!canScrollNext}
				disabled={!canScrollNext}
				onClick={handleNextClick}
			>
				<span className={iconWrapper}>
					<ArrowRight />
				</span>
			</button>
		</>
	);
}
