import { style } from '@vanilla-extract/css';
import { spacing, theme } from '~/theme';

export const viewport = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	touchAction: 'none',
});

export const toolbar = style({
	position: 'absolute',
	top: '50%',
	right: theme.spacing[1],
	zIndex: 1,
	opacity: 0.5,
	transform: 'translateY(-50%)',
	transition: 'opacity 0.2s ease-in-out',

	selectors: {
		'&:hover': {
			opacity: 1,
		},
	},
});

export const overlay = style({
	position: 'absolute',
	bottom: theme.spacing[4],
	left: '50%',
	zIndex: 10,
	padding: spacing(2, 4),
	borderRadius: theme.borderRadius.sm,
	backgroundColor: theme.colors.background.tooltip,
	color: theme.colors.foreground.primary,
	fontSize: theme.fontSize.sm,
	opacity: 0,
	pointerEvents: 'none',
	transform: 'translateX(-50%)',
	transition: 'opacity 0.2s ease-in-out',

	selectors: {
		'&[data-visible="true"]': {
			opacity: 1,
		},
	},
});

export const content = style({
	position: 'absolute',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	userSelect: 'none',
});
