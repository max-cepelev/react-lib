import { style } from '@vanilla-extract/css';
import { spacing, theme } from '~/theme';

export const root = style({
	display: 'flex',
	width: '100%',
	minWidth: 0,
	flexDirection: 'column',
	gap: theme.spacing[2],
});

export const dropzone = style({
	boxSizing: 'border-box',
	display: 'flex',
	minWidth: 0,
	margin: 0,
	flexDirection: 'column',
	justifyContent: 'center',
	gap: theme.spacing[3],
	padding: spacing(3),
	border: `1px dashed ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.paper,
	transition: 'border-color 150ms, background-color 150ms, box-shadow 150ms',

	selectors: {
		'&[data-active]': {
			borderColor: theme.colors.info,
			backgroundColor: `color-mix(in oklch, ${theme.colors.info} 6%, transparent)`,
			boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${theme.colors.info} 24%, transparent)`,
		},
		'&[data-error]': {
			borderColor: theme.colors.error,
			backgroundColor: `color-mix(in oklch, ${theme.colors.error} 4%, transparent)`,
		},
		'&[data-disabled]': {
			cursor: 'not-allowed',
			opacity: 0.6,
		},
		'&:focus-within': {
			borderColor: theme.colors.info,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.info} 16%, transparent)`,
		},
	},
});

export const input = style({
	position: 'absolute',
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	border: 0,
});

export const fileList = style({
	display: 'grid',
	minWidth: 0,
	margin: 0,
	padding: 0,
	listStyle: 'none',
	gap: theme.spacing[2],
});

export const prompt = style({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[3],
	selectors: {
		'&[data-has-files]': {
			paddingTop: theme.spacing[3],
			borderTop: `1px solid ${theme.colors.border}`,
		},
	},
});

export const promptContent = style({
	display: 'flex',
	minWidth: 0,
	flex: '1 1 auto',
	flexDirection: 'column',
	gap: theme.spacing[1],
});

export const promptText = style({
	margin: 0,
});

export const constraints = style({
	margin: 0,
});

export const uploadButton = style({
	width: theme.spacing[10],
	height: theme.spacing[10],
	backgroundColor: theme.colors.background.element,
	color: theme.colors.text.secondary,
});

export const limitNotice = style({
	margin: 0,
	padding: spacing(1, 2),
	textAlign: 'center',
});

export const helperText = style({
	margin: 0,
});
