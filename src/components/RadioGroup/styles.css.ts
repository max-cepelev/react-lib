import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const radioGroupClass = style(
	{
		display: 'grid',
		gap: theme.spacing[3],
	},
	'RadioGroup',
);

export const itemWrapperClass = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
});

export const itemClass = style({
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: `1px solid ${theme.colors.border}`,
	color: theme.colors.primary,
	backgroundColor: theme.colors.background.paper,
	borderRadius: '9999px', // rounded-full
	aspectRatio: '1 / 1',
	width: theme.spacing[4], // size-4
	height: theme.spacing[4],
	flexShrink: 0,
	boxShadow: theme.elevation[3],
	outline: 'none',
	transition: 'color 0.2s, box-shadow 0.2s',
	selectors: {
		'&:focus-visible': {
			borderColor: theme.colors.background.elementHover,
			boxShadow: `0 0 0 3px ${theme.colors.background.elementHover}80`, // 50% прозрачность
		},
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px ${theme.colors.error}33`, // ~20% прозрачность
		},
		'&[aria-invalid="true"].dark': {
			boxShadow: `0 0 0 3px ${theme.colors.error}66`, // ~40% прозрачность
		},
		'&:disabled': {
			opacity: 0.5,
			cursor: 'not-allowed',
		},
	},
});

export const indicatorClass = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	color: theme.colors.primary,
});

export const iconClass = style({
	width: theme.spacing[2],
	height: theme.spacing[2],
	fill: 'currentColor',
});
