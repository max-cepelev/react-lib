import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const spin = keyframes({
	to: {
		transform: 'rotate(360deg)',
	},
});

export const root = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
	animation: `${spin} 1s linear infinite`,
	color: 'currentColor',
});
