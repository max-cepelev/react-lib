import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const list = style({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	gap: theme.spacing[2],
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	overflowWrap: 'break-word',
});

export const item = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: theme.spacing[1],
});

export const link = style({
	color: 'inherit',
	textDecoration: 'none',
	transition: 'color 0.2s',

	selectors: {
		'&:hover': {
			color: theme.colors.text.primary,
		},
		'&:focus-visible': {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			boxShadow: theme.elevation[1],
		},
	},
});

export const page = style({
	color: theme.colors.text.primary,
	fontWeight: theme.fontWeight.normal,
});

export const separator = style({
	display: 'inline-flex',
	alignItems: 'center',
	color: theme.colors.text.secondary,
});

globalStyle(`${separator} svg`, {
	width: theme.spacing[3],
	height: theme.spacing[3],
});

globalStyle(`[dir="rtl"] ${separator} svg`, {
	transform: 'scaleX(-1)',
});

export const ellipsis = style({
	display: 'flex',
	width: theme.spacing[5],
	height: theme.spacing[5],
	alignItems: 'center',
	justifyContent: 'center',
	color: theme.colors.text.secondary,
});

globalStyle(`${ellipsis} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const visuallyHidden = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	border: 0,
});
