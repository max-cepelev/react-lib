import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	alignItems: 'center',
	columnGap: theme.spacing[1],
	background: theme.colors.background.paper,
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	transition: 'border 0.2s',

	'@media': {
		'(max-width: 600px)': {
			width: '100%',
		},
	},
});

export const activeClass = style({
	borderColor: theme.colors.primary,
});

export const sizes = styleVariants({
	small: {
		height: 28,
		fontSize: theme.fontSize.sm,
		paddingInline: theme.spacing[2],
	},
	medium: {
		height: 32,
		fontSize: theme.fontSize.base,
		paddingInline: theme.spacing[2],
	},
	large: {
		height: 36,
		paddingInline: theme.spacing[3],
		fontSize: theme.fontSize.base,
	},
});

export const inputClass = style({
	textAlign: 'center',
	width: '100%',
	minWidth: '24px',
	border: 'none',
	fontSize: 'inherit',
	textWrap: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	outline: 'none',

	selectors: {
		'&:focus': {
			border: 'none',
		},
	},
});

export const textClass = style({
	fontSize: 'inherit',
});

export const slider = style({
	position: 'absolute',
	bottom: -1,
	left: '50%',
	transform: 'translateX(-50%)',
	paddingInline: theme.spacing[2],
	borderRadius: 9999,
});

globalStyle(`${slider} [data-slot="slider-track"]`, {
	height: 1,
});
