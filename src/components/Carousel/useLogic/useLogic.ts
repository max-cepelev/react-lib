import {
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import type {
	CarouselAlign,
	CarouselApi,
	CarouselEventCallback,
	CarouselEventName,
	CarouselOrientation,
} from '../types';

type UseLogicProps = {
	align?: CarouselAlign;
	orientation?: CarouselOrientation;
	setApi?: (api: CarouselApi | undefined) => void;
};

type UseLogicReturn = {
	carouselRef: (node: HTMLDivElement | null) => void;
	api: CarouselApi;
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
	orientation: CarouselOrientation;
};

type ListenerMap = Record<CarouselEventName, Set<CarouselEventCallback>>;

export const useLogic = ({
	orientation = 'horizontal',
	align = 'center',
	setApi,
}: UseLogicProps): UseLogicReturn => {
	const resolvedOrientation = orientation;
	const resolvedAlign = align;

	const viewportRef = useRef<HTMLDivElement | null>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const mutationObserverRef = useRef<MutationObserver | null>(null);
	const observedSlidesRef = useRef<HTMLElement[]>([]);
	const orientationRef = useRef(resolvedOrientation);
	const alignRef = useRef(resolvedAlign);
	const selectedIndexRef = useRef(0);
	const canScrollPrevRef = useRef(false);
	const canScrollNextRef = useRef(false);
	const scrollSnapsRef = useRef<number[]>([]);
	const listenersRef = useRef<ListenerMap>({
		reInit: new Set(),
		select: new Set(),
	});
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const getSlides = useCallback(() => {
		if (!viewportRef.current) return [];
		return Array.from(
			viewportRef.current.querySelectorAll<HTMLElement>(
				'[data-slot="carousel-item"]',
			),
		);
	}, []);

	const getTargetFor = useCallback(
		(index: number) => {
			const viewport = viewportRef.current;
			if (!viewport) return 0;

			const slide = getSlides()[index];
			if (!slide) return 0;

			const isHorizontal = orientationRef.current === 'horizontal';
			const viewportSize = isHorizontal
				? viewport.clientWidth
				: viewport.clientHeight;
			const slideSize = isHorizontal ? slide.offsetWidth : slide.offsetHeight;
			const slideStart = isHorizontal ? slide.offsetLeft : slide.offsetTop;

			let target = slideStart;
			if (alignRef.current === 'center') {
				target = slideStart - (viewportSize - slideSize) / 2;
			} else if (alignRef.current === 'end') {
				target = slideStart - (viewportSize - slideSize);
			}

			const max = isHorizontal
				? viewport.scrollWidth - viewport.clientWidth
				: viewport.scrollHeight - viewport.clientHeight;

			return Math.max(0, Math.min(target, Math.max(0, max)));
		},
		[getSlides],
	);

	const emit = useCallback((event: CarouselEventName, api: CarouselApi) => {
		for (const callback of listenersRef.current[event]) {
			callback(api);
		}
	}, []);

	const rebindSlideObservers = useCallback(() => {
		const resizeObserver = resizeObserverRef.current;
		if (!resizeObserver) return;

		for (const slide of observedSlidesRef.current) {
			resizeObserver.unobserve(slide);
		}
		observedSlidesRef.current = getSlides();
		for (const slide of observedSlidesRef.current) {
			resizeObserver.observe(slide);
		}
	}, [getSlides]);

	const api = useMemo<CarouselApi>(() => {
		const carouselApi: CarouselApi = {
			scrollPrev: () => {
				carouselApi.scrollTo(Math.max(0, selectedIndexRef.current - 1));
			},
			scrollNext: () => {
				const lastIndex = getSlides().length - 1;
				if (lastIndex < 0) return;
				carouselApi.scrollTo(Math.min(lastIndex, selectedIndexRef.current + 1));
			},
			scrollTo: (index, jump = false) => {
				const viewport = viewportRef.current;
				if (!viewport) return;

				const target = getTargetFor(index);
				viewport.scrollTo(
					orientationRef.current === 'horizontal'
						? { left: target, behavior: jump ? 'auto' : 'smooth' }
						: { top: target, behavior: jump ? 'auto' : 'smooth' },
				);
			},
			canScrollNext: () => canScrollNextRef.current,
			canScrollPrev: () => canScrollPrevRef.current,
			selectedScrollSnap: () => selectedIndexRef.current,
			scrollSnapList: () => scrollSnapsRef.current,
			on: (event, callback) => {
				listenersRef.current[event].add(callback);
				return carouselApi;
			},
			off: (event, callback) => {
				listenersRef.current[event].delete(callback);
				return carouselApi;
			},
			reInit: () => {
				rebindSlideObservers();
				const slides = getSlides();
				scrollSnapsRef.current = slides.map((_, index) => getTargetFor(index));
				emit('reInit', carouselApi);
				emit('select', carouselApi);
			},
		};

		return carouselApi;
	}, [emit, getSlides, getTargetFor, rebindSlideObservers]);

	const refresh = useCallback(() => {
		const viewport = viewportRef.current;
		const slides = getSlides();
		const scrollSnaps = slides.map((_, index) => getTargetFor(index));
		scrollSnapsRef.current = scrollSnaps;

		if (!viewport || slides.length === 0) {
			selectedIndexRef.current = 0;
			canScrollPrevRef.current = false;
			canScrollNextRef.current = false;
			setCanScrollPrev(false);
			setCanScrollNext(false);
			emit('select', api);
			return;
		}

		const scrollPosition =
			orientationRef.current === 'horizontal'
				? viewport.scrollLeft
				: viewport.scrollTop;

		let nearestIndex = 0;
		let nearestDistance = Number.POSITIVE_INFINITY;
		for (let index = 0; index < scrollSnaps.length; index += 1) {
			const distance = Math.abs(scrollSnaps[index] - scrollPosition);
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = index;
			}
		}

		selectedIndexRef.current = nearestIndex;
		canScrollPrevRef.current = nearestIndex > 0;
		canScrollNextRef.current = nearestIndex < slides.length - 1;
		setCanScrollPrev(canScrollPrevRef.current);
		setCanScrollNext(canScrollNextRef.current);
		emit('select', api);
	}, [api, emit, getSlides, getTargetFor]);

	const handleScroll = useCallback(() => {
		refresh();
	}, [refresh]);

	const detachViewport = useCallback(() => {
		if (viewportRef.current) {
			viewportRef.current.removeEventListener('scroll', handleScroll);
		}
		resizeObserverRef.current?.disconnect();
		mutationObserverRef.current?.disconnect();
		resizeObserverRef.current = null;
		mutationObserverRef.current = null;
		observedSlidesRef.current = [];
	}, [handleScroll]);

	const carouselRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (viewportRef.current === node) return;

			detachViewport();
			viewportRef.current = node;

			if (!node) {
				refresh();
				return;
			}

			node.addEventListener('scroll', handleScroll, { passive: true });

			if (typeof ResizeObserver !== 'undefined') {
				resizeObserverRef.current = new ResizeObserver(refresh);
				resizeObserverRef.current.observe(node);
			}

			if (typeof MutationObserver !== 'undefined') {
				mutationObserverRef.current = new MutationObserver(() => {
					rebindSlideObservers();
					refresh();
					api.reInit();
				});
				mutationObserverRef.current.observe(node, {
					childList: true,
					subtree: false,
				});
			}

			rebindSlideObservers();
			refresh();
		},
		[api, detachViewport, handleScroll, rebindSlideObservers, refresh],
	);

	const scrollPrev = useCallback(() => {
		api.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api.scrollNext();
	}, [api]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	useEffect(() => {
		orientationRef.current = resolvedOrientation;
		alignRef.current = resolvedAlign;
		refresh();
		api.reInit();
	}, [api, refresh, resolvedAlign, resolvedOrientation]);

	useEffect(() => {
		setApi?.(api);
		return () => setApi?.(undefined);
	}, [api, setApi]);

	useEffect(() => {
		return () => detachViewport();
	}, [detachViewport]);

	return {
		carouselRef,
		api,
		scrollPrev,
		scrollNext,
		canScrollPrev,
		canScrollNext,
		handleKeyDown,
		orientation,
	};
};
