import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	height: '1rem',
	width: '1rem',
	flexShrink: 0,
	borderRadius: 4,
	border: `1px solid ${theme.colors.primary}`,
	backgroundColor: theme.colors.background.paper,
	position: 'relative',
	transition: 'all 0.2s ease',
	cursor: 'pointer',
	display: 'block',
	selectors: {
		'&:focus-visible': {
			outline: 'none',
			boxShadow: `0 0 0 2px ${theme.colors.background}, 0 0 0 4px ${theme.colors.primary}`,
		},
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: 0.5,
		},
		'&[data-checked]': {
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
		},
	},
});

export const indicator = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const checkIcon = style({
	height: '100%',
	width: '100%',
	stroke: theme.colors.foreground.primary,
	strokeWidth: '3px',
	display: 'none',
});

export const minusIcon = style({
	height: '100%',
	width: '100%',
	stroke: theme.colors.primary,
	strokeWidth: '3px',
	display: 'none',
});

globalStyle(`${indicator}[data-checked] ${checkIcon}`, {
	display: 'block',
});

globalStyle(`${indicator}[data-indeterminate] ${minusIcon}`, {
	display: 'block',
});
