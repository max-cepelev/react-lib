import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const content = style({
	display: 'flex',
	height: '100%',
	width: '100%',
	overflow: 'hidden',
	scrollbarWidth: 'none',
	WebkitOverflowScrolling: 'touch',
	selectors: {
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
});

export const orientations = styleVariants({
	horizontal: {
		overflowX: 'auto',
		overflowY: 'hidden',
		flexDirection: 'row',
		scrollSnapType: 'x mandatory',
		overscrollBehaviorX: 'contain',
		overscrollBehaviorY: 'auto',
		columnGap: theme.spacing[4],
	},
	vertical: {
		overflowY: 'auto',
		overflowX: 'hidden',
		flexDirection: 'column',
		scrollSnapType: 'y mandatory',
		overscrollBehaviorY: 'contain',
		overscrollBehaviorX: 'auto',
		rowGap: theme.spacing[4],
	},
});
