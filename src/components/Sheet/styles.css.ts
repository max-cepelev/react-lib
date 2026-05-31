import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

const slideDistance = theme.spacing[10];
const negativeSlideDistance = `calc(-1 * ${slideDistance})`;

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

const slideInFromRight = keyframes({
	from: { opacity: 0, transform: `translateX(${slideDistance})` },
	to: { opacity: 1, transform: 'translateX(0)' },
});

const slideOutToRight = keyframes({
	from: { opacity: 1, transform: 'translateX(0)' },
	to: { opacity: 0, transform: `translateX(${slideDistance})` },
});

const slideInFromLeft = keyframes({
	from: { opacity: 0, transform: `translateX(${negativeSlideDistance})` },
	to: { opacity: 1, transform: 'translateX(0)' },
});

const slideOutToLeft = keyframes({
	from: { opacity: 1, transform: 'translateX(0)' },
	to: { opacity: 0, transform: `translateX(${negativeSlideDistance})` },
});

const slideInFromTop = keyframes({
	from: { opacity: 0, transform: `translateY(${negativeSlideDistance})` },
	to: { opacity: 1, transform: 'translateY(0)' },
});

const slideOutToTop = keyframes({
	from: { opacity: 1, transform: 'translateY(0)' },
	to: { opacity: 0, transform: `translateY(${negativeSlideDistance})` },
});

const slideInFromBottom = keyframes({
	from: { opacity: 0, transform: `translateY(${slideDistance})` },
	to: { opacity: 1, transform: 'translateY(0)' },
});

const slideOutToBottom = keyframes({
	from: { opacity: 1, transform: 'translateY(0)' },
	to: { opacity: 0, transform: `translateY(${slideDistance})` },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 50,
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
	backdropFilter: 'blur(4px)',
	selectors: {
		'&[data-open]': {
			animation: `${fadeIn} 100ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${fadeOut} 100ms ease-in`,
		},
		'&[data-starting-style], &[data-ending-style]': {
			opacity: 0,
		},
	},
});

export const content = style({
	position: 'fixed',
	zIndex: 50,
	display: 'flex',
	flexDirection: 'column',
	gap: spacing(4),
	backgroundClip: 'padding-box',
	backgroundColor: theme.colors.background.paper,
	boxShadow: theme.elevation[3],
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.sm,
	outline: 'none',
	transitionDuration: '200ms',
	transitionProperty: 'transform, opacity',
	transitionTimingFunction: 'ease-in-out',
	selectors: {
		'&[data-starting-style], &[data-ending-style]': {
			opacity: 0,
		},
		'&[data-side="right"]': {
			top: 0,
			right: 0,
			bottom: 0,
			width: '75%',
			height: '100%',
			borderLeft: `1px solid ${theme.colors.border}`,
		},
		'&[data-side="right"][data-open]': {
			animation: `${slideInFromRight} 200ms ease-in-out`,
		},
		'&[data-side="right"][data-closed]': {
			animation: `${slideOutToRight} 200ms ease-in-out`,
		},
		'&[data-side="left"]': {
			top: 0,
			bottom: 0,
			left: 0,
			width: '75%',
			height: '100%',
			borderRight: `1px solid ${theme.colors.border}`,
		},
		'&[data-side="left"][data-open]': {
			animation: `${slideInFromLeft} 200ms ease-in-out`,
		},
		'&[data-side="left"][data-closed]': {
			animation: `${slideOutToLeft} 200ms ease-in-out`,
		},
		'&[data-side="top"]': {
			top: 0,
			right: 0,
			left: 0,
			height: 'auto',
			borderBottom: `1px solid ${theme.colors.border}`,
		},
		'&[data-side="top"][data-open]': {
			animation: `${slideInFromTop} 200ms ease-in-out`,
		},
		'&[data-side="top"][data-closed]': {
			animation: `${slideOutToTop} 200ms ease-in-out`,
		},
		'&[data-side="bottom"]': {
			right: 0,
			bottom: 0,
			left: 0,
			height: 'auto',
			borderTop: `1px solid ${theme.colors.border}`,
		},
		'&[data-side="bottom"][data-open]': {
			animation: `${slideInFromBottom} 200ms ease-in-out`,
		},
		'&[data-side="bottom"][data-closed]': {
			animation: `${slideOutToBottom} 200ms ease-in-out`,
		},
	},
	'@media': {
		'(min-width: 640px)': {
			selectors: {
				'&[data-side="left"], &[data-side="right"]': {
					maxWidth: '24rem',
				},
			},
		},
	},
});

export const closeButton = style({
	position: 'absolute',
	top: theme.spacing[3],
	right: theme.spacing[3],
});

export const closeText = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.125rem',
	padding: spacing(4),
});

export const footer = style({
	marginTop: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: spacing(2),
	padding: spacing(4),
});

export const title = style({
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.base,
	fontWeight: theme.fontWeight.medium,
	lineHeight: theme.lineHeight.normal,
	margin: 0,
	paddingRight: spacing(8),
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.normal,
	margin: 0,
});
