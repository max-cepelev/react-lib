import {
	type ComplexStyleRule,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { TypographyVariant } from './types';

export const variants = styleVariants<
	Record<TypographyVariant, ComplexStyleRule>
>({
	h1: {
		fontSize: theme.fontSize['4xl'],
		fontWeight: theme.fontWeight.bold,
		lineHeight: theme.lineHeight.tight,
		letterSpacing: '-0.025em',
	},
	h2: {
		fontSize: theme.fontSize['3xl'],
		fontWeight: theme.fontWeight.bold,
		lineHeight: theme.lineHeight.tight,
		letterSpacing: '-0.025em',
	},
	h3: {
		fontSize: theme.fontSize['2xl'],
		fontWeight: theme.fontWeight.bold,
		lineHeight: theme.lineHeight.snug,
		letterSpacing: '-0.025em',
	},
	h4: {
		fontSize: theme.fontSize.xl,
		fontWeight: theme.fontWeight.semibold,
		lineHeight: theme.lineHeight.snug,
	},
	h5: {
		fontSize: theme.fontSize.lg,
		fontWeight: theme.fontWeight.semibold,
		lineHeight: theme.lineHeight.normal,
	},
	h6: {
		fontSize: theme.fontSize.base,
		fontWeight: theme.fontWeight.semibold,
		lineHeight: theme.lineHeight.normal,
	},
	subtitle1: {
		fontSize: theme.fontSize.base,
		fontWeight: theme.fontWeight.medium,
		lineHeight: theme.lineHeight.normal,
		letterSpacing: '0.009em',
	},
	subtitle2: {
		fontSize: theme.fontSize.sm,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 1.57,
		letterSpacing: '0.007em',
	},
	body1: {
		fontSize: theme.fontSize.base,
		fontWeight: theme.fontWeight.normal,
		lineHeight: theme.lineHeight.normal,
		letterSpacing: '0.012em',
	},
	body2: {
		fontSize: theme.fontSize.sm,
		fontWeight: theme.fontWeight.normal,
		lineHeight: theme.lineHeight.snug,
		letterSpacing: '0.01em',
	},
	caption: {
		fontSize: theme.fontSize.xs,
		fontWeight: theme.fontWeight.normal,
		lineHeight: theme.lineHeight.relaxed,
		letterSpacing: '0.027em',
	},
	overline: {
		fontSize: theme.fontSize.xs,
		fontWeight: theme.fontWeight.normal,
		lineHeight: 2.66,
		letterSpacing: '0.083em',
		textTransform: 'uppercase',
	},
});

export const colors = styleVariants({
	primary: {
		color: theme.colors.text.primary,
	},
	secondary: {
		color: theme.colors.text.secondary,
	},
	disabled: {
		color: theme.colors.text.disabled,
	},
	success: {
		color: theme.colors.success,
	},
	error: {
		color: theme.colors.error,
	},
	warning: {
		color: theme.colors.warning,
	},
	info: {
		color: theme.colors.info,
	},
	muted: {
		color: theme.colors.text.hint,
	},
});

export const alignments = styleVariants({
	left: {
		textAlign: 'left',
	},
	center: {
		textAlign: 'center',
	},
	right: {
		textAlign: 'right',
	},
	justify: {
		textAlign: 'justify',
	},
});

export const displays = styleVariants({
	block: {
		display: 'block',
	},
	inline: {
		display: 'inline',
	},
});

export const weights = styleVariants({
	normal: {
		fontWeight: theme.fontWeight.normal,
	},
	medium: {
		fontWeight: theme.fontWeight.medium,
	},
	semibold: {
		fontWeight: theme.fontWeight.semibold,
	},
	bold: {
		fontWeight: theme.fontWeight.bold,
	},
});

export const transforms = styleVariants({
	lowercase: {
		textTransform: 'lowercase',
	},
	uppercase: {
		textTransform: 'uppercase',
	},
	capitalize: {
		textTransform: 'capitalize',
	},
});

export const decorations = styleVariants({
	none: {
		textDecoration: 'none',
	},
	underline: {
		textDecoration: 'underline',
	},
	lineThrough: {
		textDecoration: 'line-through',
	},
});

export const gutterBottomClass = style({
	marginBottom: theme.spacing[2],
});
