import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	position: 'relative',
	display: 'flex',
	width: theme.spacing[8],
	height: theme.spacing[8],
	flexShrink: 0,
	userSelect: 'none',
	borderRadius: '9999px',
	selectors: {
		'&::after': {
			content: '',
			position: 'absolute',
			inset: 0,
			borderRadius: 'inherit',
			border: `1px solid ${theme.colors.border}`,
			mixBlendMode: 'darken',
		},
		'&[data-size="small"]': {
			width: theme.spacing[6],
			height: theme.spacing[6],
		},
		'&[data-size="large"]': {
			width: theme.spacing[10],
			height: theme.spacing[10],
		},
	},
});

export const image = style({
	aspectRatio: '1',
	width: '100%',
	height: '100%',
	borderRadius: 'inherit',
	objectFit: 'cover',
});

export const fallback = style({
	display: 'flex',
	width: '100%',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 'inherit',
	backgroundColor: theme.colors.background.element,
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
});

globalStyle(`${root}[data-size="small"] ${fallback}`, {
	fontSize: theme.fontSize.xs,
});

export const badge = style({
	position: 'absolute',
	right: 0,
	bottom: 0,
	zIndex: 10,
	display: 'inline-flex',
	width: '0.625rem',
	height: '0.625rem',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '9999px',
	backgroundColor: theme.colors.primary,
	color: theme.colors.foreground.primary,
	boxShadow: `0 0 0 2px ${theme.colors.background.paper}`,
	backgroundBlendMode: 'color',
	userSelect: 'none',
});

globalStyle(`${root}[data-size="small"] ${badge}`, {
	width: theme.spacing[2],
	height: theme.spacing[2],
});

globalStyle(`${root}[data-size="large"] ${badge}`, {
	width: theme.spacing[3],
	height: theme.spacing[3],
});

globalStyle(`${badge} svg`, {
	width: theme.spacing[2],
	height: theme.spacing[2],
});

globalStyle(`${root}[data-size="small"] ${badge} svg`, {
	display: 'none',
});

export const group = style({
	display: 'flex',
});

globalStyle(`${group} [data-slot="avatar"]`, {
	boxShadow: `0 0 0 2px ${theme.colors.background.paper}`,
});

globalStyle(`${group} [data-slot="avatar"]:not(:first-child)`, {
	marginLeft: `calc(-1 * ${theme.spacing[2]})`,
});

export const groupCount = style({
	position: 'relative',
	display: 'flex',
	width: theme.spacing[8],
	height: theme.spacing[8],
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '9999px',
	backgroundColor: theme.colors.background.element,
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	boxShadow: `0 0 0 2px ${theme.colors.background.paper}`,
});

globalStyle(`${group}:has([data-size="small"]) ${groupCount}`, {
	width: theme.spacing[6],
	height: theme.spacing[6],
});

globalStyle(`${group}:has([data-size="large"]) ${groupCount}`, {
	width: theme.spacing[10],
	height: theme.spacing[10],
});

globalStyle(`${groupCount} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

globalStyle(`${group}:has([data-size="small"]) ${groupCount} svg`, {
	width: theme.spacing[3],
	height: theme.spacing[3],
});

globalStyle(`${group}:has([data-size="large"]) ${groupCount} svg`, {
	width: theme.spacing[5],
	height: theme.spacing[5],
});
