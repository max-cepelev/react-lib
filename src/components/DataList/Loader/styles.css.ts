import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const item = style({
	display: 'flex',
	justifyContent: 'center',
	listStyleType: 'none',
	padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
	'@container': {
		'(min-width: 600px)': {
			padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
		},
	},
});
