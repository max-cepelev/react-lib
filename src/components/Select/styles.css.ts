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
