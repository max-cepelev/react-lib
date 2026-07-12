import type { CarouselAlign } from '../types';

export type ScrollSnapModel = {
	scrollSnaps: number[];
	slideToSnap: number[];
};

type GetScrollTargetOptions = {
	align: CarouselAlign;
	maxScroll: number;
	slideSize: number;
	slideStart: number;
	viewportSize: number;
};

export const SNAP_EPSILON = 0.5;

export function getScrollTarget({
	align,
	maxScroll,
	slideSize,
	slideStart,
	viewportSize,
}: GetScrollTargetOptions) {
	let target = slideStart;

	if (align === 'center') {
		target -= (viewportSize - slideSize) / 2;
	} else if (align === 'end') {
		target -= viewportSize - slideSize;
	}

	return Math.max(0, Math.min(target, Math.max(0, maxScroll)));
}

export function createScrollSnapModel(slideTargets: number[]): ScrollSnapModel {
	const scrollSnaps: number[] = [];
	const slideToSnap: number[] = [];

	for (const target of slideTargets) {
		const previousTarget = scrollSnaps.at(-1);

		if (
			previousTarget === undefined ||
			Math.abs(target - previousTarget) > SNAP_EPSILON
		) {
			scrollSnaps.push(target);
		}

		slideToSnap.push(scrollSnaps.length - 1);
	}

	return { scrollSnaps, slideToSnap };
}

export function findNearestSnapIndex(
	scrollSnaps: number[],
	scrollPosition: number,
) {
	let nearestIndex = 0;
	let nearestDistance = Number.POSITIVE_INFINITY;

	for (let index = 0; index < scrollSnaps.length; index += 1) {
		const distance = Math.abs(scrollSnaps[index] - scrollPosition);

		if (distance < nearestDistance) {
			nearestDistance = distance;
			nearestIndex = index;
		}
	}

	return nearestIndex;
}
