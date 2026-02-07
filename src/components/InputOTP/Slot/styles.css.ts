import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const slot = style({
	position: 'relative',
	display: 'flex',
	height: theme.spacing[10],
	width: theme.spacing[10],
	alignItems: 'center',
	justifyContent: 'center',
	border: `1px solid ${theme.colors.border}`,
	borderLeftWidth: 0,
	fontSize: theme.fontSize.sm,
	transition: 'all 0.3s',
	':first-child': {
		borderTopLeftRadius: theme.borderRadius.md,
		borderBottomLeftRadius: theme.borderRadius.md,
		borderLeftWidth: '1px',
	},
	':last-child': {
		borderTopRightRadius: theme.borderRadius.md,
		borderBottomRightRadius: theme.borderRadius.md,
	},
});

export const active = style({
	zIndex: 10,
	borderLeft: `1px solid ${theme.colors.border}`,
	borderColor: theme.colors.primary,
	outlineOffset: theme.spacing[1],
});

export const caretContainer = style({
	position: 'absolute',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	pointerEvents: 'none',
});

export const caretBlink = keyframes({
	'0%': { opacity: 0 },
	'50%': { opacity: 1 },
	'100%': { opacity: 0 },
});

export const caret = style({
	height: theme.spacing[4],
	width: '1px',
	backgroundColor: theme.colors.foreground.secondary,
	animation: `${caretBlink} 1s infinite`,
});
