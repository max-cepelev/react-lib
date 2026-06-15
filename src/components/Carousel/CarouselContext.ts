import React from 'react';
import type { CarouselApi, CarouselOrientation } from './types';

type CarouselContextProps = {
	carouselRef: (node: HTMLDivElement | null) => void;
	api: CarouselApi;
	orientation: CarouselOrientation;
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
};

export const CarouselContext = React.createContext<CarouselContextProps | null>(
	null,
);

export function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}
