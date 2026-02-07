import { style } from '@vanilla-extract/css';

export const loadingContainer = style({
	display: 'flex',
	flexGrow: 1,
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
});
