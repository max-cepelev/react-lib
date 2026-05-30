import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const containerClass = style({
	fontFamily: 'inherit',
	fontSize: 'inherit',
	lineHeight: 'inherit',
});

export const buttonsClass = style({
	display: 'flex',
});

export const buttonClass = style({
	borderRadius: 0,
	borderRight: 'none',
	':first-of-type': {
		borderTopLeftRadius: theme.borderRadius.md,
		borderBottomLeftRadius: theme.borderRadius.md,
	},
	':last-of-type': {
		borderTopRightRadius: theme.borderRadius.md,
		borderBottomRightRadius: theme.borderRadius.md,
		borderRight: `1px solid ${theme.colors.border}`,
	},
});

export const labelClass = style({
	marginBottom: theme.spacing[1],
});
