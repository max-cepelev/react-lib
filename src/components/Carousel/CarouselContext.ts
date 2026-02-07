import type { EmblaViewportRefType } from 'embla-carousel-react';

import React from 'react';
import type { CarouselApi, CarouselOptions } from './types';

type CarouselContextProps = {
	carouselRef: EmblaViewportRefType;
	api: CarouselApi;
	opts: CarouselOptions;
	orientation: 'horizontal' | 'vertical';
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
