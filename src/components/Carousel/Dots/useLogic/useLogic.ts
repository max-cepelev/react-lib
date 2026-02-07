import { useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '../../types';

export const useLogic = (api: CarouselApi) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!api) return;
			api.scrollTo(index);
		},
		[api],
	);

	const onInit = useCallback((api: CarouselApi) => {
		if (!api) return;
		setScrollSnaps(api.scrollSnapList());
	}, []);

	const onSelect = useCallback((api: CarouselApi) => {
		if (!api) return;
		setSelectedIndex(api.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!api) return;

		onInit(api);
		onSelect(api);
		api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
	}, [api, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	};
};
