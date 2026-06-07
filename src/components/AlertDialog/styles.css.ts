import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { spacing, theme } from '~/theme';

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
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
	isolation: 'isolate',
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
	maxWidth: '20rem',
	transform: 'translate(-50%, -50%)',
	gap: spacing(4),
	backgroundColor: theme.colors.background.paper,
	borderRadius: theme.borderRadius.lg,
	padding: spacing(4),
	boxShadow: theme.elevation[3],
	border: `1px solid color-mix(in oklch, ${theme.colors.text.primary} 10%, transparent)`,
	outline: 'none',
	transitionDuration: '100ms',

	selectors: {
		'&[data-open]': {
			animation: `${zoomIn} 100ms ease-out, ${fadeIn} 100ms ease-out`,
		},
		'&[data-closed]': {
			animation: `${zoomOut} 100ms ease-in, ${fadeOut} 100ms ease-in`,
		},
		'&[data-size="default"]': {
			maxWidth: '20rem',
		},
		'&[data-size="sm"]': {
			maxWidth: '20rem',
		},
	},

	'@media': {
		'(min-width: 640px)': {
			selectors: {
				'&[data-size="default"]': {
					maxWidth: '24rem',
				},
			},
		},
	},
});

export const header = style({
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateAreas: `
    "media title"
    "media description"
  `,
	placeItems: 'center',
	textAlign: 'center',
});

globalStyle(`${content}[data-size="default"] ${header}`, {
	'@media': {
		'(min-width: 640px)': {
			placeItems: 'start',
			textAlign: 'left',
		},
	},
});

globalStyle(
	`${content}[data-size="default"] ${header}:has([data-slot="alert-dialog-media"])`,
	{
		'@media': {
			'(min-width: 640px)': {
				gridTemplateRows: 'auto 1fr',
			},
		},
	},
);

export const footer = style({
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: spacing(2),
	marginLeft: `calc(-1 * ${theme.spacing[4]})`,
	marginBottom: `calc(-1 * ${theme.spacing[4]})`,
	marginRight: `calc(-1 * ${theme.spacing[4]})`,
	padding: spacing(2, 4),
	backgroundColor: `color-mix(in oklch, ${theme.colors.text.primary} 5%, transparent)`,
	borderTop: `1px solid ${theme.colors.border}`,
	borderBottomLeftRadius: theme.borderRadius.lg,
	borderBottomRightRadius: theme.borderRadius.lg,
});

globalStyle(`${content}[data-size="sm"] ${footer}`, {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
});

globalStyle(`${content}[data-size="default"] ${footer}`, {
	'@media': {
		'(min-width: 640px)': {
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
	},
});

export const media = style({
	display: 'inline-flex',
	gridArea: 'media',
	width: spacing(8),
	height: spacing(8),
	marginRight: spacing(4),
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.borderRadius.md,
	backgroundColor: `color-mix(in oklch, ${theme.colors.text.primary} 5%, transparent)`,
	marginBottom: spacing(2),
});

globalStyle(`${media} svg`, {
	width: '70%',
	height: '70%',
});

globalStyle(`${content}[data-size="default"] ${media}`, {
	'@media': {
		'(min-width: 640px)': {
			gridRow: 'span 2',
		},
	},
});

export const title = style({
	fontSize: theme.fontSize.base,
	fontWeight: theme.fontWeight.medium,
	marginBottom: spacing(2),
	gridArea: 'title',
});

globalStyle(
	`${content}[data-size="default"] ${title}:has(~ [data-slot="alert-dialog-media"])`,
	{
		'@media': {
			'(min-width: 640px)': {
				gridColumnStart: 2,
			},
		},
	},
);

export const description = style({
	fontSize: theme.fontSize.sm,
	color: theme.colors.text.secondary,
	textWrap: 'balance',
	gridArea: 'description',
});

globalStyle(`${description} a`, {
	textDecoration: 'underline',
	textUnderlineOffset: spacing(3),
});

globalStyle(`${description} a:hover`, {
	color: theme.colors.text.primary,
});
