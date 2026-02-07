import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	touchAction: 'none',
	userSelect: 'none',
	alignItems: 'center',
	backgroundColor: 'transparent',
});

export const track = style({
	position: 'relative',
	height: 2,
	width: '100%',
	flexGrow: 1,
	overflow: 'hidden',
	borderRadius: '9999px',
	backgroundColor: 'transparent',
	cursor: 'pointer',
});

export const range = style({
	position: 'absolute',
	height: '100%',
	backgroundColor: theme.colors.primary,
});

export const thumb = style({
	display: 'block',
	height: theme.spacing[3],
	width: theme.spacing[3],
	borderRadius: '9999px',
	border: `2px solid ${theme.colors.primary}`,
	backgroundColor: theme.colors.background.paper,
	transition: 'all 0.2s',
	cursor: 'grab',

	selectors: {
		'&:focus-visible': {
			outline: 'none',
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&:hover': {
			height: theme.spacing[4],
			width: theme.spacing[4],
		},
	},
});
