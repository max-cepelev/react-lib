import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	gridArea: 'header',
	display: 'grid',
	gridTemplateColumns: 'auto auto 1fr auto',
	alignItems: 'center',
	gridTemplateAreas: `
		"trigger title content actions"
	`,
	padding: theme.spacing[2],
	paddingTop: theme.spacing[4],
});

globalStyle(`${root} > div`, {
	display: 'flex',
	alignItems: 'center',
});

export const actions = style({
	gridArea: 'actions',
	justifyContent: 'flex-end',
	columnGap: theme.spacing[2],
	selectors: {
		'&:not(:empty)': {
			paddingLeft: theme.spacing[2],
		},
	},
});

export const sidebarTriggerContainer = style({
	gridArea: 'trigger',
	selectors: {
		'&:not(:empty)': {
			paddingRight: theme.spacing[2],
		},
	},
});

export const titleContainer = style({
	gridArea: 'title',
	columnGap: theme.spacing[2],
	selectors: {
		'&:not(:empty)': {
			paddingRight: theme.spacing[2],
		},
	},
});

export const content = style({
	gridArea: 'content',
	columnGap: theme.spacing[2],
});
