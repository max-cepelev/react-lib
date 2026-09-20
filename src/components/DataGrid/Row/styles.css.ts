import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const rowClass = style({
	backgroundColor: 'transparent',
	transition: 'background-color 0.2s ease',
});

globalStyle(`${rowClass}:last-child td`, {
	borderBottom: 'none',
});

export const selectableClass = style({
	cursor: 'pointer',
	':hover': {
		backgroundColor: theme.colors.background.elementHover,
	},
});

export const selectionCellClass = style({
	padding: 0,
	textAlign: 'center',
	verticalAlign: 'middle',
	borderBottom: `1px solid ${theme.colors.border}`,
});

export const selectionCheckbox = style({
	marginInline: 'auto',
});
