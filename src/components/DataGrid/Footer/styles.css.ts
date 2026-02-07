import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const footerClass = style({
	width: '100%',
	height: 'auto',
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	backgroundColor: theme.colors.background.paper,
	position: 'sticky',
	bottom: 0,
	padding: theme.spacing[2],
	borderTop: `1px solid ${theme.colors.border}`,
	marginTop: 'auto',
	':empty': {
		display: 'none',
	},
});
