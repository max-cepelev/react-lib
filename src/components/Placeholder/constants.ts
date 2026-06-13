import type { PlaceholderSize } from './types';

export const SIZE: Record<PlaceholderSize, PlaceholderSize> = {
	small: 'small',
	medium: 'medium',
	large: 'large',
} as const;

export const IMAGE_WIDTH = {
	[SIZE.small]: '239px',
	[SIZE.medium]: '323px',
	[SIZE.large]: '458px',
};

export const IMAGE_HEIGHT = {
	[SIZE.small]: '119px',
	[SIZE.medium]: '161px',
	[SIZE.large]: '229px',
};

export const MAX_INNER_WIDTH = {
	[SIZE.small]: '384px',
	[SIZE.medium]: '400px',
	[SIZE.large]: '460px',
};

export const TITLE_HEADER_LEVEL = {
	[SIZE.small]: 'subtitle1',
	[SIZE.medium]: 'h6',
	[SIZE.large]: 'h5',
} as const;
