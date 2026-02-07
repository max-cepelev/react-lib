import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	display: 'flex',
	flexWrap: 'nowrap',
	width: 'fit-content',
	alignItems: 'center',
	gap: theme.spacing[1],
	cursor: 'pointer',
	':hover': {
		textDecoration: 'underline',
	},
});

export const copyIconClass = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
	minWidth: theme.spacing[4],
	minHeight: theme.spacing[4],
});
