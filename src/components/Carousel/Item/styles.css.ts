import { style, styleVariants } from '@vanilla-extract/css';

export const item = style({
	minWidth: 0,
	flexShrink: 0,
	flexGrow: 0,
	flexBasis: '100%',
});

export const orientations = styleVariants({
	horizontal: {
		scrollSnapAlign: 'center',
		scrollSnapStop: 'always',
	},
	vertical: {
		scrollSnapAlign: 'start',
		scrollSnapStop: 'always',
	},
});
