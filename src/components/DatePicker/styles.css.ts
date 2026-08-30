import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	display: 'flex',
	width: 'max-content',
	minWidth: 0,
	flexDirection: 'column',
	gap: theme.spacing[1],
});

export const fullWidth = style({
	width: '100%',
});

export const control = style({
	selectors: {
		'&[data-size="small"]': {
			minHeight: `calc(${theme.spacing[6]} + ${theme.spacing[1]})`,
			fontSize: theme.fontSize.sm,
		},
		'&[data-size="medium"]': {
			minHeight: theme.spacing[8],
			fontSize: theme.fontSize.base,
		},
		'&[data-size="large"]': {
			minHeight: `calc(${theme.spacing[8]} + ${theme.spacing[1]})`,
			fontSize: theme.fontSize.base,
		},
	},
});

globalStyle(`${control}[data-size="small"] [data-slot="date-picker-input"]`, {
	fontSize: theme.fontSize.sm,
});

globalStyle(`${control}[data-size="medium"] [data-slot="date-picker-input"]`, {
	fontSize: theme.fontSize.base,
});

globalStyle(`${control}[data-size="large"] [data-slot="date-picker-input"]`, {
	fontSize: theme.fontSize.base,
});

export const trigger = style({
	color: theme.colors.text.secondary,
});

globalStyle(`${trigger} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
});

export const helperText = style({
	margin: 0,
	paddingInline: theme.spacing[1],
});
