import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const field = style({
	display: 'flex',
	flexDirection: 'column',
	width: 'max-content',
});

export const fullWidth = style({
	width: '100%',
});

export const label = style({
	marginBottom: 6,
});

export const helperText = style({
	marginLeft: theme.borderRadius.md,
	color: 'inherit',
	overflowWrap: 'break-word',
});

export const error = style({
	color: theme.colors.error,
});

export const disabled = style({
	opacity: 0.5,
});

export const optionMeta = style({
	marginLeft: 'auto',
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.xs,
});
