import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	flexShrink: 0,
	maxWidth: `calc(100% - ${theme.spacing[3]})`,
	marginRight: theme.spacing[2],
});

export const leader = style({
	maxWidth: 'calc(100% - 36px)',
});

export const dashedSeparator = style({
	flex: 1,
	minWidth: theme.spacing[3],
	height: theme.spacing[1],
	marginRight: theme.spacing[2],
	borderBottom: `1px dashed ${theme.colors.border}`,

	'@media': {
		'(max-width: 600px)': {
			display: 'none',
		},
	},
});
