import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import type { CarouselProps } from '../Carousel';
import type { CarouselApi, CarouselOptions } from '../types';

type UseLogicReturn<TData> = {
	carouselRef: (emblaRoot: HTMLElement | null) => void;
	api: CarouselApi | undefined;
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
	opts: CarouselOptions | undefined;
	orientation: 'horizontal' | 'vertical';
	onDotButtonClick: (index: number) => void;
	isShowButtons: boolean;
	isShowDots: boolean;
	data: TData[];
};

export const useLogic = <TData>({
	orientation = 'horizontal',
	opts,
	setApi,
	plugins,
	data,
	showDots,
	showArrows,
}: CarouselProps<TData>): UseLogicReturn<TData> => {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === 'horizontal' ? 'x' : 'y',
		},
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const isShowButtons = Boolean(showArrows && data.length > 1);

	const isShowDots = Boolean(showDots && data.length > 1);

	const onSelect = useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!api) return;
			api.scrollTo(index);
		},
		[api],
	);

	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on('reInit', onSelect);
		api.on('select', onSelect);

		return () => {
			api?.off('select', onSelect);
		};
	}, [api, onSelect]);

	return {
		carouselRef,
		api,
		scrollPrev,
		scrollNext,
		canScrollPrev,
		canScrollNext,
		handleKeyDown,
		opts,
		orientation,
		onDotButtonClick,
		isShowButtons,
		isShowDots,
		data,
	};
};
