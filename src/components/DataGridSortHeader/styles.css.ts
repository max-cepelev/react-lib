import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	display: 'flex',
	position: 'relative',
	alignItems: 'center',
	gap: theme.spacing[1],
	cursor: 'pointer',
	backgroundColor: 'transparent',
	border: 'none',
	color: 'inherit',
	fontSize: 'inherit',
	fontWeight: 'inherit',
	fontFamily: 'inherit',
	width: '100%',
	height: '100%',
	overflowWrap: 'break-word',
});

globalStyle(`${wrapper} svg`, {
	minWidth: 12,
	stroke: 'currentColor',
});

export const alignments = styleVariants({
	left: {
		justifyContent: 'flex-start',
	},
	center: {
		justifyContent: 'center',
	},
	right: {
		justifyContent: 'flex-end',
	},
	justify: {
		justifyContent: 'space-between',
	},
});
