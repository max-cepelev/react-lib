import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { negativeSpacing, spacing, theme } from '~/theme';

const zoomIn = keyframes({
	from: {
		opacity: 0,
		transform: 'scale(0.95)',
	},
	to: {
		opacity: 1,
		transform: 'scale(1)',
	},
});

const zoomOut = keyframes({
	from: {
		opacity: 1,
		transform: 'scale(1)',
	},
	to: {
		opacity: 0,
		transform: 'scale(0.95)',
	},
});

const slideFromTop = keyframes({
	from: {
		opacity: 0,
		transform: `translateY(${theme.spacing[2]}) scale(0.95)`,
	},
	to: {
		opacity: 1,
		transform: 'translateY(0) scale(1)',
	},
});

const slideFromBottom = keyframes({
	from: {
		opacity: 0,
		transform: `translateY(${negativeSpacing(2)}) scale(0.95)`,
	},
	to: {
		opacity: 1,
		transform: 'translateY(0) scale(1)',
	},
});

const slideFromLeft = keyframes({
	from: {
		opacity: 0,
		transform: `translateX(${theme.spacing[2]}) scale(0.95)`,
	},
	to: {
		opacity: 1,
		transform: 'translateX(0) scale(1)',
	},
});

const slideFromRight = keyframes({
	from: {
		opacity: 0,
		transform: `translateX(${negativeSpacing(2)}) scale(0.95)`,
	},
	to: {
		opacity: 1,
		transform: 'translateX(0) scale(1)',
	},
});

export const positioner = style({
	isolation: 'isolate',
	zIndex: 50,
	outline: 'none',
});

export const content = style({
	zIndex: 50,
	maxHeight: 'var(--available-height)',
	width: 'var(--anchor-width)',
	minWidth: `calc(${theme.spacing[20]} + ${theme.spacing[12]})`,
	overflowX: 'hidden',
	overflowY: 'auto',
	transformOrigin: 'var(--transform-origin)',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	boxShadow: theme.elevation[3],
	padding: theme.spacing[1],
	outline: 'none',
	animationDuration: '100ms',
	selectors: {
		'&[data-starting-style]': {
			animationName: zoomIn,
			animationTimingFunction: 'ease-out',
		},
		'&[data-ending-style]': {
			animationName: zoomOut,
			animationTimingFunction: 'ease-in',
		},
		'&[data-starting-style][data-side="bottom"]': {
			animationName: slideFromBottom,
		},
		'&[data-starting-style][data-side="top"]': {
			animationName: slideFromTop,
		},
		'&[data-starting-style][data-side="right"]': {
			animationName: slideFromRight,
		},
		'&[data-starting-style][data-side="left"]': {
			animationName: slideFromLeft,
		},
		'&[data-starting-style][data-side="inline-end"]': {
			animationName: slideFromRight,
		},
		'&[data-starting-style][data-side="inline-start"]': {
			animationName: slideFromLeft,
		},
		'&[data-closed]': {
			overflow: 'hidden',
		},
	},
});

export const subContent = style({
	width: 'auto',
	minWidth: `calc(${theme.spacing[20]} + ${theme.spacing[4]})`,
	boxShadow: theme.elevation[4],
});

export const label = style({
	padding: spacing(1, 2),
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.medium,
	lineHeight: theme.lineHeight.tight,
	selectors: {
		'&[data-inset]': {
			paddingLeft: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
		},
	},
});

const itemBase = style({
	position: 'relative',
	display: 'flex',
	cursor: 'default',
	userSelect: 'none',
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.md,
	padding: spacing(1, 2),
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	outline: 'none',
	selectors: {
		'&[data-highlighted]': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.foreground.secondary,
		},
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.foreground.secondary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-inset]': {
			paddingLeft: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
		},
		'&[data-variant="destructive"]': {
			color: theme.colors.error,
		},
		'&[data-variant="destructive"][data-highlighted]': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.error,
		},
	},
});

export const item = style([itemBase]);

export const subTrigger = style([
	itemBase,
	{
		selectors: {
			'&[data-popup-open]': {
				backgroundColor: theme.colors.background.elementHover,
				color: theme.colors.foreground.secondary,
			},
		},
	},
]);

export const checkboxItem = style([
	itemBase,
	{
		padding: spacing(1, 8, 1, 2),
	},
]);

export const radioItem = style([
	itemBase,
	{
		padding: spacing(1, 8, 1, 2),
	},
]);

export const itemIndicator = style({
	position: 'absolute',
	right: theme.spacing[2],
	display: 'flex',
	pointerEvents: 'none',
	alignItems: 'center',
	justifyContent: 'center',
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const subTriggerIcon = style({
	marginLeft: 'auto',
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

export const icon = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

export const separator = style({
	margin: `${theme.spacing[1]} ${negativeSpacing(1)}`,
	height: '1px',
	backgroundColor: theme.colors.border,
});

export const shortcut = style({
	marginLeft: 'auto',
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.xs,
	letterSpacing: '0.05em',
});

globalStyle(`${itemBase} svg`, {
	pointerEvents: 'none',
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

globalStyle(`${itemBase}[data-variant="destructive"] svg`, {
	color: theme.colors.error,
});

globalStyle(`${itemBase}[data-highlighted] ${shortcut}`, {
	color: theme.colors.foreground.secondary,
});
