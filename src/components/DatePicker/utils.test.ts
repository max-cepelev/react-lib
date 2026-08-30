import { describe, expect, it } from 'vitest';
import {
	formatDateInput,
	getDisabledMatchers,
	isDateUnavailable,
	isSameDate,
	parseDateInput,
} from './utils';

describe('DatePicker utils', () => {
	it('parses and formats the default date representation', () => {
		const date = parseDateInput('29.02.2024');

		expect(date).toEqual(new Date(2024, 1, 29));
		expect(date && formatDateInput(date)).toBe('29.02.2024');
	});

	it.each([
		'29.02.2025',
		'31.04.2025',
		'00.12.2025',
		'01.13.2025',
		'1.01.2025',
		'01.01.0999',
		'__.__.____',
		'',
	])('rejects an invalid date: %s', (inputValue) => {
		expect(parseDateInput(inputValue)).toBeNull();
	});

	it('compares dates by calendar day', () => {
		expect(isSameDate(new Date(2025, 0, 1, 8), new Date(2025, 0, 1, 20))).toBe(
			true,
		);
		expect(isSameDate(new Date(2025, 0, 1), new Date(2025, 0, 2))).toBe(false);
	});

	it('combines custom, minimum and maximum disabled matchers', () => {
		const matchers = getDisabledMatchers(
			{ dayOfWeek: [0, 6] },
			new Date(2026, 7, 1),
			new Date(2026, 7, 31),
		);

		expect(isDateUnavailable(new Date(2026, 6, 31), matchers)).toBe(true);
		expect(isDateUnavailable(new Date(2026, 7, 1), matchers)).toBe(true);
		expect(isDateUnavailable(new Date(2026, 7, 3), matchers)).toBe(false);
		expect(isDateUnavailable(new Date(2026, 8, 1), matchers)).toBe(true);
	});
});
