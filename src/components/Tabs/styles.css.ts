import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const listClass = style({
	display: 'inline-flex',
	height: '36px',
	alignItems: 'center',
	justifyContent: 'center',
	columnGap: theme.spacing[1],
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
	padding: theme.spacing[1],
	color: theme.colors.text.disabled,
});

export const triggerClass = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	whiteSpace: 'nowrap',
	borderRadius: theme.borderRadius.md,
	fontWeight: theme.fontWeight.medium,
	transition: 'all 0.2s ease',
	color: 'inherit',
	border: 'none',
	backgroundColor: 'transparent',
	cursor: 'pointer',

	selectors: {
		'&:focus-visible': {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			boxShadow: theme.elevation[1],
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-state="active"]': {
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
			boxShadow: theme.elevation[3],
		},
	},
});

export const sizes = styleVariants({
	sm: {
		height: theme.spacing[8],
		fontSize: theme.fontSize.sm,
		padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	},
	md: {
		height: theme.spacing[10],
		fontSize: theme.fontSize.base,
		padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	},
	lg: {
		height: theme.spacing[12],
		fontSize: theme.fontSize.lg,
		padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
	},
});

export const contentClass = style({
	marginTop: theme.spacing[2], // 0.5rem

	selectors: {
		'&:focus-visible': {
			outline: 'none',
			boxShadow: theme.elevation[1],
			outlineOffset: '2px',
		},
	},
});
