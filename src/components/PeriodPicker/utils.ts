import { QUARTERS } from './constants';

export const getQuarter = (month: number): number => Math.ceil(month / 3);

export const getMonth = (quarter: number): number => (quarter - 1) * 3;

export const getQuarterLabel = (date?: Date | null): string => {
	if (!date) {
		return '';
	}
	return `${QUARTERS[getQuarter(date.getMonth())]} ${date.getFullYear()}`;
};
