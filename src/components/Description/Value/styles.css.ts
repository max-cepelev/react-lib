import { style } from '@vanilla-extract/css';

export const wrapper = style({
	overflow: 'hidden',
	margin: 0,
});

export const text = style({
	overflow: 'hidden',
	hyphens: 'auto',
	overflowWrap: 'break-word',
	textAlign: 'left',
});

export const leader = style({
	textAlign: 'right',
});
