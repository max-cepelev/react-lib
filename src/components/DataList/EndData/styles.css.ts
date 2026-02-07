import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const item = style({
	display: 'flex',
	justifyContent: 'center',
	padding: `${theme.spacing[4]} ${theme.spacing[5]}`,
	listStyleType: 'none',
	'@container': {
		'(min-width: 600px)': {
			padding: theme.spacing[4],
		},
	},
});
