import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const paginationContainer = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[1],
	padding: 0,
});

export const ellipsisSpan = style({
	alignSelf: 'flex-end',
});

globalStyle(`${ellipsisSpan} svg`, {
	stroke: 'currentColor',
	height: theme.spacing[4],
});
