import { globalStyle, style } from '@vanilla-extract/css';
import { spacing, theme } from '~/theme';

export const item = style({
	display: 'grid',
	gridTemplateColumns: 'minmax(0, 1fr) auto',
	minWidth: 0,
	alignItems: 'center',
	gap: theme.spacing[2],
	padding: spacing(2, 3),
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.paper,

	selectors: {
		'&[data-state="error"]': {
			borderColor: `color-mix(in oklch, ${theme.colors.error} 52%, transparent)`,
			backgroundColor: `color-mix(in oklch, ${theme.colors.error} 4%, transparent)`,
		},
	},
});

export const content = style({
	display: 'flex',
	minWidth: 0,
	flexDirection: 'column',
	gap: theme.spacing[2],
});

export const meta = style({
	display: 'flex',
	minWidth: 0,
	alignItems: 'baseline',
	gap: theme.spacing[2],
});

export const fileName = style({
	minWidth: 0,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const fileSize = style({
	flexShrink: 0,
	whiteSpace: 'nowrap',
});

export const fileError = style({
	margin: 0,
});

export const actions = style({
	display: 'flex',
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: theme.spacing[1],
});

export const fileAction = style({
	color: theme.colors.text.secondary,
});

globalStyle(`${fileAction} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});
