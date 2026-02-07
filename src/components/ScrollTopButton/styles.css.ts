import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const button = style({
	position: 'fixed',
	bottom: theme.spacing[5], // 20px
	right: '-40px',
	transition: 'right 0.3s',
	width: '40px',
	height: '40px',
	padding: theme.spacing[1], // 8px
	zIndex: 10,
	boxShadow: theme.elevation[4],
});

export const visible = style({
	right: theme.spacing[6], // 20px
});
