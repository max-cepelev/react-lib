import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const appHeader = style({
	display: 'flex',
	height: theme.spacing[16],
	flexShrink: 0,
	alignItems: 'center',
	gap: theme.spacing[2],
	borderBottom: `1px solid ${theme.colors.border}`,
	transition: 'width 200ms linear, height 200ms linear',
});

globalStyle(
	`[data-slot="sidebar-wrapper"]:has([data-collapsible="icon"]) ${appHeader}`,
	{
		height: theme.spacing[12],
	},
);

export const headerInner = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	padding: `0 ${theme.spacing[4]}`,
});

export const triggerNudge = style({
	marginLeft: `calc(-1 * ${theme.spacing[1]})`,
});

export const workspaceIcon = style({
	display: 'flex',
	aspectRatio: '1',
	width: theme.spacing[8],
	height: theme.spacing[8],
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.borderRadius.lg,
	backgroundColor: theme.colors.primary,
	color: theme.colors.foreground.primary,
});

export const workspaceIconSmall = style({
	display: 'flex',
	width: theme.spacing[6],
	height: theme.spacing[6],
	alignItems: 'center',
	justifyContent: 'center',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
});

export const textStack = style({
	display: 'grid',
	flex: 1,
	textAlign: 'left',
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.tight,
});

export const titleText = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	fontWeight: theme.fontWeight.medium,
});

export const subtitleText = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.xs,
});

export const chevronAuto = style({
	marginLeft: 'auto',
});

export const dropdownWide = style({
	minWidth: '14rem',
	borderRadius: theme.borderRadius.lg,
});

export const dropdownLabelMuted = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.xs,
});

export const dropdownItemPadded = style({
	gap: theme.spacing[2],
	padding: theme.spacing[2],
});

export const dropdownUserLabel = style({
	padding: 0,
	fontWeight: theme.fontWeight.normal,
});

export const dropdownUserRow = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	padding: `${theme.spacing[1]} ${theme.spacing[1]} 0.375rem`,
	textAlign: 'left',
	fontSize: theme.fontSize.sm,
});

export const collapsibleItem = style({});

export const collapsibleChevron = style({
	marginLeft: 'auto',
	transition: 'transform 200ms ease',
});

globalStyle(`${collapsibleItem}[data-open] ${collapsibleChevron}`, {
	transform: 'rotate(90deg)',
});

export const projectsGroup = style({});

globalStyle(`[data-slot="sidebar"][data-collapsible="icon"] ${projectsGroup}`, {
	display: 'none',
});

export const mutedIcon = style({
	color: theme.colors.text.secondary,
});

export const mutedMenuButton = style({
	color: theme.colors.text.secondary,
});

export const srOnly = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	border: 0,
});

export const avatarSquare = style({
	borderRadius: theme.borderRadius.lg,
});

export const insetBody = style({
	display: 'grid',
	gap: theme.spacing[4],
	padding: theme.spacing[4],
});

export const insetPanel = style({
	minHeight: '18rem',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.paper,
});

globalStyle(`${workspaceIcon} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

globalStyle(`${workspaceIconSmall} svg`, {
	width: '0.875rem',
	height: '0.875rem',
	flexShrink: 0,
});
