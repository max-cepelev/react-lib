import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const headerRow = style({
	position: 'sticky',
	top: 0,
	zIndex: 1,
});

export const selectionHeaderCell = style({
	padding: 0,
	textAlign: 'center',
	verticalAlign: 'middle',
	borderBottom: `1px solid ${theme.colors.border}`,
});

export const selectionCheckbox = style({
	marginInline: 'auto',
});
