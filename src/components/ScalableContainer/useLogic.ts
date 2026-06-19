import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
	ScalableContainerPosition,
	ScalableContainerProps,
} from './types';

const DEFAULT_POSITION: ScalableContainerPosition = { x: 0, y: 0 };
const OVERLAY_TIMEOUT = 1500;
const DRAG_THRESHOLD = 4;
const ZOOM_FACTOR = 1.5;
const WHEEL_ZOOM_FACTOR = 0.05;

type UseLogicParams = Pick<
	ScalableContainerProps,
	| 'initialScale'
	| 'minScale'
	| 'maxScale'
	| 'onScaleChanged'
	| 'onPositionChanged'
>;

function clampScale(value: number, minScale: number, maxScale: number) {
	return Math.max(minScale, Math.min(maxScale, value));
}

function getDistance(firstTouch: React.Touch, secondTouch: React.Touch) {
	const deltaX = firstTouch.clientX - secondTouch.clientX;
	const deltaY = firstTouch.clientY - secondTouch.clientY;

	return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function shouldSkipDragStart(target: EventTarget | null) {
	if (!(target instanceof Element)) return false;

	return Boolean(
		target.closest(
			'button, a, input, textarea, select, label, path, circle, ellipse, polygon, polyline, line, summary, [role="button"], [contenteditable="true"], [data-scalable-container-interactive]',
		),
	);
}

export function useLogic({
	initialScale = 1,
	minScale = 0.1,
	maxScale = 4,
	onScaleChanged,
	onPositionChanged,
}: UseLogicParams) {
	const initialClampedScale = clampScale(initialScale, minScale, maxScale);
	const [scale, setScaleState] = useState(initialClampedScale);
	const [position, setPositionState] =
		useState<ScalableContainerPosition>(DEFAULT_POSITION);
	const [isDragging, setIsDragging] = useState(false);
	const [showOverlay, setShowOverlay] = useState(false);

	const scaleRef = useRef(initialClampedScale);
	const positionRef = useRef(DEFAULT_POSITION);
	const dragStartRef = useRef(DEFAULT_POSITION);
	const dragOriginRef = useRef(DEFAULT_POSITION);
	const isDraggingRef = useRef(false);
	const didDragRef = useRef(false);
	const activePointersRef = useRef(
		new Map<number, ScalableContainerPosition>(),
	);
	const initialPinchDistanceRef = useRef(0);
	const initialPinchScaleRef = useRef(initialClampedScale);
	const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
	const viewportRef = useRef<HTMLDivElement>(null);

	const setScale = useCallback(
		(value: number) => {
			const nextScale = clampScale(value, minScale, maxScale);

			scaleRef.current = nextScale;
			setScaleState(nextScale);
			onScaleChanged?.(nextScale);
		},
		[maxScale, minScale, onScaleChanged],
	);

	const setPosition = useCallback(
		(nextPosition: ScalableContainerPosition) => {
			positionRef.current = nextPosition;
			setPositionState(nextPosition);
			onPositionChanged?.(nextPosition);
		},
		[onPositionChanged],
	);

	const zoomIn = useCallback(() => {
		setScale(scaleRef.current * ZOOM_FACTOR);
	}, [setScale]);

	const zoomOut = useCallback(() => {
		setScale(scaleRef.current / ZOOM_FACTOR);
	}, [setScale]);

	const reset = useCallback(() => {
		setScale(initialScale);
		setPosition(DEFAULT_POSITION);
	}, [initialScale, setPosition, setScale]);

	const handlePointerDown = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			if (event.pointerType === 'mouse' && event.button !== 0) return;
			if (shouldSkipDragStart(event.target)) return;

			activePointersRef.current.set(event.pointerId, {
				x: event.clientX,
				y: event.clientY,
			});

			if (activePointersRef.current.size === 1) {
				dragOriginRef.current = {
					x: event.clientX,
					y: event.clientY,
				};
				dragStartRef.current = {
					x: event.clientX - positionRef.current.x,
					y: event.clientY - positionRef.current.y,
				};
			}
		},
		[],
	);

	const handlePointerMove = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			if (!activePointersRef.current.has(event.pointerId)) return;

			activePointersRef.current.set(event.pointerId, {
				x: event.clientX,
				y: event.clientY,
			});

			if (activePointersRef.current.size === 1) {
				if (!isDraggingRef.current) {
					const deltaX = event.clientX - dragOriginRef.current.x;
					const deltaY = event.clientY - dragOriginRef.current.y;

					if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < DRAG_THRESHOLD) {
						return;
					}

					event.currentTarget.setPointerCapture(event.pointerId);
					isDraggingRef.current = true;
					didDragRef.current = true;
					setIsDragging(true);
				}

				setPosition({
					x: event.clientX - dragStartRef.current.x,
					y: event.clientY - dragStartRef.current.y,
				});
			}
		},
		[setPosition],
	);

	const handlePointerEnd = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			activePointersRef.current.delete(event.pointerId);

			const remainingPointer = activePointersRef.current.values().next().value;

			if (remainingPointer) {
				dragOriginRef.current = remainingPointer;
				dragStartRef.current = {
					x: remainingPointer.x - positionRef.current.x,
					y: remainingPointer.y - positionRef.current.y,
				};
			}

			isDraggingRef.current = false;
			setIsDragging(false);

			window.setTimeout(() => {
				didDragRef.current = false;
			});
		},
		[],
	);

	const handleClickCapture = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (!didDragRef.current) return;

			event.preventDefault();
			event.stopPropagation();
			didDragRef.current = false;
		},
		[],
	);

	const handleTouchStart = useCallback(
		(event: React.TouchEvent<HTMLDivElement>) => {
			if (event.touches.length !== 2) return;

			initialPinchDistanceRef.current = getDistance(
				event.touches[0],
				event.touches[1],
			);
			initialPinchScaleRef.current = scaleRef.current;
		},
		[],
	);

	const handleTouchMove = useCallback(
		(event: React.TouchEvent<HTMLDivElement>) => {
			if (event.touches.length !== 2 || initialPinchDistanceRef.current === 0) {
				return;
			}

			event.preventDefault();
			const distance = getDistance(event.touches[0], event.touches[1]);
			setScale(
				initialPinchScaleRef.current *
					(distance / initialPinchDistanceRef.current),
			);
		},
		[setScale],
	);

	const handleTouchEnd = useCallback(() => {
		initialPinchDistanceRef.current = 0;
	}, []);

	const handleWheel = useCallback(
		(event: WheelEvent) => {
			const hasModifier = event.metaKey || event.ctrlKey;

			if (hasModifier) {
				event.preventDefault();
				setShowOverlay(false);
				setScale(scaleRef.current - event.deltaY * WHEEL_ZOOM_FACTOR);
			} else {
				setShowOverlay(true);
				clearTimeout(overlayTimeoutRef.current);
				overlayTimeoutRef.current = setTimeout(() => {
					setShowOverlay(false);
				}, OVERLAY_TIMEOUT);
			}
		},
		[setScale],
	);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;

		viewport.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			viewport.removeEventListener('wheel', handleWheel);
		};
	}, [handleWheel]);

	useEffect(
		() => () => {
			clearTimeout(overlayTimeoutRef.current);
		},
		[],
	);

	const transform = useMemo(
		() => `translate(${position.x}px, ${position.y}px) scale(${scale})`,
		[position, scale],
	);

	const modifierKey = useMemo(() => {
		if (typeof navigator === 'undefined') return 'Ctrl';

		return /Mac/i.test(navigator.userAgent) ? '⌘' : 'Ctrl';
	}, []);

	return {
		contentStyle: {
			transform,
			transition: isDragging ? 'none' : 'transform 0.1s ease-out',
		},
		cursor: isDragging ? 'grabbing' : 'grab',
		handleClickCapture,
		handlePointerDown,
		handlePointerEnd,
		handlePointerMove,
		handleTouchEnd,
		handleTouchMove,
		handleTouchStart,
		modifierKey,
		reset,
		showOverlay,
		viewportRef,
		zoomIn,
		zoomOut,
	};
}
