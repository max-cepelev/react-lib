import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	display: 'flex',
	gap: theme.spacing[2],

	selectors: {
		'&[data-orientation="horizontal"]': {
			flexDirection: 'column',
		},
		'&[data-orientation="vertical"]': {
			flexDirection: 'row',
			alignItems: 'flex-start',
		},
	},
});

export const list = style({
	display: 'inline-flex',
	width: 'fit-content',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.borderRadius.md,
	padding: theme.spacing[1],
	color: theme.colors.text.secondary,

	selectors: {
		'&[data-variant="default"]': {
			backgroundColor: theme.colors.background.element,
		},
		'&[data-variant="line"]': {
			gap: theme.spacing[1],
			borderRadius: 0,
			backgroundColor: 'transparent',
		},
		'&[data-orientation="horizontal"]': {
			height: theme.spacing[8],
			gap: theme.spacing[1],
		},
		'&[data-orientation="vertical"]': {
			height: 'fit-content',
			flexDirection: 'column',
		},
	},
});

export const trigger = style({
	position: 'relative',
	display: 'inline-flex',
	height: '100%',
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[2],
	border: '1px solid transparent',
	borderRadius: theme.borderRadius.sm,
	backgroundColor: 'transparent',
	padding: `0 ${theme.spacing[1]}`,
	opacity: 0.8,
	fontFamily: 'inherit',
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	lineHeight: theme.lineHeight.tight,
	whiteSpace: 'nowrap',
	cursor: 'pointer',
	transition:
		'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',

	'::after': {
		position: 'absolute',
		content: '',
		backgroundColor: theme.colors.primary,
		opacity: 0,
		transition: 'opacity 0.2s ease',
	},

	selectors: {
		'&:hover': {
			color: theme.colors.text.primary,
		},
		'&:focus-visible': {
			borderColor: theme.colors.primary,
			outline: 'none',
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[aria-disabled="true"]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-active]': {
			backgroundColor: theme.colors.background.paper,
			color: theme.colors.text.primary,
			boxShadow: theme.elevation[1],
			opacity: 1,
		},
		'&[data-orientation="vertical"]': {
			width: '100%',
			minHeight: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
			justifyContent: 'flex-start',
		},
		'&[data-orientation="horizontal"]::after': {
			right: 0,
			bottom: `calc(-1 * ${theme.spacing[1]})`,
			left: 0,
			height: '2px',
		},
		'&[data-orientation="vertical"]::after': {
			top: 0,
			right: `calc(-1 * ${theme.spacing[1]})`,
			bottom: 0,
			width: '2px',
		},
	},
});

globalStyle(`${list}[data-variant="line"] ${trigger}[data-active]`, {
	borderColor: 'transparent',
	backgroundColor: 'transparent',
	boxShadow: 'none',
});

globalStyle(`${list}[data-variant="line"] ${trigger}[data-active]::after`, {
	opacity: 1,
});

globalStyle(`${trigger} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
	pointerEvents: 'none',
});

export const content = style({
	flex: 1,
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.sm,
	outline: 'none',
});
