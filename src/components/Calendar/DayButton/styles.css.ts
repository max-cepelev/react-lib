import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const button = style(
	{
		width: theme.spacing[8],
		height: theme.spacing[8],
		position: 'relative',
		':after': {
			content: '',
			position: 'absolute',
			bottom: 4,
			left: 8,
			display: 'none',
			width: `calc(100% - ${theme.spacing[4]})`,
			height: 2,
			color: 'currentColor',
			backgroundColor: 'currentColor',
		},
	},
	'dayButton',
);

export const today = style(
	{
		':after': {
			display: 'block',
		},
	},
	'today',
);

export const outside = style(
	{
		color: theme.colors.text.hint,
	},
	'outside',
);
