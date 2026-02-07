import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const rootClass = style({
	gridArea: 'content',
	scrollBehavior: 'smooth',
	scrollbarGutter: 'stable',
	overflow: 'auto',
	height: 'auto',
	padding: theme.spacing[4],
});

export const fullHeightClass = style({
	height: '100%',
});
