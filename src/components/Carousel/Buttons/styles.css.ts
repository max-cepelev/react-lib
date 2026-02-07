import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

const base = style({
	position: 'absolute',
	opacity: 0.4,
	userSelect: 'none',
	display: 'grid',
	placeItems: 'center',
	borderRadius: theme.borderRadius.md,
	color: theme.colors.primary,
	transition: 'opacity linear .2s',
	':disabled': {
		pointerEvents: 'none',
		opacity: 0.2,
	},
	':hover': {
		opacity: 1,
	},
});

export const next = style([
	base,
	{
		right: 0,
		bottom: 0,
	},
]);

export const prev = style([
	base,
	{
		left: 0,
		top: 0,
	},
]);

export const orientations = styleVariants({
	horizontal: {
		height: '100%',
		width: 'clamp(35px, 15%, 55px)',
	},
	vertical: {
		height: 'clamp(35px, 15%, 55px)',
		width: '100%',
	},
});
