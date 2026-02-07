import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 50,
	backgroundColor: 'rgba(0, 0, 0, 0.6)',

	selectors: {
		'&[data-state="open"]': {
			animation: `${fadeIn} 200ms ease-out`,
		},
		'&[data-state="closed"]': {
			animation: `${fadeOut} 200ms ease-in`,
		},
	},
});

const contentShow = keyframes({
	from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
	to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const contentHide = keyframes({
	from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
	to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
});

export const content = style({
	position: 'fixed',
	left: '50%',
	top: '50%',
	zIndex: 50,
	display: 'grid',
	width: '100%',
	maxWidth: '32rem',
	transform: 'translate(-50%, -50%)',
	gap: theme.spacing[4],
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	padding: theme.spacing[4],
	borderRadius: theme.borderRadius.md,
	boxShadow: theme.elevation[3],
	transitionDuration: '200ms',

	'@media': {
		'(min-width: 640px)': {
			borderRadius: theme.borderRadius.lg,
		},
	},

	selectors: {
		'&[data-state="open"]': {
			animation: `${contentShow} 200ms ease-out`,
		},
		'&[data-state="closed"]': {
			animation: `${contentHide} 200ms ease-in`,
		},
	},
});

export const closeButton = style({
	position: 'absolute',
	right: theme.spacing[2],
	top: theme.spacing[3],
	borderRadius: theme.borderRadius.md,
	opacity: 0.7,
	transition: 'opacity 150ms',
	color: theme.colors.primary,
	backgroundColor: theme.colors.background.paper,
	border: 'none',
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '24px',
	height: '24px',
	selectors: {
		'&:hover': {
			opacity: 1,
		},
		'&:focus': {
			outline: 'none',
		},
		'&:disabled': {
			pointerEvents: 'none',
		},
		'&[data-state="open"]': {
			backgroundColor: theme.colors.primary,
		},
	},
});

globalStyle(`${closeButton} svg`, {
	width: '24px',
	height: '24px',
});

export const closeSpan = style({
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

	textAlign: 'center',

	'@media': {
		'(min-width: 640px)': {
			textAlign: 'left',
		},
	},
});

export const hasDescription = style({
	gap: theme.spacing[2],
});

export const footer = style({
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: theme.spacing[2],

	'@media': {
		'(min-width: 640px)': {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			gap: theme.spacing[2],
		},
	},
});

export const title = style({
	fontSize: theme.fontSize.lg,
	fontWeight: theme.fontWeight.semibold,
	lineHeight: theme.lineHeight.none,
	letterSpacing: '-0.025em',
	paddingRight: theme.spacing[4],
});

export const description = style({
	fontSize: theme.fontSize.sm,
	color: theme.colors.text.hint,
});
