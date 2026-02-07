import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapperClass = style({
	position: 'relative',
	display: 'grid',
	placeItems: 'center',
	transition: 'width 0.2s ease',
	zIndex: 2,
});

export const triggerClass = style(
	{
		position: 'fixed',
		height: '100%',
		top: 0,
		left: 0,
		width: theme.spacing[5],
	},
	'SidebarTrigger',
);

export const rootClass = style(
	{
		height: '100%',
		display: 'grid',
		borderRight: `1px solid ${theme.colors.border}`,
		gridTemplateRows: 'auto 1fr auto',
		gridTemplateAreas: `
			'header'
			'content'
			'footer'
		`,
		overflow: 'hidden auto',
		backgroundColor: theme.colors.background.sidebar,
		transition:
			'transform 0.2s ease, background-color 0.2s ease, height 0.2s ease',
	},
	'SidebarContainer',
);

export const unpinnedClass = style({
	transform: 'translateX(-100%)',
	backgroundColor: theme.colors.background.paper,
	border: `1px solid ${theme.colors.border}`,
	borderLeft: 'none',
	borderTopRightRadius: theme.borderRadius.md,
	borderBottomRightRadius: theme.borderRadius.md,
	height: '80%',
	boxShadow: theme.elevation[1],
	':hover': {
		transform: 'translateX(0)',
	},
});

globalStyle(`${triggerClass}:hover ~ ${rootClass}`, {
	transform: 'translateX(0)',
});

export const headerClass = style(
	{
		gridArea: 'header',
		width: '100%',
		padding: theme.spacing[4],
		paddingBottom: 0,
	},
	'SidebarHeader',
);

export const footerClass = style(
	{
		gridArea: 'footer',
		width: '100%',
		padding: theme.spacing[4],
		paddingTop: 0,
	},
	'SidebarFooter',
);

export const contentClass = style(
	{
		gridArea: 'content',
		overflow: 'hidden auto',
		display: 'flex',
		flexDirection: 'column',
		rowGap: theme.spacing[2],
		padding: theme.spacing[4],
	},
	'SidebarContent',
);

// export const SidebarGroup = styled('div', {
// 	label: 'SidebarGroup',
// })`
//   padding: ${({ theme }) => theme.spacing(2)};
// `;
