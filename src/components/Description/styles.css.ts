import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
	overflow: 'hidden',
	display: 'flex',
	alignItems: 'baseline',
	margin: 0,
});

export const directions = styleVariants({
	row: {
		flexDirection: 'row',
	},
	column: {
		flexDirection: 'column',
	},
});

export const justify = styleVariants({
	spaceBetween: {
		justifyContent: 'space-between',
	},
	start: {
		justifyContent: 'start',
	},
});
