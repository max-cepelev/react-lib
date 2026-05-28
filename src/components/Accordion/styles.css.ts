import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

const accordionDown = keyframes({
	from: {
		height: '0',
	},
	to: {
		height: 'var(--accordion-panel-height)',
	},
});

const accordionUp = keyframes({
	from: {
		height: 'var(--accordion-panel-height)',
	},
	to: {
		height: '0',
	},
});

export const root = style({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
});

export const item = style({});

export const header = style({
	display: 'flex',
});

export const trigger = style({
	position: 'relative',
	display: 'flex',
	flex: 1,
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	textAlign: 'left',
	fontWeight: theme.fontWeight.medium,
	transition: 'all 0.2s ease',
	outline: 'none',
	color: theme.colors.text.primary,
	paddingBlock: theme.spacing[2],

	selectors: {
		'&:hover': {
			textDecoration: 'underline',
		},
		'&:focus-visible': {
			borderColor: theme.colors.primary,
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			inset: 0,
			borderRadius: theme.borderRadius.lg,
			opacity: 0,
			transition: 'opacity 0.2s ease',
		},
		'&:focus-visible::after': {
			opacity: 1,
		},
	},
});

export const triggerIcon = style({
	pointerEvents: 'none',
	flexShrink: 0,
	marginLeft: 'auto',
	width: spacing(4),
	height: spacing(4),
	color: theme.colors.text.secondary,
});

export const triggerIconDown = style([
	triggerIcon,
	{
		selectors: {
			'[aria-expanded="true"] &': {
				display: 'none',
			},
		},
	},
]);

export const triggerIconUp = style([
	triggerIcon,
	{
		display: 'none',
		selectors: {
			'[aria-expanded="true"] &': {
				display: 'inline-block',
			},
		},
	},
]);

export const panel = style({
	overflow: 'hidden',
	fontSize: theme.fontSize.sm,
	selectors: {
		'&[data-open]': {
			animation: `${accordionDown} 0.2s ease-out`,
		},
		'&[data-closed]': {
			animation: `${accordionUp} 0.2s ease-out`,
		},
	},
});

export const panelContent = style({
	paddingTop: 0,
	paddingBottom: theme.spacing[2],
	height: 'var(--accordion-panel-height)',

	selectors: {
		'&[data-ending-style]': {
			height: '0',
		},
		'&[data-starting-style]': {
			height: '0',
		},
	},
});

globalStyle(`${panelContent} a`, {
	textDecoration: 'underline',
	textUnderlineOffset: spacing(3),
});

globalStyle(`${panelContent} a:hover`, {
	color: theme.colors.text.primary,
});

globalStyle(`${panelContent} p:not(:last-child)`, {
	marginBottom: spacing(4),
});
