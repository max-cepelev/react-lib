import { style } from '@vanilla-extract/css';

export const rootClass = style({
	gridArea: 'main',
	overflow: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	transition: 'all 0.2s ease',
});
