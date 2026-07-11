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
	initialIndex?: number;
	orientation?: CarouselOrientation;
	setApi?: (api: CarouselApi | undefined) => void;
};

type UseLogicReturn = {
	align: CarouselAlign;
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

const SNAP_EPSILON = 0.5;

export const useLogic = ({
	orientation = 'horizontal',
	align = 'center',
	initialIndex = 0,
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
	const initialIndexRef = useRef(initialIndex);
	const didApplyInitialIndexRef = useRef(false);
	const selectedIndexRef = useRef(0);
	const canScrollPrevRef = useRef(false);
	const canScrollNextRef = useRef(false);
	const scrollSnapsRef = useRef<number[]>([]);
	const animationFrameRef = useRef<number | null>(null);
	const listenersRef = useRef<ListenerMap>({
		reInit: new Set(),
		select: new Set(),
	});
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const getSlides = useCallback(() => {
		const viewport = viewportRef.current;
		if (!viewport) return [];

		return Array.from(viewport.children).filter(
			(slide): slide is HTMLElement =>
				slide instanceof HTMLElement && slide.dataset.slot === 'carousel-item',
		);
	}, []);

	const getTargetFor = useCallback((slide: HTMLElement) => {
		const viewport = viewportRef.current;
		if (!viewport) return 0;

		const isHorizontal = orientationRef.current === 'horizontal';
		const viewportRect = viewport.getBoundingClientRect();
		const slideRect = slide.getBoundingClientRect();
		const viewportSize = isHorizontal
			? viewport.clientWidth
			: viewport.clientHeight;
		const slideSize = isHorizontal ? slide.offsetWidth : slide.offsetHeight;
		const scrollPosition = isHorizontal
			? viewport.scrollLeft
			: viewport.scrollTop;
		const slideStart =
			scrollPosition +
			(isHorizontal
				? slideRect.left - viewportRect.left
				: slideRect.top - viewportRect.top);

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
	}, []);

	const getScrollSnaps = useCallback(() => {
		const scrollSnaps: number[] = [];

		for (const slide of getSlides()) {
			const target = getTargetFor(slide);
			const previousTarget = scrollSnaps.at(-1);

			if (
				previousTarget === undefined ||
				Math.abs(target - previousTarget) > SNAP_EPSILON
			) {
				scrollSnaps.push(target);
			}
		}

		return scrollSnaps;
	}, [getSlides, getTargetFor]);

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

	const updateScrollState = useCallback(
		(carouselApi: CarouselApi) => {
			const viewport = viewportRef.current;
			const previousSelectedIndex = selectedIndexRef.current;
			const scrollSnaps = scrollSnapsRef.current;

			if (!viewport || scrollSnaps.length === 0) {
				selectedIndexRef.current = 0;

				if (canScrollPrevRef.current) {
					canScrollPrevRef.current = false;
					setCanScrollPrev(false);
				}
				if (canScrollNextRef.current) {
					canScrollNextRef.current = false;
					setCanScrollNext(false);
				}

				if (previousSelectedIndex !== 0) {
					emit('select', carouselApi);
				}
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

			const nextCanScrollPrev = nearestIndex > 0;
			const nextCanScrollNext = nearestIndex < scrollSnaps.length - 1;
			selectedIndexRef.current = nearestIndex;

			if (canScrollPrevRef.current !== nextCanScrollPrev) {
				canScrollPrevRef.current = nextCanScrollPrev;
				setCanScrollPrev(nextCanScrollPrev);
			}
			if (canScrollNextRef.current !== nextCanScrollNext) {
				canScrollNextRef.current = nextCanScrollNext;
				setCanScrollNext(nextCanScrollNext);
			}

			if (previousSelectedIndex !== nearestIndex) {
				emit('select', carouselApi);
			}
		},
		[emit],
	);

	const refresh = useCallback(
		(carouselApi: CarouselApi) => {
			scrollSnapsRef.current = getScrollSnaps();
			updateScrollState(carouselApi);
		},
		[getScrollSnaps, updateScrollState],
	);

	const api = useMemo<CarouselApi>(() => {
		const carouselApi: CarouselApi = {
			scrollPrev: () => {
				carouselApi.scrollTo(selectedIndexRef.current - 1);
			},
			scrollNext: () => {
				carouselApi.scrollTo(selectedIndexRef.current + 1);
			},
			scrollTo: (index, jump = false) => {
				const viewport = viewportRef.current;
				const scrollSnaps = scrollSnapsRef.current;
				if (!viewport || scrollSnaps.length === 0) return;

				const targetIndex = Math.max(
					0,
					Math.min(Math.trunc(index), scrollSnaps.length - 1),
				);
				const target = scrollSnaps[targetIndex];
				viewport.scrollTo(
					orientationRef.current === 'horizontal'
						? { left: target, behavior: jump ? 'auto' : 'smooth' }
						: { top: target, behavior: jump ? 'auto' : 'smooth' },
				);
			},
			canScrollNext: () => canScrollNextRef.current,
			canScrollPrev: () => canScrollPrevRef.current,
			selectedScrollSnap: () => selectedIndexRef.current,
			scrollSnapList: () => [...scrollSnapsRef.current],
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
				refresh(carouselApi);
				emit('reInit', carouselApi);
			},
		};

		return carouselApi;
	}, [emit, rebindSlideObservers, refresh]);

	const handleScroll = useCallback(() => {
		if (animationFrameRef.current !== null) return;

		if (typeof requestAnimationFrame === 'undefined') {
			updateScrollState(api);
			return;
		}

		animationFrameRef.current = requestAnimationFrame(() => {
			animationFrameRef.current = null;
			updateScrollState(api);
		});
	}, [api, updateScrollState]);

	const detachViewport = useCallback(() => {
		if (viewportRef.current) {
			viewportRef.current.removeEventListener('scroll', handleScroll);
		}
		if (
			animationFrameRef.current !== null &&
			typeof cancelAnimationFrame !== 'undefined'
		) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		animationFrameRef.current = null;
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

			if (!node) return;

			node.addEventListener('scroll', handleScroll, { passive: true });

			if (typeof ResizeObserver !== 'undefined') {
				resizeObserverRef.current = new ResizeObserver(() => refresh(api));
				resizeObserverRef.current.observe(node);
			}

			if (typeof MutationObserver !== 'undefined') {
				mutationObserverRef.current = new MutationObserver(() => api.reInit());
				mutationObserverRef.current.observe(node, {
					childList: true,
					subtree: false,
				});
			}

			api.reInit();

			if (!didApplyInitialIndexRef.current) {
				didApplyInitialIndexRef.current = true;
				api.scrollTo(initialIndexRef.current, true);
				updateScrollState(api);
			}
		},
		[api, detachViewport, handleScroll, refresh, updateScrollState],
	);

	const scrollPrev = useCallback(() => {
		api.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api.scrollNext();
	}, [api]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.defaultPrevented) return;

			const target = event.target;
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable ||
					['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
					target.closest('[role="slider"]'))
			) {
				return;
			}

			const isHorizontal = orientationRef.current === 'horizontal';
			const previousKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
			const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

			if (event.key === previousKey) {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === nextKey) {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	useEffect(() => {
		orientationRef.current = resolvedOrientation;
		alignRef.current = resolvedAlign;
		api.reInit();
	}, [api, resolvedAlign, resolvedOrientation]);

	useEffect(() => {
		setApi?.(api);
		return () => setApi?.(undefined);
	}, [api, setApi]);

	useEffect(() => {
		return () => detachViewport();
	}, [detachViewport]);

	return {
		align: resolvedAlign,
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
