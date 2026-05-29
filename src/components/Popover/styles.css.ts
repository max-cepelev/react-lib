// --- Анимации ---

import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const zoomIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.95)' },
	to: { opacity: 1, transform: 'scale(1)' },
});

const zoomOut = keyframes({
	from: { opacity: 1, transform: 'scale(1)' },
	to: { opacity: 0, transform: 'scale(0.95)' },
});

export const content = style({
	zIndex: 50,
	minWidth: theme.spacing[8],
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	padding: theme.spacing[4],
	outline: 'none',
	boxShadow: theme.elevation[2],
	selectors: {
		'&[data-starting-style]': {
			animation: `${zoomIn} 250ms ease-in`,
		},
		'&[data-ending-style]': {
			animation: `${zoomOut} 150ms ease-out`,
		},
	},
});

export const positioner = style({
	isolation: 'isolate',
	zIndex: 50,
});
