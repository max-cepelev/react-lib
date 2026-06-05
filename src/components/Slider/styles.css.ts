import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	backgroundColor: 'transparent',
	selectors: {
		'&[data-orientation="horizontal"]': {
			width: '100%',
		},
		'&[data-orientation="vertical"]': {
			height: '100%',
		},
	},
});

export const control = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	touchAction: 'none',
	userSelect: 'none',
	alignItems: 'center',
	selectors: {
		'&[data-disabled]': {
			opacity: 0.5,
		},
		'&[data-orientation="vertical"]': {
			height: '100%',
			minHeight: theme.spacing[20],
			width: 'auto',
			flexDirection: 'column',
		},
	},
});

export const track = style({
	position: 'relative',
	flexGrow: 1,
	overflow: 'hidden',
	borderRadius: '9999px',
	backgroundColor: theme.colors.background.element,
	cursor: 'pointer',
	userSelect: 'none',
	selectors: {
		'&[data-orientation="horizontal"]': {
			height: 2,
			width: '100%',
		},
		'&[data-orientation="vertical"]': {
			height: '100%',
			width: 2,
		},
	},
});

export const range = style({
	backgroundColor: theme.colors.primary,
	userSelect: 'none',
	selectors: {
		'&[data-orientation="horizontal"]': {
			height: '100%',
		},
		'&[data-orientation="vertical"]': {
			width: '100%',
		},
	},
});

export const thumb = style({
	position: 'relative',
	display: 'block',
	height: theme.spacing[3],
	width: theme.spacing[3],
	flexShrink: 0,
	borderRadius: '9999px',
	border: `1px solid ${theme.colors.primary}`,
	backgroundColor: theme.colors.background.paper,
	transition: 'color 0.2s, box-shadow 0.2s',
	cursor: 'grab',
	userSelect: 'none',

	'::after': {
		content: '',
		position: 'absolute',
		inset: `calc(-1 * ${theme.spacing[2]})`,
	},

	selectors: {
		'&:hover': {
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
		},
		'&:focus-visible': {
			outline: 'none',
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 30%, transparent)`,
		},
		'&:active': {
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 30%, transparent)`,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});
