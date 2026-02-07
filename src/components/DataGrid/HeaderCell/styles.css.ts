import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const headerCellClass = style({
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	width: '100%',
	fontWeight: theme.fontWeight.semibold,
	fontSize: theme.fontSize.sm,
	overflowWrap: 'break-word',
	backgroundColor: theme.colors.background.paper,
	borderBottom: `1px solid ${theme.colors.border}`,
	// selectors: {
	// 	'& svg': {
	// 		minWidth: 10,
	// 		stroke: 'currentColor',
	// 	},
	// },
});
