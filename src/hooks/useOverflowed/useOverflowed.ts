import { useCallback, useLayoutEffect, useRef, useState } from 'react';

type ResizeObserverData = Pick<ResizeObserverEntry, 'target' | 'contentRect'>;

const RESIZE_DEBOUNCE_MS = 500;

const setRef = (
	ref: React.Ref<HTMLElement> | undefined,
	node: HTMLElement | null,
) => {
	if (!ref) return;

	if (typeof ref === 'function') {
		ref(node);
		return;
	}

	ref.current = node;
};

export const useOverflowed = (
	forwardedRef?: React.Ref<HTMLElement>,
	hasMultipleRows = false,
) => {
	const localRef = useRef<HTMLElement | null>(null);
	const resizeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const [isOverflowed, setOverflowed] = useState(false);

	const checkOverflow = useCallback(
		([{ target, contentRect }]: ResizeObserverData[]) => {
			const isScrollHeightBigger =
				target.scrollHeight > Math.round(contentRect.height);
			const isScrollWidthBigger =
				target.scrollWidth > Math.round(contentRect.width);
			const nextIsOverflowed = hasMultipleRows
				? isScrollWidthBigger || isScrollHeightBigger
				: isScrollWidthBigger;

			setOverflowed((current) =>
				current === nextIsOverflowed ? current : nextIsOverflowed,
			);
		},
		[hasMultipleRows],
	);

	const ref = useCallback(
		(node: HTMLElement | null) => {
			localRef.current = node;
			setRef(forwardedRef, node);
		},
		[forwardedRef],
	);

	const check = useCallback(
		(_checkKey?: string) => {
			const node = localRef.current;
			if (!node) return;

			checkOverflow([
				{ target: node, contentRect: node.getBoundingClientRect() },
			]);
		},
		[checkOverflow],
	);

	useLayoutEffect(() => {
		const node = localRef.current;
		if (!node) return;

		check();

		const resizeObserver = new ResizeObserver((entries) => {
			clearTimeout(resizeTimer.current);
			resizeTimer.current = setTimeout(() => {
				checkOverflow(entries);
			}, RESIZE_DEBOUNCE_MS);
		});

		resizeObserver.observe(node);

		return () => {
			clearTimeout(resizeTimer.current);
			resizeObserver.unobserve(node);
			resizeObserver.disconnect();
		};
	}, [check, checkOverflow]);

	return { check, isOverflowed, ref };
};
