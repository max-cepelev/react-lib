import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	zIndex: 50,
	backgroundColor: 'rgba(0, 0, 0, 0.5)',

	selectors: {
		'&[data-state="open"]': {
			animation: `${fadeIn} 150ms ease-out`,
		},
		'&[data-state="closed"]': {
			animation: `${fadeOut} 150ms ease-in`,
		},
	},
});

export const content = style({
	position: 'fixed',
	zIndex: 50,
	display: 'flex',
	height: 'auto',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.paper,

	selectors: {
		// Top direction
		'&[data-vaul-drawer-direction="top"]': {
			left: 0,
			right: 0,
			top: 0,
			marginBottom: theme.spacing[10],
			maxHeight: '80vh',
			borderBottomLeftRadius: theme.borderRadius.lg,
			borderBottomRightRadius: theme.borderRadius.lg,
			borderBottom: `1px solid ${theme.colors.border}`,
		},

		// Bottom direction
		'&[data-vaul-drawer-direction="bottom"]': {
			left: 0,
			right: 0,
			bottom: 0,
			marginTop: theme.spacing[10],
			maxHeight: '80vh',
			borderTopLeftRadius: theme.borderRadius.lg,
			borderTopRightRadius: theme.borderRadius.lg,
			borderTop: `1px solid ${theme.colors.border}`,
		},

		// Right direction
		'&[data-vaul-drawer-direction="right"]': {
			top: 0,
			bottom: 0,
			right: 0,
			width: '75%',
			borderLeft: `1px solid ${theme.colors.border}`,
			'@media': {
				'(min-width: 640px)': {
					maxWidth: '24rem',
				},
			},
		},

		// Left direction
		'&[data-vaul-drawer-direction="left"]': {
			top: 0,
			bottom: 0,
			left: 0,
			width: '75%',
			borderRight: `1px solid ${theme.colors.border}`,
			'@media': {
				'(min-width: 640px)': {
					maxWidth: '24rem',
				},
			},
		},
	},
});

export const dragHandle = style({
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: theme.spacing[4],
	height: theme.spacing[2],
	width: '100px',
	flexShrink: 0,
	borderRadius: '9999px',
	backgroundColor: theme.colors.background.element,
	display: 'none',

	selectors: {
		'.group\\/drawer-content[data-vaul-drawer-direction="bottom"] &': {
			display: 'block',
		},
	},
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[1],
	padding: theme.spacing[4],

	selectors: {
		'.group\\/drawer-content[data-vaul-drawer-direction="bottom"] &, .group\\/drawer-content[data-vaul-drawer-direction="top"] &':
			{
				textAlign: 'center',
			},
	},

	'@media': {
		'(min-width: 768px)': {
			gap: theme.spacing[4],
			textAlign: 'left',
		},
	},
});

export const footer = style({
	marginTop: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
	padding: theme.spacing[4],
});

export const title = style({
	color: theme.colors.text.primary,
	fontWeight: theme.fontWeight.semibold,
	margin: 0,
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	margin: 0,
});
