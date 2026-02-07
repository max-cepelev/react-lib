import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const breadcrumbsClass = style(
	{
		gridArea: 'breadcrumbs',
		display: 'flex',
		alignItems: 'center',
		columnGap: theme.spacing[2],
	},
	'Breadcrumbs',
);

export const rootClass = style({
	gridArea: 'header',
	display: 'grid',
	gridTemplateColumns: 'auto 1fr auto',
	gridTemplateRows: 'repeat(3, auto)',
	alignItems: 'center',
	gridTemplateAreas:
		'"buttons title actions" "subtitle subtitle subtitle" ". . ."',
	padding: theme.spacing[4],
	gap: theme.spacing[2],
	paddingBottom: 0,
});

globalStyle(`${rootClass}:has(${breadcrumbsClass})`, {
	gridTemplateAreas:
		'"buttons breadcrumbs actions" "title title title" "subtitle subtitle subtitle"',
});

export const buttonsClass = style({
	gridArea: 'buttons',
	display: 'flex',
	alignItems: 'center',
	columnGap: theme.spacing[1],
});

export const actionsClass = style({
	gridArea: 'actions',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	columnGap: theme.spacing[2],
});

export const titleClass = style({
	gridArea: 'title',
	overflow: 'hidden',
	hyphens: 'auto',
	overflowWrap: 'break-word',
	textAlign: 'left',
});

export const titleContainerClass = style({
	gridArea: 'title',
	display: 'flex',
	alignItems: 'center',
	columnGap: theme.spacing[2],
});

export const subtitleClass = style({
	gridArea: 'subtitle',
	overflow: 'hidden',
	hyphens: 'auto',
	overflowWrap: 'break-word',
	textAlign: 'left',
});

export const subtitleContainerClass = style({
	gridArea: 'subtitle',
	display: 'flex',
	alignItems: 'center',
	columnGap: theme.spacing[2],
});
