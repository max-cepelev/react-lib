import { useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '../../types';

export const useLogic = (api: CarouselApi) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onDotButtonClick = useCallback(
		(index: number) => {
			api.scrollToSnap(index);
		},
		[api],
	);

	const onInit = useCallback((api: CarouselApi) => {
		setScrollSnaps(api.scrollSnapList());
	}, []);

	const onSelect = useCallback((api: CarouselApi) => {
		setSelectedIndex(api.selectedScrollSnap());
	}, []);

	useEffect(() => {
		onInit(api);
		onSelect(api);
		api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);

		return () => {
			api.off('reInit', onInit).off('reInit', onSelect).off('select', onSelect);
		};
	}, [api, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	};
};
