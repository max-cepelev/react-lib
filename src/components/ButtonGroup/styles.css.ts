import { globalStyle, style } from '@vanilla-extract/css';
import { spacing, theme } from '~/theme';

export const root = style({
	display: 'inline-flex',
	width: 'fit-content',
	alignItems: 'stretch',
	minInlineSize: 0,
	margin: 0,
	border: 0,
	padding: 0,

	selectors: {
		'&[data-orientation="vertical"]': {
			flexDirection: 'column',
		},
		'&:has(> [data-slot="button-group"])': {
			gap: theme.spacing[2],
		},
	},
});

globalStyle(`${root} > *`, {
	position: 'relative',
});

globalStyle(`${root} > *:focus-visible`, {
	zIndex: 10,
});

globalStyle(`${root} button:not(:disabled):not([aria-disabled="true"])`, {
	transition: 'background-color 0.2s, transform 100ms ease',
});

globalStyle(
	`${root} button:not(:disabled):not([aria-disabled="true"]):active`,
	{
		transform: 'translateY(2px)',
	},
);

globalStyle(`${root} > input`, {
	flex: 1,
});

globalStyle(`${root}[data-orientation="horizontal"] > :not(:last-child)`, {
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0,
});

globalStyle(`${root}[data-orientation="horizontal"] > :not(:first-child)`, {
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0,
	borderLeftWidth: 0,
});

globalStyle(`${root}[data-orientation="vertical"] > :not(:last-child)`, {
	borderBottomRightRadius: 0,
	borderBottomLeftRadius: 0,
});

globalStyle(`${root}[data-orientation="vertical"] > :not(:first-child)`, {
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
	borderTopWidth: 0,
});

export const text = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.element,
	padding: spacing(1, 2),
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	color: theme.colors.text.primary,
	whiteSpace: 'nowrap',
});

globalStyle(`${text} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	pointerEvents: 'none',
});

export const separator = style({
	position: 'relative',
	flexShrink: 0,
	alignSelf: 'stretch',
	backgroundColor: theme.colors.border,

	selectors: {
		'&[data-orientation="horizontal"]': {
			height: '1px',
			width: 'auto',
			marginLeft: '1px',
			marginRight: '1px',
		},
		'&[data-orientation="vertical"]': {
			width: '1px',
			height: 'auto',
			marginTop: '1px',
			marginBottom: '1px',
		},
	},
});
