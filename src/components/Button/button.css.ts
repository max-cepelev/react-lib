import {
	type ComplexStyleRule,
	keyframes,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { ButtonSize, ButtonVariant } from './types';

export const buttonBase = style({
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	whiteSpace: 'nowrap',
	borderRadius: theme.borderRadius.md,
	borderWidth: 0,
	fontSize: 'inherit',
	fontFamily: 'inherit',
	fontWeight: theme.fontWeight.medium,
	transition: 'background-color 0.2s',
	cursor: 'pointer',
	lineHeight: '100%',
	position: 'relative',
	selectors: {
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.6,
		},
		'&:focus-visible': {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			boxShadow: theme.elevation[1],
		},
	},
});

const spin = keyframes({
	'0%': {
		transform: 'rotate(0deg)',
	},
	'100%': {
		transform: 'rotate(360deg)',
	},
});

export const loading = style({
	pointerEvents: 'none',
	opacity: 0.6,
	'::after': {
		content: '',
		position: 'absolute',
		display: 'inline-block',
		boxSizing: 'border-box',
		width: '18px',
		height: '18px',
		borderRadius: '50%',
		borderWidth: '2px',
		borderStyle: 'solid',
		borderBottomColor: 'transparent',
		animation: `${spin} 1s linear infinite`,
		zIndex: 2,
	},
	':before': {
		content: '',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		borderRadius: 'inherit',
		backgroundColor: 'inherit',
		zIndex: 1,
	},
});

export const fullWidthStyle = style({
	width: '100%',
});

export const buttonVariants = styleVariants<
	Record<ButtonVariant, ComplexStyleRule>
>({
	default: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.foreground.primary,
		':hover': {
			backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 85%, transparent)`,
		},
	},
	destructive: {
		backgroundColor: theme.colors.error,
		color: theme.colors.foreground.primary,
		':hover': {
			backgroundColor: `color-mix(in oklch, ${theme.colors.error} 85%, transparent)`,
		},
	},
	outline: {
		border: `1px solid ${theme.colors.border}`,
		backgroundColor: theme.colors.background.paper,
		color: theme.colors.text.primary,
		':hover': {
			backgroundColor: theme.colors.background.elementHover,
		},
	},
	ghost: {
		backgroundColor: 'transparent',
		color: theme.colors.text.primary,
		selectors: {
			[`&${loading}`]: {
				backgroundColor: theme.colors.background.elementHover,
			},
		},
		':hover': {
			backgroundColor: theme.colors.background.elementHover,
		},
	},
	link: {
		backgroundColor: 'transparent',
		color: theme.colors.primary,
		textUnderlineOffset: '4px',
		':hover': {
			textDecorationLine: 'underline',
		},
	},
});

export const buttonSizes = styleVariants<Record<ButtonSize, ComplexStyleRule>>({
	small: {
		height: 28,
		padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
		borderRadius: theme.borderRadius.sm,
		fontSize: theme.fontSize.xs,
	},
	medium: {
		height: theme.spacing[8],
		padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
		fontSize: theme.fontSize.sm,
	},
	large: {
		height: 36,
		padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
		fontSize: theme.fontSize.base,
	},
	icon: {
		height: theme.spacing[8],
		width: theme.spacing[8],
	},
	iconSmall: {
		height: 28,
		width: 28,
	},
});

export const startAdornment = style({
	marginRight: theme.spacing[2],
});

export const endAdornment = style({
	marginLeft: theme.spacing[2],
});
