import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const rootClass = style({
	gridArea: 'footer',
	zIndex: 1000,
	display: 'flex',
	gap: theme.spacing[4],
	alignItems: 'center',
	justifyContent: 'flex-end',
	height: 64,
	padding: theme.spacing[4],
	'@media': {
		'(max-width: 600px)': {
			display: 'none',
		},
	},
});
