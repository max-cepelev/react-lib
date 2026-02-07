import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const list = style({
	containerType: 'inline-size',
});

export const itemClass = style({
	listStyleType: 'none',
	cursor: 'pointer',
	padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
	backgroundColor: theme.colors.background.paper,
	borderRadius: theme.borderRadius.sm,
	transition: 'background-color 0.2s ease',
	fontFamily: 'inherit',
	fontSize: 'inherit',
	':hover': {
		backgroundColor: theme.colors.background.elementHover,
	},
	'@container': {
		'(min-width: 600px)': {
			borderBottom: `1px solid ${theme.colors.border}`,
		},
	},
});
