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

// const slideFromTop = keyframes({
//   from: { opacity: 0, transform: 'translateY(-0.5rem)' },
//   to: { opacity: 1, transform: 'translateY(0)' },
// });

// const slideFromBottom = keyframes({
//   from: { opacity: 0, transform: 'translateY(0.5rem)' },
//   to: { opacity: 1, transform: 'translateY(0)' },
// });

export const positionerClass = style({
	isolation: 'isolate',
	zIndex: 50,
});

export const contentClass = style({
	zIndex: 50,
	overflow: 'visible',
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.tooltip,
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	boxShadow: theme.elevation[3],
	color: theme.colors.foreground.primary,
	maxWidth: 400,
	selectors: {
		'&[data-open]': {
			animation: `${zoomIn} 150ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${zoomOut} 150ms ease-out`,
		},
		// '&[data-side="top"]': {
		// 	animation: `${slideFromBottom} 150ms ease-out`,
		// },
		// '&[data-side="bottom"]': {
		// 	animation: `${slideFromTop} 150ms ease-out`,
		// },
		// '&[data-side="left"]': {
		// 	animation: `${slideFromRight} 150ms ease-out`,
		// },
		// '&[data-side="right"]': {
		// 	animation: `${slideFromLeft} 150ms ease-out`,
		// },
	},
});

export const textClass = style({
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
});

export const arrowClass = style({
	zIndex: 50,
	width: '0.625rem',
	height: '0.625rem',
	backgroundColor: theme.colors.background.tooltip,
	borderRadius: 2,
	pointerEvents: 'none',
	transform: 'rotate(45deg)',

	selectors: {
		'&[data-side="top"]': {
			bottom: '-0.25rem',
		},
		'&[data-side="bottom"]': {
			top: '-0.25rem',
		},
		'&[data-side="left"], &[data-side="inline-start"]': {
			right: '-0.25rem',
		},
		'&[data-side="right"], &[data-side="inline-end"]': {
			left: '-0.25rem',
		},
	},
});
