import { style } from '@vanilla-extract/css';

export const actionsClass = style({
	display: 'flex',
	gap: 10,
	justifyContent: 'end',
});

export const wrapperClass = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 10,
});

export const popoverClass = style({
	width: 'min-content',
	padding: '0.7rem',
});

export const hasTextClass = style({
	width: 'max-content',
	maxWidth: 400,
});
