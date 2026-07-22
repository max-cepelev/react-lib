import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	position: 'relative',
	overflow: 'hidden',
	width: '100%',
	height: theme.spacing[1],
	borderRadius: theme.borderRadius.sm,
	backgroundColor: theme.colors.background.element,
});

export const indicator = style({
	position: 'absolute',
	inset: 0,
	borderRadius: 'inherit',
	backgroundColor: theme.colors.success,
	transformOrigin: 'left center',
	transition: 'transform 200ms ease-out',

	'@media': {
		'(prefers-reduced-motion: reduce)': {
			transition: 'none',
		},
	},
});
