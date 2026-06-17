import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	width: '100%',
	height: '100%',
});

export const stateImage = style({
	display: 'block',
	maxWidth: '100%',
	width: theme.spacing[20],
	height: theme.spacing[20],
	objectFit: 'contain',
});

export const cell = style({
	height: '60vh',
});
