import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

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
		border: `1px solid ${theme.colors.border}`,
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
			borderColor: `color-mix(in oklch, ${theme.colors.border} 80%, ${theme.colors.primary} 100%)`,
		},
	},
});

export const containerFocusWithin = style({
	selectors: {
		'&:focus-within': {
			borderColor: `color-mix(in oklch, ${theme.colors.primary} 80%, transparent)`,
		},
	},
});

export const disabledClass = style({
	opacity: 0.5,
	borderColor: theme.colors.border,
});

export const errorClass = style({
	borderColor: theme.colors.error,
	':focus-within': {
		borderColor: `color-mix(in oklch, ${theme.colors.error} 80%, transparent)`,
	},
	':hover': {
		borderColor: theme.colors.error,
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
		height: theme.spacing[8],
		fontSize: theme.fontSize.sm, // 12px
		padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	},
	md: {
		height: theme.spacing[10],
		fontSize: theme.fontSize.base,
		padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	},
	lg: {
		height: theme.spacing[12],
		fontSize: theme.fontSize.lg, // 16px
		padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
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
