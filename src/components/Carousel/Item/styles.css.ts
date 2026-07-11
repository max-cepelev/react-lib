import { style, styleVariants } from '@vanilla-extract/css';

export const item = style({
	minWidth: 0,
	flexShrink: 0,
	flexGrow: 0,
	flexBasis: '100%',
});

export const orientations = styleVariants({
	horizontal: {
		scrollSnapStop: 'always',
	},
	vertical: {
		scrollSnapStop: 'always',
	},
});

export const alignments = styleVariants({
	start: { scrollSnapAlign: 'start' },
	center: { scrollSnapAlign: 'center' },
	end: { scrollSnapAlign: 'end' },
});
