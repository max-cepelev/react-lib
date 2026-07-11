import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

const buttonBase = style({
	position: 'absolute',
	zIndex: 2,
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	':disabled': {
		userSelect: 'none',
		cursor: 'default',
		opacity: 0.5,
	},
});

export const iconWrapper = style({
	width: theme.spacing[8],
	height: theme.spacing[8],
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: theme.colors.background.paper,
	borderRadius: '9999px',
	transition: 'transform 0.2s ease',
	selectors: {
		[`${buttonBase}:not(:disabled):hover &`]: {
			transform: 'scale(1.1)',
		},
	},
});

globalStyle(`${iconWrapper} svg`, {
	width: theme.spacing[5],
	height: theme.spacing[5],
});

export const buttonNext = styleVariants({
	horizontal: [
		buttonBase,
		{
			right: 0,
			top: 0,
			width: 'clamp(2.5rem, 4vw, 4rem)',
			height: '100%',
		},
	],
	vertical: [
		buttonBase,
		{
			left: 0,
			bottom: 0,
			width: '100%',
			height: 'clamp(2.5rem, 4vw, 4rem)',
		},
	],
});

export const buttonPrev = styleVariants({
	horizontal: [
		buttonBase,
		{
			left: 0,
			top: 0,
			width: 'clamp(2.5rem, 4vw, 4rem)',
			height: '100%',
		},
	],
	vertical: [
		buttonBase,
		{
			right: 0,
			top: 0,
			width: '100%',
			height: 'clamp(2.5rem, 4vw, 4rem)',
		},
	],
});

globalStyle(`${buttonNext.vertical} svg, ${buttonPrev.vertical} svg`, {
	transform: 'rotate(90deg)',
});
