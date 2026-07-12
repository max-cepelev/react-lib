import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { CarouselApi } from './types';

vi.mock('./styles.css', () => ({ rootClass: 'carousel' }));
vi.mock('./Buttons/styles.css', () => ({
	buttonNext: { horizontal: 'next', vertical: 'next' },
	buttonPrev: { horizontal: 'previous', vertical: 'previous' },
	iconWrapper: 'icon',
}));
vi.mock('./Content/styles.css', () => ({
	content: 'content',
	orientations: { horizontal: 'horizontal', vertical: 'vertical' },
}));
vi.mock('./Dots/styles.css', () => ({
	dotButton: { horizontal: 'dot', vertical: 'dot' },
	wrapper: { horizontal: 'dots', vertical: 'dots' },
}));
vi.mock('./Item/styles.css', () => ({
	alignments: { center: 'center', end: 'end', start: 'start' },
	item: 'item',
	orientations: { horizontal: 'horizontal', vertical: 'vertical' },
}));

import { Carousel } from './Carousel';

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

function configureLayout(viewport: HTMLElement) {
	const slides = Array.from(
		viewport.querySelectorAll<HTMLElement>('[data-slot="carousel-item"]'),
	);
	const scrollTo = vi.fn();

	defineLayoutProperty(viewport, 'clientWidth', 100);
	defineLayoutProperty(viewport, 'offsetLeft', 0);
	defineLayoutProperty(viewport, 'scrollLeft', 0);
	defineLayoutProperty(viewport, 'scrollWidth', slides.length * 100);
	Object.defineProperty(viewport, 'scrollTo', {
		configurable: true,
		value: scrollTo,
	});

	for (const [index, slide] of slides.entries()) {
		defineLayoutProperty(slide, 'offsetLeft', index * 100);
		defineLayoutProperty(slide, 'offsetWidth', 100);
	}

	return scrollTo;
}

describe('Carousel', () => {
	it('keeps internal refs and navigation when consumers pass refs and click handlers', () => {
		let api: CarouselApi | undefined;
		const contentRef = vi.fn();
		const onArrowClick = vi.fn();
		const slideIds = Array.from({ length: 3 }, (_, index) => `slide-${index}`);

		render(
			<Carousel setApi={(nextApi) => (api = nextApi)}>
				<Carousel.Content data-testid="viewport" ref={contentRef}>
					{slideIds.map((slideId) => (
						<Carousel.Item key={slideId} />
					))}
				</Carousel.Content>
				<Carousel.Arrows onClick={onArrowClick} />
			</Carousel>,
		);

		expect(api).toBeDefined();
		const viewport = screen.getByTestId('viewport');
		const scrollTo = configureLayout(viewport);

		act(() => {
			api?.reInit();
		});
		fireEvent.click(screen.getByLabelText('Next slide'));

		expect(contentRef).toHaveBeenCalledWith(viewport);
		expect(onArrowClick).toHaveBeenCalledTimes(1);
		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 100,
		});
	});

	it('wraps keyboard navigation and keeps both arrows enabled in loop mode', () => {
		let api: CarouselApi | undefined;
		const slideIds = Array.from({ length: 3 }, (_, index) => `slide-${index}`);

		render(
			<Carousel loop setApi={(nextApi) => (api = nextApi)}>
				<Carousel.Content data-testid="viewport">
					{slideIds.map((slideId) => (
						<Carousel.Item key={slideId} />
					))}
				</Carousel.Content>
				<Carousel.Arrows />
			</Carousel>,
		);

		expect(api).toBeDefined();
		const viewport = screen.getByTestId('viewport');
		const scrollTo = configureLayout(viewport);
		const root = viewport.closest('section');
		if (!root) throw new Error('Carousel root was not rendered.');

		act(() => {
			api?.reInit();
		});
		fireEvent.keyDown(root, { key: 'ArrowLeft' });
		fireEvent.keyDown(root, { key: 'ArrowRight' });

		expect(screen.getByLabelText('Previous slide')).not.toBeDisabled();
		expect(screen.getByLabelText('Next slide')).not.toBeDisabled();
		expect(scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'smooth',
			left: 200,
		});
		expect(scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 0,
		});
	});
});
