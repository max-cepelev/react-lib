import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style(
	{
		fontSize: theme.fontSize.xs,
		lineHeight: theme.lineHeight.none,
		fontWeight: theme.fontWeight.medium,
		marginLeft: theme.spacing[1],
	},
	'Label',
);

export const disabled = style({
	opacity: 0.5,
	cursor: 'not-allowed',
});

export const error = style({
	color: theme.colors.error,
});

export const required = style({
	':after': {
		content: '"*"',
		color: 'inherit',
		height: 'min-content',
		display: 'inline-block',
		marginLeft: theme.spacing[1],
	},
});
