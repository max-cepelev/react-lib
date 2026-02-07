import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const item = style({
	display: 'grid',
	gridTemplateColumns: '100%',
	gridTemplateRows: 'max-content max-content',
	justifyItems: 'center',
	gap: theme.spacing[3],
	padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
	listStyleType: 'none',
	'@container': {
		'(min-width: 600px)': {
			gap: theme.spacing[4],
			padding: theme.spacing[4],
			justifyItems: 'normal',
		},
	},
});
