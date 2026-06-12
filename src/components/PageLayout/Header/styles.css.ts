import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	gridArea: 'header',
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	alignItems: 'center',
	gridTemplateAreas: `
		"content actions"
	`,
	padding: theme.spacing[4],
	gap: theme.spacing[2],
	paddingBottom: 0,
});

export const actions = style({
	gridArea: 'actions',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	columnGap: theme.spacing[2],
});

export const content = style({
	gridArea: 'content',
});
