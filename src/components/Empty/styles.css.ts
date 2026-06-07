import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { spacing, theme } from '~/theme';
import type { EmptyMediaVariant } from './types';

export const root = style({
	display: 'flex',
	width: '100%',
	minWidth: 0,
	flex: 1,
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: spacing(4),
	borderRadius: theme.borderRadius.lg,
	padding: spacing(6),
	textAlign: 'center',
	textWrap: 'balance',
});

export const header = style({
	display: 'flex',
	maxWidth: '24rem',
	flexDirection: 'column',
	alignItems: 'center',
	gap: spacing(2),
});

export const media = style({
	marginBottom: spacing(2),
	display: 'flex',
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
});

export const mediaVariants = styleVariants<
	Record<EmptyMediaVariant, ComplexStyleRule>
>({
	default: {
		backgroundColor: 'transparent',
	},
	icon: {
		width: theme.spacing[8],
		height: theme.spacing[8],
		flexShrink: 0,
		borderRadius: theme.borderRadius.md,
		backgroundColor: theme.colors.background.element,
		color: theme.colors.text.primary,
	},
});

globalStyle(`${media} svg`, {
	pointerEvents: 'none',
	flexShrink: 0,
});

globalStyle(`${mediaVariants.icon} svg:not([class*="size-"])`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const title = style({
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	lineHeight: theme.lineHeight.normal,
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.relaxed,
});

globalStyle(`${description} a`, {
	textDecoration: 'underline',
});

globalStyle(`${description} a:hover`, {
	color: theme.colors.primary,
});

export const content = style({
	display: 'flex',
	width: '100%',
	maxWidth: '24rem',
	minWidth: 0,
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.625rem',
	fontSize: theme.fontSize.sm,
	textWrap: 'balance',
});
