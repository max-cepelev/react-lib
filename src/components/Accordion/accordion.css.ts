import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const details = style({
	width: '100%',
	position: 'relative',
	zIndex: 1,
	padding: theme.spacing[2],
	borderRadius: theme.borderRadius.md,
});

export const summary = style({
	position: 'relative',
	cursor: 'pointer',
	display: 'grid',
	alignItems: 'center',
	userSelect: 'none',
	gridTemplateColumns: '1fr auto',
	'::marker': {
		content: '',
	},
});

export const content = style({
	overflow: 'hidden',
});

export const chevron = style({
	transition: 'transform 0.25s ease',
	// selectors: {
	// 	[`${details}[open] &`]: {
	// 		transform: 'rotate(180deg)',
	// 	},
	// },
});

export const open = style({
	// backgroundColor: theme.colors.gray[100],
	transform: 'rotate(180deg)',
});
