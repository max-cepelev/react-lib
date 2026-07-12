import { act, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { CarouselAlign, CarouselApi, CarouselOrientation } from '../types';
import { useLogic } from './useLogic';

type HarnessProps = {
	align?: CarouselAlign;
	children?: ReactNode;
	count: number;
	loop?: boolean;
	onApi: (api: CarouselApi | undefined) => void;
	orientation?: CarouselOrientation;
};

type LayoutOptions = {
	offset?: number;
	orientation?: CarouselOrientation;
	slideSize: number;
	viewportSize: number;
};

function Harness({
	align,
	children,
	count,
	loop,
	onApi,
	orientation,
}: HarnessProps) {
	const { carouselRef } = useLogic({ align, loop, orientation, setApi: onApi });
	const slideIds = Array.from(
		{ length: count },
		(_, index) => `slide-${index}`,
	);

	return (
		<div data-testid="viewport" ref={carouselRef}>
			{slideIds.map((slideId) => (
				<div data-slot="carousel-item" key={slideId}>
					{children}
				</div>
			))}
		</div>
	);
}

function defineLayoutProperty<T extends keyof HTMLElement>(
	element: HTMLElement,
	property: T,
	value: HTMLElement[T],
) {
	Object.defineProperty(element, property, {
		configurable: true,
		value,
		writable: true,
	});
}

function configureLayout(
	viewport: HTMLElement,
	{
		offset = 300,
		orientation = 'horizontal',
		slideSize,
		viewportSize,
	}: LayoutOptions,
) {
	const isHorizontal = orientation === 'horizontal';
	const slides = Array.from(
		viewport.querySelectorAll<HTMLElement>('[data-slot="carousel-item"]'),
	);

	defineLayoutProperty(viewport, 'clientWidth', viewportSize);
	defineLayoutProperty(viewport, 'clientHeight', viewportSize);
	defineLayoutProperty(viewport, 'offsetLeft', offset);
	defineLayoutProperty(viewport, 'offsetTop', offset);
	defineLayoutProperty(viewport, 'scrollLeft', 0);
	defineLayoutProperty(viewport, 'scrollTop', 0);
	defineLayoutProperty(
		viewport,
		'scrollWidth',
		isHorizontal ? slides.length * slideSize : viewportSize,
	);
	defineLayoutProperty(
		viewport,
		'scrollHeight',
		isHorizontal ? viewportSize : slides.length * slideSize,
	);
	const scrollTo = vi.fn();
	Object.defineProperty(viewport, 'scrollTo', {
		configurable: true,
		value: scrollTo,
	});

	for (const [index, slide] of slides.entries()) {
		defineLayoutProperty(slide, 'offsetLeft', offset + index * slideSize);
		defineLayoutProperty(slide, 'offsetTop', offset + index * slideSize);
		defineLayoutProperty(slide, 'offsetWidth', slideSize);
		defineLayoutProperty(slide, 'offsetHeight', slideSize);
		vi.spyOn(slide, 'getBoundingClientRect').mockReturnValue({
			bottom: 0,
			height: 0,
			left: (offset + index * slideSize) * 0.95,
			right: 0,
			toJSON: () => ({}),
			top: 0,
			width: slideSize * 0.95,
			x: 0,
			y: 0,
		});
	}

	return scrollTo;
}

function renderCarousel({
	align,
	count,
	loop,
	orientation,
}: Pick<HarnessProps, 'align' | 'count' | 'loop' | 'orientation'>) {
	let api: CarouselApi | undefined;
	render(
		<Harness
			align={align}
			count={count}
			loop={loop}
			onApi={(carouselApi) => {
				api = carouselApi;
			}}
			orientation={orientation}
		/>,
	);

	expect(api).toBeDefined();
	const viewport = screen.getByTestId('viewport');

	return {
		get api() {
			if (!api) throw new Error('Carousel API was not initialized.');
			return api;
		},
		viewport,
	};
}

describe('useLogic', () => {
	it('uses layout offsets when a transformed ancestor scales visual rectangles', () => {
		const carousel = renderCarousel({ count: 16 });
		const scrollTo = configureLayout(carousel.viewport, {
			slideSize: 100,
			viewportSize: 100,
		});

		act(() => {
			carousel.api.reInit();
			carousel.api.scrollTo(11, true);
		});

		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'auto',
			left: 1100,
		});
	});

	it('reaches slide indices above ten without selecting the previous slide', () => {
		const carousel = renderCarousel({ count: 16 });
		const scrollTo = configureLayout(carousel.viewport, {
			slideSize: 100,
			viewportSize: 100,
		});

		act(() => {
			carousel.api.reInit();
			carousel.api.scrollTo(15, true);
		});

		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'auto',
			left: 1500,
		});
	});

	it('moves backward from a clamped terminal snap instead of stalling', () => {
		const carousel = renderCarousel({ align: 'start', count: 10 });
		const scrollTo = configureLayout(carousel.viewport, {
			slideSize: 60,
			viewportSize: 200,
		});

		act(() => {
			carousel.api.reInit();
			carousel.api.scrollTo(9, true);
			carousel.api.scrollPrev();
		});

		expect(scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'auto',
			left: 400,
		});
		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 360,
		});
	});

	it('chains navigation from the pending target while smooth scroll is in progress', () => {
		const carousel = renderCarousel({ count: 16 });
		const scrollTo = configureLayout(carousel.viewport, {
			slideSize: 100,
			viewportSize: 100,
		});

		act(() => {
			carousel.api.reInit();
			carousel.api.scrollTo(11);
			carousel.api.scrollNext();
			carousel.api.scrollPrev();
		});

		expect(scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'smooth',
			left: 1100,
		});
		expect(scrollTo).toHaveBeenNthCalledWith(2, {
			behavior: 'smooth',
			left: 1200,
		});
		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 1100,
		});
	});

	it('wraps vertical navigation when loop is enabled', () => {
		const carousel = renderCarousel({
			count: 3,
			loop: true,
			orientation: 'vertical',
		});
		const scrollTo = configureLayout(carousel.viewport, {
			orientation: 'vertical',
			slideSize: 100,
			viewportSize: 100,
		});

		act(() => {
			carousel.api.reInit();
			carousel.api.scrollPrev();
			carousel.api.scrollNext();
		});

		expect(carousel.api.canScrollPrev()).toBe(true);
		expect(carousel.api.canScrollNext()).toBe(true);
		expect(scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'smooth',
			top: 200,
		});
		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			top: 0,
		});
	});
});
