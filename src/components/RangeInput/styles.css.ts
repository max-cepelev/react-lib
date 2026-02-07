import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: 'auto auto 1fr auto 1fr auto',
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

// Size variants
export const sizes = styleVariants({
	sm: {
		height: theme.spacing[8],
		fontSize: theme.fontSize.xs,
		padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	},
	md: {
		height: theme.spacing[10],
		fontSize: theme.fontSize.sm,
		padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
	},
	lg: {
		height: theme.spacing[12],
		fontSize: theme.fontSize.base,
		padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
	},
});

export const textClass = style({
	fontSize: 'inherit',
});

export const inputClass = style({
	textAlign: 'center',
	width: '100%',
	minWidth: '24px',
	border: 'none',
	fontSize: 'inherit', // 14px
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

export const sliderClass = style({
	position: 'absolute',
	bottom: -1,
	left: '50%',
	transform: 'translateX(-50%)',
	width: 'calc(100% - 4px)',
});
