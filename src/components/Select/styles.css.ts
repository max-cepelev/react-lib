import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { negativeSpacing, theme } from '~/theme';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

export const trigger = style({
	display: 'flex',
	gap: theme.spacing[1],
	width: '100%',
	alignItems: 'center',
	justifyContent: 'space-between',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
	transition: 'border-color 0.2s, box-shadow 0.2s',
	color: theme.colors.text.primary,
	cursor: 'pointer',

	selectors: {
		'&:focus': {
			outline: 'none',
			borderColor: theme.colors.primary,
		},
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: 0.5,
		},
		'&[aria-disabled="true"]': {
			cursor: 'not-allowed',
			opacity: 0.5,
		},
		'&[data-size="small"]': {
			height: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
			fontSize: theme.fontSize.sm,
			padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
		},
		'&[data-size="medium"]': {
			height: theme.spacing[8],
			fontSize: theme.fontSize.sm,
			padding: `${theme.spacing[2]} ${theme.spacing[2]}`,
		},
		'&[data-size="large"]': {
			height: `calc(${theme.spacing[8]} + ${theme.spacing[1]})`,
			fontSize: theme.fontSize.sm,
			padding: `${theme.spacing[2]} ${theme.spacing[2]}`,
		},
	},
});

globalStyle(`${trigger} span`, {
	textWrap: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
});

export const value = style({
	display: 'flex',
	minWidth: 0,
	flex: 1,
	alignItems: 'center',
	overflow: 'hidden',
});

export const chipsValue = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	minWidth: 0,
	alignItems: 'center',
	gap: theme.spacing[1],
	overflow: 'hidden',
});

export const chipsMeasure = style({
	position: 'absolute',
	left: 0,
	top: 0,
	display: 'flex',
	gap: theme.spacing[1],
	visibility: 'hidden',
	pointerEvents: 'none',
	whiteSpace: 'nowrap',
});

export const chip = style({
	display: 'inline-flex',
	width: 'fit-content',
	height: theme.spacing[5],
	flexShrink: 0,
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
});

export const chipLabel = style({
	minWidth: 0,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

export const chipRemove = style({
	display: 'inline-flex',
	width: theme.spacing[5],
	height: theme.spacing[5],
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
	marginRight: `-${theme.spacing[2]}`,
	border: 0,
	borderRadius: theme.borderRadius.sm,
	backgroundColor: 'transparent',
	color: 'inherit',
	cursor: 'pointer',
	opacity: 0.5,
	padding: 0,

	selectors: {
		'&:hover': {
			opacity: 1,
		},
		'&:disabled': {
			cursor: 'not-allowed',
		},
	},
});

globalStyle(`${chipRemove} svg`, {
	width: theme.spacing[3],
	height: theme.spacing[3],
	pointerEvents: 'none',
});

export const scrollButton = style({
	display: 'flex',
	cursor: 'default',
	alignItems: 'center',
	justifyContent: 'center',
	padding: `${theme.spacing[1]} 0`,
});

export const positioner = style({
	isolation: 'isolate',
	zIndex: 5000,
});

export const content = style({
	position: 'relative',
	zIndex: 5000,
	maxHeight: 'var(--available-height, 24rem)',
	minWidth: '8rem',
	overflow: 'hidden',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

	selectors: {
		'&[data-open]': {
			animation: `${fadeIn} 150ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${fadeOut} 150ms ease-in`,
		},
		'&[data-side="bottom"]': {
			transform: 'translateY(4px)',
		},
		'&[data-side="top"]': {
			transform: 'translateY(-4px)',
		},
		'&[data-side="left"]': {
			transform: 'translateX(-4px)',
		},
		'&[data-side="right"]': {
			transform: 'translateX(4px)',
		},
	},
});

export const viewport = style({
	padding: theme.spacing[1],
	width: '100%',
	minWidth: 'var(--anchor-width, 100%)',
});

export const label = style({
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.semibold,
});

export const item = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	cursor: 'default',
	userSelect: 'none',
	alignItems: 'center',
	borderRadius: theme.borderRadius.md,
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

export const itemIndicatorWrapper = style({
	position: 'absolute',
	right: theme.spacing[2],
	display: 'flex',
	height: '0.875rem',
	width: '0.875rem',
	alignItems: 'center',
	justifyContent: 'center',
});

export const separator = style({
	margin: `${theme.spacing[1]} ${negativeSpacing(1)}`,
	height: '1px',
	backgroundColor: theme.colors.background.element,
});

export const icon = style({
	height: '1rem',
	width: '1rem',
});

export const chevron = style({
	height: '1rem',
	width: '1rem',
	opacity: 0.5,
});
