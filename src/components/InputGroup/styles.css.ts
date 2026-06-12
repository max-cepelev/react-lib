import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	position: 'relative',
	display: 'flex',
	minHeight: theme.spacing[8],
	width: '100%',
	minWidth: 0,
	alignItems: 'center',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
	outline: 'none',
	transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
	selectors: {
		'&:focus-within': {
			borderColor: theme.colors.primary,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
		},
		'&:has([disabled])': {
			opacity: 0.5,
			backgroundColor: theme.colors.background.element,
		},
		'&:has([aria-invalid="true"])': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.error} 20%, transparent)`,
		},
		'&:has([data-align="block-start"])': {
			height: 'auto',
			flexDirection: 'column',
			alignItems: 'stretch',
		},
		'&:has([data-align="block-end"])': {
			height: 'auto',
			flexDirection: 'column',
			alignItems: 'stretch',
		},
		'&:has(textarea)': {
			height: 'auto',
		},
	},
});

export const addon = style({
	display: 'flex',
	height: 'auto',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[2],
	color: theme.colors.text.hint,
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	userSelect: 'none',
});

globalStyle(`${addon} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
	flexShrink: 0,
	color: 'currentColor',
});

export const addonAlign = styleVariants({
	'inline-start': {
		order: -1,
		paddingLeft: theme.spacing[2],
	},
	'inline-end': {
		order: 1,
		paddingRight: theme.spacing[2],
	},
	'block-start': {
		order: -1,
		width: '100%',
		justifyContent: 'flex-start',
		padding: `${theme.spacing[2]} ${theme.spacing[3]} 0`,
	},
	'block-end': {
		order: 1,
		width: '100%',
		justifyContent: 'flex-start',
		padding: `0 ${theme.spacing[3]} ${theme.spacing[2]}`,
	},
});

export const button = style({
	boxShadow: 'none',
});

export const buttonSize = styleVariants({
	xs: {
		height: theme.spacing[6],
		gap: theme.spacing[1],
		padding: `0 ${theme.spacing[2]}`,
		fontSize: theme.fontSize.xs,
	},
	sm: {
		height: 28,
		padding: `0 ${theme.spacing[2]}`,
		fontSize: theme.fontSize.sm,
	},
	'icon-xs': {
		width: theme.spacing[6],
		height: theme.spacing[6],
		padding: 0,
	},
	'icon-sm': {
		width: theme.spacing[8],
		height: theme.spacing[8],
		padding: 0,
	},
});

export const text = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	color: theme.colors.text.hint,
	fontSize: theme.fontSize.sm,
});

export const control = style({
	minWidth: 0,
	flex: 1,
	border: 0,
	backgroundColor: 'transparent',
	color: theme.colors.text.primary,
	fontFamily: 'inherit',
	fontSize: theme.fontSize.sm,
	outline: 'none',
	boxShadow: 'none',

	selectors: {
		'&::placeholder': {
			color: theme.colors.text.hint,
		},
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: 1,
		},
	},
});

export const input = style({
	height: 'calc(100% - 2px)',
	paddingInline: theme.spacing[2],
});

export const textarea = style({
	minHeight: theme.spacing[16],
	padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	resize: 'none',
});

globalStyle(`${button} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
});

globalStyle(`${text} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
});
