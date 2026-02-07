import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	overflow: 'hidden',
	height: '100%',
	width: '100%',
});

export const orientations = styleVariants({
	horizontal: {
		display: 'flex',
		gap: theme.spacing[4],
	},
	vertical: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing[4],
	},
});
