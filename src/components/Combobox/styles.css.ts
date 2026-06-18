import {
	globalStyle,
	keyframes,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';

const fadeIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.95)' },
	to: { opacity: 1, transform: 'scale(1)' },
});

const fadeOut = keyframes({
	from: { opacity: 1, transform: 'scale(1)' },
	to: { opacity: 0, transform: 'scale(0.95)' },
});

export const trigger = style({
	color: theme.colors.text.secondary,

	selectors: {
		'&[data-pressed]': {
			backgroundColor: 'transparent',
		},
	},
});

export const triggerIcon = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
	color: theme.colors.text.secondary,
});

export const clearIcon = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
});

export const controlButton = style({
	display: 'inline-flex',
	width: theme.spacing[6],
	height: theme.spacing[6],
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
	border: 0,
	borderRadius: theme.borderRadius.sm,
	backgroundColor: 'transparent',
	color: theme.colors.text.secondary,
	padding: 0,
	fontFamily: 'inherit',
	cursor: 'pointer',
	transition: 'background-color 0.2s ease, opacity 0.2s ease',

	selectors: {
		'&:hover': {
			backgroundColor: theme.colors.background.elementHover,
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&:focus-visible': {
			outline: 'none',
			boxShadow: `0 0 0 2px color-mix(in oklch, ${theme.colors.primary} 30%, transparent)`,
		},
	},
});

export const inputGroup = style({
	width: 'auto',

	selectors: {
		'&[data-size="small"]': {
			height: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
			minHeight: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
		},
		'&[data-size="medium"]': {
			height: theme.spacing[8],
			minHeight: theme.spacing[8],
		},
		'&[data-size="large"]': {
			height: `calc(${theme.spacing[8]} + ${theme.spacing[1]})`,
			minHeight: `calc(${theme.spacing[8]} + ${theme.spacing[1]})`,
		},
	},
});

export const inputTrigger = style({});

globalStyle(`${inputGroup}:has([data-slot="combobox-clear"]) ${trigger}`, {
	display: 'none',
});

export const positioner = style({
	isolation: 'isolate',
	zIndex: 5000,
});

export const content = style({
	position: 'relative',
	zIndex: 5000,
	boxSizing: 'border-box',
	width: 'var(--anchor-width)',
	minWidth: 'var(--anchor-width)',
	maxWidth: 'var(--available-width)',
	maxHeight: 'var(--available-height)',
	overflow: 'hidden',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	boxShadow: theme.elevation[2],
	transformOrigin: 'var(--transform-origin)',

	selectors: {
		'&[data-open]': {
			animation: `${fadeIn} 120ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${fadeOut} 100ms ease-in`,
		},
		'&[data-chips="true"]': {
			minWidth: 'var(--anchor-width)',
		},
	},
});

export const list = style({
	maxHeight: `min(calc(${theme.spacing[20]} * 3), calc(var(--available-height) - ${theme.spacing[8]}))`,
	overflowY: 'auto',
	overscrollBehavior: 'contain',
	padding: theme.spacing[1],
	scrollPaddingBlock: theme.spacing[1],

	selectors: {
		'&[data-empty]': {
			padding: 0,
		},
	},
});

export const item = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	cursor: 'default',
	userSelect: 'none',
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.sm,
	padding: `${theme.spacing[1]} ${theme.spacing[8]} ${theme.spacing[1]} ${theme.spacing[2]}`,
	fontSize: theme.fontSize.sm,
	outline: 'none',

	selectors: {
		'&[data-highlighted]': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.text.primary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

export const itemIndicator = style({
	position: 'absolute',
	right: theme.spacing[2],
	display: 'flex',
	width: theme.spacing[4],
	height: theme.spacing[4],
	alignItems: 'center',
	justifyContent: 'center',
	pointerEvents: 'none',
});

export const groupLabel = style({
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.xs,
});

export const empty = style({
	display: 'none',
	width: '100%',
	justifyContent: 'center',
	padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	textAlign: 'center',
});

globalStyle(`${content}[data-empty] ${empty}`, {
	display: 'flex',
});

export const separator = style({
	height: 1,
	margin: `${theme.spacing[1]} 0`,
	backgroundColor: theme.colors.border,
});

export const chips = style({
	display: 'flex',
	minHeight: theme.spacing[8],
	flexWrap: 'wrap',
	alignItems: 'center',
	gap: theme.spacing[1],
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundClip: 'padding-box',
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	fontSize: theme.fontSize.sm,
	transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

	selectors: {
		'&:focus-within': {
			borderColor: theme.colors.primary,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
		},
		'&:has([aria-invalid="true"])': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.error} 20%, transparent)`,
		},
		'&[data-size="small"]': {
			minHeight: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
			paddingBlock: 0,
		},
		'&[data-size="medium"]': {
			minHeight: theme.spacing[8],
			paddingBlock: theme.spacing[1],
		},
		'&[data-size="large"]': {
			minHeight: `calc(${theme.spacing[8]} + ${theme.spacing[1]})`,
			paddingBlock: theme.spacing[1],
		},
	},
});

export const chip = style({
	display: 'flex',
	width: 'fit-content',
	height: theme.spacing[5],
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[1],
	borderRadius: theme.borderRadius.sm,
	backgroundColor: theme.colors.background.element,
	padding: `0 ${theme.spacing[2]}`,
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.medium,
	whiteSpace: 'nowrap',

	selectors: {
		'&:has([disabled])': {
			pointerEvents: 'none',
			cursor: 'not-allowed',
			opacity: 0.5,
		},
	},
});

export const chipWithRemove = style({
	paddingRight: 0,
});

export const chipRemove = style({
	marginLeft: `-${theme.spacing[1]}`,
	opacity: 0.5,

	selectors: {
		'&:hover': {
			opacity: 1,
		},
	},
});

export const chipRemoveButton = style({
	display: 'inline-flex',
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
	border: 0,
	borderRadius: theme.borderRadius.sm,
	backgroundColor: 'transparent',
	color: 'inherit',
	fontFamily: 'inherit',
	cursor: 'pointer',
});

export const chipsInput = style({
	minWidth: theme.spacing[16],
	flex: 1,
	border: 0,
	backgroundColor: 'transparent',
	color: theme.colors.text.primary,
	fontFamily: 'inherit',
	fontSize: theme.fontSize.sm,
	outline: 'none',
});

export const chipRemoveSize = styleVariants({
	iconExtraSmall: {
		width: theme.spacing[5],
		height: theme.spacing[5],
		padding: 0,
	},
});

globalStyle(`${item} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
	flexShrink: 0,
});

globalStyle(`${chipRemove} svg`, {
	width: theme.spacing[3],
	height: theme.spacing[3],
	pointerEvents: 'none',
});
