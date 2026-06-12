import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	gridArea: 'header',
	display: 'grid',
	gridTemplateColumns: 'auto auto 1fr auto',
	alignItems: 'center',
	gridTemplateAreas: `
		"trigger title content actions"
	`,
	padding: theme.spacing[4],
	paddingBottom: 0,
});

export const actions = style({
	gridArea: 'actions',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	columnGap: theme.spacing[2],
	paddingLeft: theme.spacing[2],
});

export const sidebarTriggerContainer = style({
	gridArea: 'trigger',
	paddingRight: theme.spacing[2],
});

export const titleContainer = style({
	gridArea: 'title',
	paddingInline: theme.spacing[2],
});

export const content = style({
	gridArea: 'content',
});
