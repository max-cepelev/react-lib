import { render, screen } from '@testing-library/react';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./styles.css', () => ({
	dropdownNav: 'calendar-dropdown',
	dropdowns: 'calendar-dropdowns',
	month: 'calendar-month',
	monthButton: 'calendar-month-button',
	monthCaption: 'calendar-month-caption',
	months: 'calendar-months',
	nav: 'calendar-nav',
}));

vi.mock('../Button/Button', () => ({
	Button: (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
		<button {...props} />
	),
}));

vi.mock('../Typography/Typography', () => ({
	Typography: ({
		align: _align,
		color: _color,
		component: _component,
		transform: _transform,
		variant: _variant,
		weight: _weight,
		...props
	}: HTMLAttributes<HTMLSpanElement> & Record<string, unknown>) => (
		<span {...props} />
	),
}));

vi.mock('./DayButton', () => ({
	DayButton: ({
		day: _day,
		modifiers: _modifiers,
		...props
	}: ButtonHTMLAttributes<HTMLButtonElement> & Record<string, unknown>) => (
		<button {...props} />
	),
}));

vi.mock('./Dropdown', () => ({
	Dropdown: () => null,
}));

import { Calendar } from './Calendar';

describe('Calendar', () => {
	it('merges consumer class names and forwards root styles', () => {
		render(
			<Calendar
				mode="single"
				defaultMonth={new Date(2026, 7, 1)}
				role="application"
				aria-label="Календарь"
				className="custom-root"
				style={{ width: 320 }}
				classNames={{
					month: 'custom-month',
					nav: 'custom-nav',
				}}
			/>,
		);

		const root = screen.getByRole('application', { name: 'Календарь' });
		const month = root.querySelector('.custom-month');
		const navigation = root.querySelector('.custom-nav');

		expect(root).toHaveClass('custom-root');
		expect(root).toHaveStyle({ width: '320px' });
		expect(month).toHaveClass('calendar-month');
		expect(navigation).toHaveClass('calendar-nav');
	});
});
