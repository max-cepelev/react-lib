import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const state = style({
	boxSizing: 'border-box',
	display: 'flex',
	width: '100%',
	height: '100%',
	minWidth: 0,
	minHeight: '100%',
	alignItems: 'center',
	justifyContent: 'center',
});

export const errorImage = style({
	display: 'block',
	maxWidth: '100%',
	width: theme.spacing[20],
	height: theme.spacing[20],
	objectFit: 'contain',
});
