'use client';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { Arrows } from './Buttons';
import { CarouselContext } from './CarouselContext';
import { Content } from './Content';
import { Dots } from './Dots';
import { Item } from './Item';
import { rootClass } from './styles.css';
import type { CarouselAlign, CarouselApi, CarouselOrientation } from './types';
import { useLogic } from './useLogic';

export type CarouselProps = ComponentProps<'section'> & {
	align?: CarouselAlign;
	initialIndex?: number;
	orientation?: CarouselOrientation;
	setApi?: (api: CarouselApi | undefined) => void;
};

function Carousel({
	align,
	children,
	className,
	initialIndex,
	orientation: orientationProp,
	setApi,
	...props
}: CarouselProps) {
	const {
		canScrollNext,
		canScrollPrev,
		scrollNext,
		scrollPrev,
		api,
		orientation,
		carouselRef,
		handleKeyDown,
	} = useLogic({
		align,
		initialIndex,
		orientation: orientationProp,
		setApi,
	});

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api,
				orientation,
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<section
				onKeyDownCapture={handleKeyDown}
				className={clsx(rootClass, className)}
				data-slot="carousel"
				{...props}
			>
				{children}
			</section>
		</CarouselContext.Provider>
	);
}

Carousel.Content = Content;
Carousel.Item = Item;
Carousel.Arrows = Arrows;
Carousel.Dots = Dots;

export { Carousel };
