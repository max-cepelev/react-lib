import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const headerRow = style({
	position: 'sticky',
	top: 0,
	zIndex: 1,
});

export const selectionHeaderCell = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderBottom: `1px solid ${theme.colors.border}`,
});
