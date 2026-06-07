import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { negativeSpacing, spacing, theme } from '~/theme';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

const zoomIn = keyframes({
	from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.95)' },
	to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const zoomOut = keyframes({
	from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
	to: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.95)' },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 50,
	isolation: 'isolate',
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
	backdropFilter: 'blur(4px)',
	selectors: {
		'&[data-open]': {
			animation: `${fadeIn} 100ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${fadeOut} 100ms ease-in`,
		},
	},
});

export const content = style({
	position: 'fixed',
	top: '50%',
	left: '50%',
	zIndex: 50,
	display: 'grid',
	width: '100%',
	maxWidth: 'calc(100% - 2rem)',
	transform: 'translate(-50%, -50%)',
	gap: spacing(4),
	border: `1px solid color-mix(in oklch, ${theme.colors.text.primary} 10%, transparent)`,
	borderRadius: theme.borderRadius.lg,
	backgroundColor: theme.colors.background.paper,
	padding: spacing(4),
	boxShadow: theme.elevation[3],
	outline: 'none',
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.sm,
	selectors: {
		'&[data-open]': {
			animation: `${zoomIn} 100ms ease-out, ${fadeIn} 100ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${zoomOut} 100ms ease-in, ${fadeOut} 100ms ease-in`,
		},
	},
	'@media': {
		'(min-width: 640px)': {
			maxWidth: '24rem',
		},
	},
});

export const closeButton = style({
	position: 'absolute',
	top: theme.spacing[2],
	right: theme.spacing[2],
});

export const closeText = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: spacing(2),
});

export const footer = style({
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: spacing(2),
	marginLeft: negativeSpacing(4),
	marginRight: negativeSpacing(4),
	marginBottom: negativeSpacing(4),
	padding: spacing(4),
	borderTop: `1px solid ${theme.colors.border}`,
	borderBottomRightRadius: theme.borderRadius.lg,
	borderBottomLeftRadius: theme.borderRadius.lg,
	backgroundColor: `color-mix(in oklch, ${theme.colors.text.primary} 5%, transparent)`,
	'@media': {
		'(min-width: 640px)': {
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
	},
});

export const title = style({
	fontSize: theme.fontSize.base,
	fontWeight: theme.fontWeight.medium,
	lineHeight: theme.lineHeight.none,
	paddingRight: spacing(8),
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.normal,
	textWrap: 'balance',
});

globalStyle(`${description} a`, {
	textDecoration: 'underline',
	textUnderlineOffset: spacing(3),
});

globalStyle(`${description} a:hover`, {
	color: theme.colors.text.primary,
});
