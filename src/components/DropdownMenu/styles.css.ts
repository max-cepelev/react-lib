import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

// Анимации
const fadeIn = keyframes({
	from: {
		opacity: 0,
		transform: 'scale(0.95)',
	},
	to: {
		opacity: 1,
		transform: 'scale(1)',
	},
});

const fadeOut = keyframes({
	from: {
		opacity: 1,
		transform: 'scale(1)',
	},
	to: {
		opacity: 0,
		transform: 'scale(0.95)',
	},
});

// Основные стили
export const subTrigger = style({
	display: 'flex',
	cursor: 'default',
	gap: theme.spacing[2],
	userSelect: 'none',
	alignItems: 'center',
	borderRadius: theme.borderRadius.md,
	padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	color: theme.colors.text.primary,
	outline: 'none',
	selectors: {
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
		},
		'&[data-state="open"]': {
			backgroundColor: theme.colors.background.elementHover,
		},
		'&.inset': {
			paddingLeft: theme.spacing[8],
		},
	},
});

globalStyle(`${subTrigger} svg`, {
	pointerEvents: 'none',
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
	marginLeft: 'auto',
});

export const icon = style({
	height: theme.spacing[4],
	width: theme.spacing[4],
});

export const subContent = style({
	zIndex: 50,
	minWidth: theme.spacing[20],
	overflow: 'hidden',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.foreground.primary,
	boxShadow: theme.elevation[3],
	padding: theme.spacing[1],
	selectors: {
		'&[data-state="open"]': {
			animation: `${fadeIn} 0.2s ease-out`,
		},
		'&[data-state="closed"]': {
			animation: `${fadeOut} 0.2s ease-out`,
		},
	},
});

export const content = style({
	zIndex: 50,
	minWidth: theme.spacing[20],
	overflow: 'hidden',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.foreground.primary,
	boxShadow: theme.elevation[3],
	padding: theme.spacing[1],
	selectors: {
		'&[data-state="open"]': {
			animation: `${fadeIn} 0.2s ease-out`,
		},
		'&[data-state="closed"]': {
			animation: `${fadeOut} 0.2s ease-out`,
		},
	},
});

export const item = style({
	position: 'relative',
	display: 'flex',
	cursor: 'default',
	userSelect: 'none',
	alignItems: 'center',
	gap: theme.spacing[2],
	color: theme.colors.text.primary,
	borderRadius: theme.borderRadius.md,
	padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	outline: 'none',
	transition: 'background-color 0.2s, color 0.2s',
	selectors: {
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.foreground.secondary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&.inset': {
			paddingLeft: theme.spacing[8],
		},
	},
});

globalStyle(`${item} svg`, {
	pointerEvents: 'none',
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

export const checkboxItem = style({
	position: 'relative',
	display: 'flex',
	cursor: 'default',
	userSelect: 'none',
	alignItems: 'center',
	borderRadius: theme.borderRadius.md,
	padding: `${theme.spacing[3]} ${theme.spacing[8]} ${theme.spacing[3]} ${theme.spacing[2]}`,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	outline: 'none',
	transition: 'background-color 0.2s, color 0.2s',

	selectors: {
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.foreground.secondary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

export const radioItem = style({
	position: 'relative',
	display: 'flex',
	cursor: 'default',
	userSelect: 'none',
	alignItems: 'center',
	borderRadius: theme.borderRadius.md,
	padding: `${theme.spacing[3]} ${theme.spacing[8]} ${theme.spacing[3]} ${theme.spacing[2]}`,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	outline: 'none',
	transition: 'background-color 0.2s, color 0.2s',

	selectors: {
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.foreground.secondary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

export const checkboxItemIndicator = style({
	position: 'absolute',
	left: theme.spacing[2],
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const radioItemIndicator = style({
	position: 'absolute',
	left: theme.spacing[2],
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const label = style({
	padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	fontWeight: theme.fontWeight.semibold,
	selectors: {
		'&.inset': {
			paddingLeft: theme.spacing[8],
		},
	},
});

export const separator = style({
	margin: `${theme.spacing[1]} 0`,
	height: '1px',
	backgroundColor: theme.colors.border,
});

export const shortcut = style({
	marginLeft: 'auto',
	fontSize: theme.fontSize.xs,
	letterSpacing: '0.05em',
	opacity: 0.6,
});
