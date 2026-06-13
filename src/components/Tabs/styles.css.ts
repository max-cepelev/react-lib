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
	lineHeight: theme.lineHeight.none,

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
		'&[data-active]': {
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
			boxShadow: theme.elevation[3],
		},
	},
});

export const sizes = styleVariants({
	small: {
		height: 28,
		fontSize: theme.fontSize.sm,
		padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	},
	medium: {
		height: theme.spacing[8],
		fontSize: theme.fontSize.base,
		padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	},
	large: {
		height: 36,
		fontSize: theme.fontSize.base,
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
