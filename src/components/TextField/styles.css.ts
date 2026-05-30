import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
});

export const labelClass = style({
	marginBottom: 6,
});

export const helperTextClass = style({
	marginLeft: theme.borderRadius.md,
	color: 'inherit',
	overflowWrap: 'break-word',
});

export const disabledClass = style({
	opacity: 0.5,
});

export const errorClass = style({
	color: theme.colors.error,
});

export const fullWidthClass = style({
	width: '100%',
});
