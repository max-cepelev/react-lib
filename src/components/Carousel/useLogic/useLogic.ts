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
import {
	createScrollSnapModel,
	findNearestSnapIndex,
	getScrollTarget,
} from './scrollModel';

type UseLogicProps = {
	align?: CarouselAlign;
	initialIndex?: number;
	loop?: boolean;
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
function getLayoutOffset(
	element: HTMLElement,
	orientation: CarouselOrientation,
) {
	const offsetProperty =
		orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';
	let offset = 0;
	let current: HTMLElement | null = element;

	while (current) {
		offset += current[offsetProperty];
		current = current.offsetParent as HTMLElement | null;
	}

	return offset;
}

export const useLogic = ({
	orientation = 'horizontal',
	align = 'center',
	initialIndex = 0,
	loop = false,
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
	const loopRef = useRef(loop);
	const initialIndexRef = useRef(initialIndex);
	const didApplyInitialIndexRef = useRef(false);
	const selectedIndexRef = useRef(0);
	const canScrollPrevRef = useRef(false);
	const canScrollNextRef = useRef(false);
	const scrollSnapsRef = useRef<number[]>([]);
	const slideToSnapRef = useRef<number[]>([]);
	const navigationSnapRef = useRef(0);
	const pendingNavigationSnapRef = useRef<number | null>(null);
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

	const getScrollSnapModel = useCallback(() => {
		const viewport = viewportRef.current;
		if (!viewport) return createScrollSnapModel([]);

		const isHorizontal = orientationRef.current === 'horizontal';
		const viewportSize = isHorizontal
			? viewport.clientWidth
			: viewport.clientHeight;

		const max = isHorizontal
			? viewport.scrollWidth - viewport.clientWidth
			: viewport.scrollHeight - viewport.clientHeight;
		const viewportOffset = getLayoutOffset(viewport, orientationRef.current);
		const slideTargets = getSlides().map((slide) => {
			const slideStart =
				getLayoutOffset(slide, orientationRef.current) - viewportOffset;
			const slideSize = isHorizontal ? slide.offsetWidth : slide.offsetHeight;

			return getScrollTarget({
				align: alignRef.current,
				maxScroll: max,
				slideSize,
				slideStart,
				viewportSize,
			});
		});

		return createScrollSnapModel(slideTargets);
	}, [getSlides]);

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

			const nearestIndex = findNearestSnapIndex(scrollSnaps, scrollPosition);

			const canLoop = loopRef.current && scrollSnaps.length > 1;
			const nextCanScrollPrev = canLoop || nearestIndex > 0;
			const nextCanScrollNext =
				canLoop || nearestIndex < scrollSnaps.length - 1;
			selectedIndexRef.current = nearestIndex;
			if (pendingNavigationSnapRef.current === null) {
				navigationSnapRef.current = nearestIndex;
			}

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
			const { scrollSnaps, slideToSnap } = getScrollSnapModel();
			scrollSnapsRef.current = scrollSnaps;
			slideToSnapRef.current = slideToSnap;
			navigationSnapRef.current = Math.min(
				navigationSnapRef.current,
				Math.max(0, scrollSnaps.length - 1),
			);
			updateScrollState(carouselApi);
		},
		[getScrollSnapModel, updateScrollState],
	);

	const api = useMemo<CarouselApi>(() => {
		const carouselApi: CarouselApi = {
			scrollPrev: () => {
				const lastSnapIndex = scrollSnapsRef.current.length - 1;
				const targetIndex =
					loopRef.current && navigationSnapRef.current === 0
						? lastSnapIndex
						: navigationSnapRef.current - 1;

				carouselApi.scrollToSnap(targetIndex);
			},
			scrollNext: () => {
				const lastSnapIndex = scrollSnapsRef.current.length - 1;
				const targetIndex =
					loopRef.current && navigationSnapRef.current === lastSnapIndex
						? 0
						: navigationSnapRef.current + 1;

				carouselApi.scrollToSnap(targetIndex);
			},
			scrollTo: (index, jump = false) => {
				if (slideToSnapRef.current.length === 0) return;
				const targetSlideIndex = Math.max(
					0,
					Math.min(Math.trunc(index), slideToSnapRef.current.length - 1),
				);
				const targetSnapIndex = slideToSnapRef.current[targetSlideIndex];

				carouselApi.scrollToSnap(targetSnapIndex, jump);
			},
			scrollToSnap: (index, jump = false) => {
				const viewport = viewportRef.current;
				const scrollSnaps = scrollSnapsRef.current;
				if (!viewport || scrollSnaps.length === 0) return;

				const targetIndex = Math.max(
					0,
					Math.min(Math.trunc(index), scrollSnaps.length - 1),
				);
				const target = scrollSnaps[targetIndex];
				navigationSnapRef.current = targetIndex;
				pendingNavigationSnapRef.current = jump ? null : targetIndex;
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
	const handleScrollEnd = useCallback(() => {
		pendingNavigationSnapRef.current = null;
		navigationSnapRef.current = selectedIndexRef.current;
	}, []);

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
			viewportRef.current.removeEventListener('scrollend', handleScrollEnd);
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
	}, [handleScroll, handleScrollEnd]);

	const carouselRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (viewportRef.current === node) return;

			detachViewport();
			viewportRef.current = node;

			if (!node) return;

			node.addEventListener('scroll', handleScroll, { passive: true });
			node.addEventListener('scrollend', handleScrollEnd);

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
		[
			api,
			detachViewport,
			handleScroll,
			handleScrollEnd,
			refresh,
			updateScrollState,
		],
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
		loopRef.current = loop;
		api.reInit();
	}, [api, loop, resolvedAlign, resolvedOrientation]);

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
