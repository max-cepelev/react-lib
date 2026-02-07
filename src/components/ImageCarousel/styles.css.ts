import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const carousel = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	maxWidth: '800px',
	margin: '0 auto',
	overflow: 'hidden',
});

export const carouselInner = style({
	display: 'flex',
	transition: 'transform 0.5s ease',
	width: '100%',
	height: '100%',
});

export const slide = style({
	minWidth: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const image = style({
	width: '100%',
	height: '100%',
	objectFit: 'contain',
});

export const arrow = style({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	width: '40px',
	height: '40px',
	backgroundColor: 'rgba(255, 255, 255, 0.7)',
	border: 'none',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: theme.fontSize.xl,
	cursor: 'pointer',
	zIndex: 10,
	transition: 'background-color 0.3s ease',

	selectors: {
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.9)',
		},
	},
});

export const arrowLeft = style({
	left: theme.spacing[2],
});

export const arrowRight = style({
	right: theme.spacing[2],
});

export const indicators = style({
	position: 'absolute',
	bottom: theme.spacing[5],
	left: '50%',
	transform: 'translateX(-50%)',
	display: 'flex',
	gap: theme.spacing[2],
});

export const indicator = style({
	width: theme.spacing[3],
	height: theme.spacing[3],
	borderRadius: '50%',
	backgroundColor: 'rgba(255, 255, 255, 0.5)',
	border: 'none',
	cursor: 'pointer',
	transition: 'background-color 0.3s ease',

	selectors: {
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 1)',
		},
		'&.active': {
			backgroundColor: 'rgba(255, 255, 255, 1)',
		},
	},
});
