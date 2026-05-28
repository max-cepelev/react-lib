import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.paper,
});

export const header = style({
	padding: theme.spacing[6],
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	gap: theme.spacing[2],
});

export const title = style({
	fontSize: theme.fontSize['2xl'],
	fontWeight: theme.fontWeight.semibold,
	lineHeight: theme.lineHeight.none,
	letterSpacing: '-0.025em',
});

export const description = style({
	fontSize: theme.fontSize.sm,
	color: theme.colors.text.secondary,
});

export const content = style({
	padding: theme.spacing[6],
	paddingTop: 0,
});

export const footer = style({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing[6],
	paddingTop: 0,
});
