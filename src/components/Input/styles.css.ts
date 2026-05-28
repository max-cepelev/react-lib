import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

export const container = style(
	{
		display: 'flex',
		alignItems: 'center',
		transition: 'border-color 0.2s ease, background-color 0.2s ease',
		':focus-within': {
			borderColor: `color-mix(in oklch, ${theme.colors.primary} 80%, transparent)`,
		},
		':hover': {
			backgroundColor: `color-mix(in oklch, ${theme.colors.background.elementHover} 40%, transparent)`,
		},
	},
	'Input',
);

export const variants = styleVariants({
	outlined: {
		outline: `1px solid ${theme.colors.border}`,
		borderRadius: theme.borderRadius.md,
	},
	standard: {
		borderBottom: `1px solid ${theme.colors.border}`,
		borderRadius: 0,
	},
});

export const fullWidthClass = style({
	width: '100%',
});

export const containerHover = style({
	selectors: {
		'&:hover': {
			outlineColor: `color-mix(in oklch, ${theme.colors.border} 80%, ${theme.colors.primary} 100%)`,
			borderColor: `color-mix(in oklch, ${theme.colors.border} 80%, ${theme.colors.primary} 100%)`,
		},
	},
});

export const containerFocusWithin = style({
	selectors: {
		'&:focus-within': {
			outlineColor: `color-mix(in oklch, ${theme.colors.primary} 80%, transparent)`,
		},
	},
});

export const disabledClass = style({
	opacity: 0.5,
	borderColor: theme.colors.border,
});

export const errorClass = style({
	outlineColor: theme.colors.error,
	':focus-within': {
		outlineColor: `color-mix(in oklch, ${theme.colors.error} 80%, transparent)`,
		borderColor: theme.colors.error,
	},
	':hover': {
		outlineColor: theme.colors.error,
	},
});

// Input styles
export const input = style({
	flex: 1,
	border: 'none',
	outline: 'none',
	fontSize: 'inherit',
	fontFamily: 'inherit',
	background: 'transparent',
	selectors: {
		'&:focus': {
			outline: 'none',
		},
		'&::placeholder': {
			color: theme.colors.text.hint,
		},
		'&:disabled': {
			opacity: 0.5,
			cursor: 'not-allowed',
		},
	},
});

// Size variants
export const sizes = styleVariants({
	sm: {
		height: '28px',
		padding: `0.125rem ${theme.spacing[2]}`,
		fontSize: theme.fontSize.sm,
	},
	md: {
		height: '32px',
		padding: spacing(1, 3),
		fontSize: theme.fontSize.base,
	},
	lg: {
		height: '36px',
		padding: spacing(2, 3),
		fontSize: theme.fontSize.base,
	},
});

export const adornment = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: `0 ${theme.spacing[2]}`, // 0 8px
});

export const withStartAdornment = style({
	paddingLeft: 0,
});

export const withEndAdornment = style({
	paddingRight: 0,
});
