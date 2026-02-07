import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { BadgeVariant } from './types';

export const rootClass = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.medium,
	width: 'fit-content',
	whiteSpace: 'nowrap',
	flexShrink: 0,
	gap: theme.spacing[1],
	overflow: 'hidden',
	transition: 'color 150ms, box-shadow 150ms',

	selectors: {
		'&:focus-visible': {
			outline: 'none',
			borderColor: theme.colors.border,
			boxShadow: theme.elevation[3],
		},
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
			boxShadow: theme.elevation[3],
		},
	},
});

globalStyle(`${rootClass} svg`, {
	width: theme.spacing[3],
	height: theme.spacing[3],
	pointerEvents: 'none',
});

export const badgeVariants = styleVariants<
	Record<BadgeVariant, ComplexStyleRule>
>({
	default: {
		borderColor: 'transparent',
		backgroundColor: theme.colors.primary,
		color: theme.colors.foreground.primary,
		selectors: {
			'a&:hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 90%, transparent)`,
			},
		},
	},
	secondary: {
		borderColor: 'transparent',
		backgroundColor: theme.colors.background.element,
		color: theme.colors.text.primary,
		selectors: {
			'a&:hover': {
				backgroundColor: theme.colors.background.elementHover,
			},
		},
	},
	destructive: {
		borderColor: 'transparent',
		backgroundColor: theme.colors.error,
		color: theme.colors.foreground.primary,
		selectors: {
			'a&:hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.error} 90%, transparent)`,
			},
			'&:focus-visible': {
				outline: 'none',
				borderColor: theme.colors.primary,
				boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.error} 20%, transparent)`,
			},
		},
	},
	outline: {
		color: theme.colors.text.primary,
		borderColor: theme.colors.border,
		backgroundColor: 'transparent',

		selectors: {
			'a&:hover': {
				backgroundColor: theme.colors.background.elementHover,
				color: theme.colors.text.primary,
			},
		},
	},
});
