import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const cellClass = style({
	overflow: 'hidden',
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	height: '100%',
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.base,
	borderBottom: `1px solid ${theme.colors.border}`,
});

export const disabledClass = style({
	opacity: 0.5,
});
