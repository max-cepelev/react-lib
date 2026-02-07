import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

const baseWrapper = style({
	display: 'flex',
	position: 'absolute',
	zIndex: 1,
	overflow: 'auto',
	justifyContent: 'center',
	gap: theme.spacing[1],
});

export const wrapper = styleVariants({
	horizontal: [
		baseWrapper,
		{
			width: '100%',
			height: 'auto',
			bottom: theme.spacing[2],
			left: 0,
		},
	],
	vertical: [
		baseWrapper,
		{
			width: 'auto',
			height: '100%',
			bottom: 0,
			left: theme.spacing[4],
			flexDirection: 'column',
		},
	],
});

const buttonBase = style({
	width: theme.spacing[6],
	height: theme.spacing[6],
	position: 'relative',
	border: 'none',
	background: 'transparent',
	cursor: 'pointer',
	selectors: {
		'&:focus': {
			outline: 'none',
		},
		'&:after': {
			backgroundColor: theme.colors.border,
		},
	},
});

export const dotButton = styleVariants({
	horizontal: [
		buttonBase,
		{
			selectors: {
				'&::after': {
					content: '',
					position: 'absolute',
					left: 0,
					top: '50%',
					transform: 'translateY(-50%)',
					width: '100%',
					height: '2px',
				},
			},
		},
	],
	vertical: [
		buttonBase,
		{
			selectors: {
				'&::after': {
					content: '',
					position: 'absolute',
					left: '50%',
					top: 0,
					transform: 'translateX(-50%)',
					width: '2px',
					height: '100%',
				},
			},
		},
	],
});

export const selected = style({
	selectors: {
		'&::after': {
			backgroundColor: theme.colors.primary,
		},
	},
});
