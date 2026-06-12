import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const textarea = style({
	display: 'flex',
	fieldSizing: 'content',
	minHeight: theme.spacing[16],
	width: '100%',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
	padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	fontFamily: 'inherit',
	fontSize: theme.fontSize.base,
	lineHeight: theme.lineHeight.normal,
	color: theme.colors.text.primary,
	transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
	outline: 'none',
	resize: 'vertical',

	selectors: {
		'&::placeholder': {
			color: theme.colors.text.hint,
		},
		'&:focus-visible': {
			borderColor: theme.colors.primary,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
		},
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: 0.5,
			backgroundColor: theme.colors.background.element,
		},
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.error} 20%, transparent)`,
		},
	},
});
