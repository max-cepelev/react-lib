import { dateMatchModifiers, type Matcher } from 'react-day-picker';

const DATE_PATTERN = /^(\d{2})\.(\d{2})\.(\d{4})$/;

export const isValidDate = (value: unknown): value is Date =>
	value instanceof Date && !Number.isNaN(value.getTime());

export const isSameDate = (first: Date | null, second: Date | null) => {
	if (first === null || second === null) {
		return first === second;
	}

	return (
		first.getFullYear() === second.getFullYear() &&
		first.getMonth() === second.getMonth() &&
		first.getDate() === second.getDate()
	);
};

export const formatDateInput = (date: Date) => {
	if (!isValidDate(date)) {
		return '';
	}

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = String(date.getFullYear()).padStart(4, '0');

	return `${day}.${month}.${year}`;
};

export const parseDateInput = (inputValue: string) => {
	const match = DATE_PATTERN.exec(inputValue.trim());

	if (!match) {
		return null;
	}

	const [, dayValue, monthValue, yearValue] = match;
	const day = Number(dayValue);
	const month = Number(monthValue);
	const year = Number(yearValue);

	if (year < 1000) {
		return null;
	}

	const date = new Date(year, month - 1, day);

	if (
		date.getFullYear() !== year ||
		date.getMonth() !== month - 1 ||
		date.getDate() !== day
	) {
		return null;
	}

	return date;
};

export const getDisabledMatchers = (
	disabled: Matcher | Matcher[] | undefined,
	min: Date | undefined,
	max: Date | undefined,
) => {
	const matchers: Matcher[] = [];

	if (Array.isArray(disabled)) {
		matchers.push(...disabled);
	} else if (disabled !== undefined) {
		matchers.push(disabled);
	}

	if (isValidDate(min)) {
		matchers.push({ before: min });
	}

	if (isValidDate(max)) {
		matchers.push({ after: max });
	}

	return matchers;
};

export const isDateUnavailable = (date: Date, matchers: Matcher[]) =>
	matchers.length > 0 && dateMatchModifiers(date, matchers);
