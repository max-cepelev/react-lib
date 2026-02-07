import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	height: '100%',
});

export const loader = style({
	height: '100%',
	minHeight: 50,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
