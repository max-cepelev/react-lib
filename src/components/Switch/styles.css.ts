import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'center',
	flexShrink: 0,
	borderRadius: '9999px',
	border: '1px solid transparent',
	transition: 'all 0.2s ease',
	outline: 'none',
	cursor: 'pointer',
	selectors: {
		'&[data-size="sm"]': {
			height: '14px',
			width: '24px',
		},
		'&[data-size="default"]': {
			height: '18.4px',
			width: '32px',
		},
		'&[data-checked]': {
			backgroundColor: theme.colors.primary,
		},
		'&[data-unchecked]': {
			backgroundColor: theme.colors.border,
		},
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${theme.colors.background.paper}, 0 0 0 4px ${theme.colors.primary}`,
		},
		'&[data-disabled]': {
			cursor: 'not-allowed',
			opacity: 0.5,
		},
	},
});

export const thumb = style({
	display: 'block',
	borderRadius: '9999px',
	backgroundColor: theme.colors.background.paper,
	pointerEvents: 'none',
	transition: 'transform 0.2s ease',
});

globalStyle(`${root}[data-size="sm"] ${thumb}`, {
	height: '12px',
	width: '12px',
});

globalStyle(`${root}[data-size="default"] ${thumb}`, {
	height: '16px',
	width: '16px',
});

globalStyle(`${root}[data-size="sm"][data-unchecked] ${thumb}`, {
	transform: 'translateX(0)',
});

globalStyle(`${root}[data-size="sm"][data-checked] ${thumb}`, {
	transform: 'translateX(calc(100% - 2px))',
});

globalStyle(`${root}[data-size="default"][data-unchecked] ${thumb}`, {
	transform: 'translateX(0)',
});

globalStyle(`${root}[data-size="default"][data-checked] ${thumb}`, {
	transform: 'translateX(calc(100% - 2px))',
});
