import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { negativeSpacing, spacing, theme } from '~/theme';
import type { AlertSeverity } from './types';

export const root = style({
	boxSizing: 'border-box',
	display: 'grid',
	gridTemplateColumns: `${theme.spacing[5]} minmax(0, 1fr) max-content`,
	alignItems: 'start',
	columnGap: theme.spacing[3],
	rowGap: theme.spacing[3],
	width: '100%',
	minWidth: 0,
	padding: spacing(3),
	borderWidth: 1,
	borderStyle: 'solid',
	borderRadius: theme.borderRadius.md,
	color: theme.colors.text.primary,

	selectors: {
		'&[hidden]': {
			display: 'none',
		},
	},
});

export const severityVariants = styleVariants<
	Record<AlertSeverity, ComplexStyleRule>
>({
	info: {
		backgroundColor: `color-mix(in oklch, ${theme.colors.info} 10%, transparent)`,
		borderColor: `color-mix(in oklch, ${theme.colors.info} 36%, transparent)`,
	},
	success: {
		backgroundColor: `color-mix(in oklch, ${theme.colors.success} 10%, transparent)`,
		borderColor: `color-mix(in oklch, ${theme.colors.success} 36%, transparent)`,
	},
	warning: {
		backgroundColor: `color-mix(in oklch, ${theme.colors.warning} 12%, transparent)`,
		borderColor: `color-mix(in oklch, ${theme.colors.warning} 42%, transparent)`,
	},
	error: {
		backgroundColor: `color-mix(in oklch, ${theme.colors.error} 10%, transparent)`,
		borderColor: `color-mix(in oklch, ${theme.colors.error} 36%, transparent)`,
	},
});

export const icon = style({
	display: 'flex',
	width: theme.spacing[5],
	height: theme.spacing[5],
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
});

export const iconVariants = styleVariants<
	Record<AlertSeverity, ComplexStyleRule>
>({
	info: {
		color: theme.colors.info,
	},
	success: {
		color: theme.colors.success,
	},
	warning: {
		color: theme.colors.warning,
	},
	error: {
		color: theme.colors.error,
	},
});

globalStyle(`${icon} svg`, {
	display: 'block',
	width: theme.spacing[5],
	height: theme.spacing[5],
	flexShrink: 0,
});

export const content = style({
	display: 'flex',
	minWidth: 0,
	flexDirection: 'column',
	gap: theme.spacing[1],
});

export const title = style({
	margin: 0,
	lineHeight: theme.lineHeight.normal,
});

export const message = style({
	margin: 0,
	minWidth: 0,
});

export const closeButton = style({
	marginBlockStart: negativeSpacing(1),
	marginInlineEnd: negativeSpacing(1),
	color: theme.colors.text.secondary,
});

globalStyle(`${closeButton} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const actions = style({
	display: 'flex',
	gridColumn: '2 / -1',
	minWidth: 0,
	flexWrap: 'wrap',
	alignItems: 'center',
	gap: theme.spacing[2],
});
