import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.paper,
	width: '100%',
	height: '100%',
	overflow: 'hidden auto',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
});

export const table = style({
	width: '100%',
	tableLayout: 'fixed',
	borderCollapse: 'separate',
	borderSpacing: 0,
});

export const fullHeight = style({
	height: '100%',
});

export const disabled = style({
	pointerEvents: 'none',
	background: theme.colors.background.paper,
	mixBlendMode: 'luminosity',
});

export const loading = style({
	pointerEvents: 'none',
	opacity: 0.5,
});

export const titleClass = style({
	fontSize: theme.fontSize['2xl'],
	fontWeight: theme.fontWeight.semibold,
	lineHeight: theme.lineHeight.none,
	letterSpacing: '-0.025em',
});
