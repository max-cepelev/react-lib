import { describe, expect, it } from 'vitest';
import {
	createScrollSnapModel,
	findNearestSnapIndex,
	getScrollTarget,
} from './scrollModel';

describe('scrollModel', () => {
	it('calculates clamped targets for every alignment', () => {
		expect(
			getScrollTarget({
				align: 'start',
				maxScroll: 600,
				slideSize: 100,
				slideStart: 250,
				viewportSize: 200,
			}),
		).toBe(250);
		expect(
			getScrollTarget({
				align: 'center',
				maxScroll: 600,
				slideSize: 100,
				slideStart: 250,
				viewportSize: 200,
			}),
		).toBe(200);
		expect(
			getScrollTarget({
				align: 'end',
				maxScroll: 600,
				slideSize: 100,
				slideStart: 250,
				viewportSize: 200,
			}),
		).toBe(150);
	});

	it('maps terminal slides to their shared clamped snap', () => {
		expect(
			createScrollSnapModel([0, 60, 120, 180, 240, 300, 360, 400, 400, 400]),
		).toEqual({
			scrollSnaps: [0, 60, 120, 180, 240, 300, 360, 400],
			slideToSnap: [0, 1, 2, 3, 4, 5, 6, 7, 7, 7],
		});
	});

	it('finds the closest snap', () => {
		expect(findNearestSnapIndex([0, 100, 200], 148)).toBe(1);
		expect(findNearestSnapIndex([0, 100, 200], 151)).toBe(2);
	});
});
