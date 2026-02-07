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
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const iconClass = style({
	position: 'absolute',
	top: '50%',
	left: '50%',
	width: theme.spacing[2],
	height: theme.spacing[2],
	transform: 'translate(-50%, -50%)',
	fill: theme.colors.primary,
});
