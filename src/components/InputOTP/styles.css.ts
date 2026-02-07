import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
});

globalStyle(`${container}:has(:disabled)`, {
	opacity: 0.5,
});

export const input = style({
	cursor: 'pointer',
	':disabled': {
		cursor: 'not-allowed',
	},
});

export const group = style({
	display: 'flex',
	alignItems: 'center',
});

export const disabled = style({
	pointerEvents: 'none',
	opacity: 0.5,
});
