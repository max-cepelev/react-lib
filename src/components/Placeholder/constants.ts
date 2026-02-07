import type { PlaceholderSize } from './types';

export const SIZE: Record<PlaceholderSize, PlaceholderSize> = {
	sm: 'sm',
	md: 'md',
	lg: 'lg',
} as const;

export const IMAGE_WIDTH = {
	[SIZE.sm]: '239px',
	[SIZE.md]: '323px',
	[SIZE.lg]: '458px',
};

export const IMAGE_HEIGHT = {
	[SIZE.sm]: '119px',
	[SIZE.md]: '161px',
	[SIZE.lg]: '229px',
};

export const MAX_INNER_WIDTH = {
	[SIZE.sm]: '384px',
	[SIZE.md]: '400px',
	[SIZE.lg]: '460px',
};

export const TITLE_HEADER_LEVEL = {
	[SIZE.sm]: 'subtitle1',
	[SIZE.md]: 'h6',
	[SIZE.lg]: 'h5',
} as const;
