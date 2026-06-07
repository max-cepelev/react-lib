import {
	globalStyle,
	keyframes,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type {
	SidebarMenuButtonSize,
	SidebarMenuButtonVariant,
	SidebarMenuSubButtonSize,
} from './types';

const mobileBreakpoint = '768px';
const sidebarAccent = theme.colors.background.elementHover;
const sidebarBorder = theme.colors.border;
const sidebarForeground = theme.colors.text.primary;
const sidebarMutedForeground = theme.colors.text.secondary;
const sidebarRing = `color-mix(in oklch, ${theme.colors.primary} 70%, transparent)`;

const pulse = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.5 },
});

export const wrapper = style({
	display: 'flex',
	minHeight: '100svh',
	width: '100%',
	selectors: {
		'&:has([data-variant="inset"])': {
			backgroundColor: theme.colors.background.sidebar,
		},
	},
});

export const desktopSidebar = style({
	display: 'none',
	color: sidebarForeground,
	'@media': {
		[`(min-width: ${mobileBreakpoint})`]: {
			display: 'block',
		},
	},
});

globalStyle(`${wrapper}:has(${desktopSidebar}[data-side="right"])`, {
	flexDirection: 'row-reverse',
});

export const gap = style({
	position: 'relative',
	width: 'var(--sidebar-width)',
	backgroundColor: 'transparent',
	transition: 'width 200ms linear',
});

globalStyle(`${desktopSidebar}[data-collapsible="offcanvas"] ${gap}`, {
	width: 0,
});

globalStyle(`${desktopSidebar}[data-side="right"] ${gap}`, {
	transform: 'rotate(180deg)',
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${gap}`, {
	width: 'var(--sidebar-width-icon)',
});

globalStyle(
	`${desktopSidebar}[data-collapsible="icon"][data-variant="floating"] ${gap}, ${desktopSidebar}[data-collapsible="icon"][data-variant="inset"] ${gap}`,
	{
		width: `calc(var(--sidebar-width-icon) + ${theme.spacing[4]})`,
	},
);

export const container = style({
	position: 'fixed',
	top: 0,
	bottom: 0,
	zIndex: 10,
	display: 'none',
	height: '100svh',
	width: 'var(--sidebar-width)',
	transition: 'left 200ms linear, right 200ms linear, width 200ms linear',
	'@media': {
		[`(min-width: ${mobileBreakpoint})`]: {
			display: 'flex',
		},
	},
});

globalStyle(`${desktopSidebar}[data-side="left"] ${container}`, {
	left: 0,
});

globalStyle(
	`${desktopSidebar}[data-side="left"][data-collapsible="offcanvas"] ${container}`,
	{
		left: 'calc(var(--sidebar-width) * -1)',
	},
);

globalStyle(`${desktopSidebar}[data-side="right"] ${container}`, {
	right: 0,
});

globalStyle(
	`${desktopSidebar}[data-side="right"][data-collapsible="offcanvas"] ${container}`,
	{
		right: 'calc(var(--sidebar-width) * -1)',
	},
);

globalStyle(
	`${desktopSidebar}[data-variant="floating"] ${container}, ${desktopSidebar}[data-variant="inset"] ${container}`,
	{
		padding: theme.spacing[2],
	},
);

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${container}`, {
	width: 'var(--sidebar-width-icon)',
});

globalStyle(
	`${desktopSidebar}[data-collapsible="icon"][data-variant="floating"] ${container}, ${desktopSidebar}[data-collapsible="icon"][data-variant="inset"] ${container}`,
	{
		width: `calc(var(--sidebar-width-icon) + ${theme.spacing[4]} + 2px)`,
	},
);

globalStyle(
	`${desktopSidebar}[data-side="left"][data-variant="sidebar"] ${container}`,
	{
		borderRight: `1px solid ${sidebarBorder}`,
	},
);

globalStyle(
	`${desktopSidebar}[data-side="right"][data-variant="sidebar"] ${container}`,
	{
		borderLeft: `1px solid ${sidebarBorder}`,
	},
);

export const staticSidebar = style({
	display: 'flex',
	height: '100%',
	width: 'var(--sidebar-width)',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.sidebar,
	color: sidebarForeground,
});

export const inner = style({
	display: 'flex',
	height: '100%',
	width: '100%',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.sidebar,
});

globalStyle(`${desktopSidebar}[data-variant="floating"] ${inner}`, {
	border: `1px solid ${sidebarBorder}`,
	borderRadius: theme.borderRadius.lg,
	boxShadow: theme.elevation[1],
});

export const mobileContent = style({
	width: 'var(--sidebar-width)',
	maxWidth: 'none',
	gap: 0,
	padding: 0,
	backgroundColor: theme.colors.background.sidebar,
	color: sidebarForeground,
});

export const mobileInner = style({
	display: 'flex',
	height: '100%',
	width: '100%',
	flexDirection: 'column',
});

export const visuallyHidden = style({
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

export const trigger = style({
	width: '1.75rem',
	height: '1.75rem',
});

export const rail = style({
	position: 'absolute',
	top: 0,
	bottom: 0,
	zIndex: 20,
	display: 'none',
	width: theme.spacing[4],
	transform: 'translateX(-50%)',
	border: 0,
	backgroundColor: 'transparent',
	padding: 0,
	transition: 'background-color 150ms linear, transform 150ms linear',
	selectors: {
		'&::after': {
			content: '',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: '50%',
			width: '2px',
		},
		'&:hover::after': {
			backgroundColor: sidebarBorder,
		},
	},
	'@media': {
		'(min-width: 640px)': {
			display: 'flex',
		},
	},
});

globalStyle(`${desktopSidebar}[data-side="left"] ${rail}`, {
	right: `calc(-1 * ${theme.spacing[4]})`,
	cursor: 'w-resize',
});

globalStyle(`${desktopSidebar}[data-side="right"] ${rail}`, {
	left: 0,
	cursor: 'e-resize',
});

globalStyle(
	`${desktopSidebar}[data-side="left"][data-state="collapsed"] ${rail}`,
	{
		cursor: 'e-resize',
	},
);

globalStyle(
	`${desktopSidebar}[data-side="right"][data-state="collapsed"] ${rail}`,
	{
		cursor: 'w-resize',
	},
);

globalStyle(`${desktopSidebar}[data-collapsible="offcanvas"] ${rail}`, {
	transform: 'translateX(0)',
});

globalStyle(`${desktopSidebar}[data-collapsible="offcanvas"] ${rail}::after`, {
	left: '100%',
});

globalStyle(`${desktopSidebar}[data-collapsible="offcanvas"] ${rail}:hover`, {
	backgroundColor: theme.colors.background.sidebar,
});

globalStyle(
	`${desktopSidebar}[data-side="left"][data-collapsible="offcanvas"] ${rail}`,
	{
		right: `calc(-1 * ${theme.spacing[2]})`,
	},
);

globalStyle(
	`${desktopSidebar}[data-side="right"][data-collapsible="offcanvas"] ${rail}`,
	{
		left: `calc(-1 * ${theme.spacing[2]})`,
	},
);

export const inset = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	flex: 1,
	flexDirection: 'column',
	backgroundColor: theme.colors.background.paper,
});

globalStyle(`${desktopSidebar}[data-variant="inset"] + ${inset}`, {
	'@media': {
		[`(min-width: ${mobileBreakpoint})`]: {
			margin: theme.spacing[2],
			marginLeft: 0,
			borderRadius: theme.borderRadius.lg,
			boxShadow: theme.elevation[1],
		},
	},
});

globalStyle(
	`${desktopSidebar}[data-variant="inset"][data-state="collapsed"] + ${inset}`,
	{
		'@media': {
			[`(min-width: ${mobileBreakpoint})`]: {
				marginLeft: theme.spacing[2],
			},
		},
	},
);

export const input = style({
	height: theme.spacing[8],
	width: '100%',
	boxShadow: 'none',
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
	padding: theme.spacing[2],
});

export const footer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
	padding: theme.spacing[2],
});

export const separator = style({
	flexShrink: 0,
	width: 'auto',
	height: '1px',
	margin: `0 ${theme.spacing[2]}`,
	backgroundColor: sidebarBorder,
});

export const content = style({
	display: 'flex',
	minHeight: 0,
	flex: 1,
	flexDirection: 'column',
	gap: theme.spacing[2],
	overflow: 'auto',
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${content}`, {
	overflow: 'hidden',
});

export const group = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	minWidth: 0,
	flexDirection: 'column',
	padding: theme.spacing[2],
});

export const groupLabel = style({
	display: 'flex',
	height: theme.spacing[8],
	flexShrink: 0,
	alignItems: 'center',
	borderRadius: theme.borderRadius.md,
	padding: `0 ${theme.spacing[2]}`,
	color: sidebarMutedForeground,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.medium,
	outline: 'none',
	transition: 'margin 200ms linear, opacity 200ms linear',
	selectors: {
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${sidebarRing}`,
		},
	},
});

globalStyle(`${groupLabel} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${groupLabel}`, {
	marginTop: `calc(-1 * ${theme.spacing[8]})`,
	opacity: 0,
});

export const groupAction = style({
	position: 'absolute',
	top: '0.875rem',
	right: theme.spacing[3],
	display: 'flex',
	aspectRatio: '1',
	width: theme.spacing[5],
	alignItems: 'center',
	justifyContent: 'center',
	border: 0,
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
	padding: 0,
	color: sidebarForeground,
	outline: 'none',
	transition:
		'background-color 150ms ease, color 150ms ease, transform 150ms ease',
	selectors: {
		'&::after': {
			content: '',
			position: 'absolute',
			inset: `calc(-1 * ${theme.spacing[2]})`,
		},
		'&:hover': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${sidebarRing}`,
		},
	},
	'@media': {
		[`(min-width: ${mobileBreakpoint})`]: {
			selectors: {
				'&::after': {
					display: 'none',
				},
			},
		},
	},
});

globalStyle(`${groupAction} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${groupAction}`, {
	display: 'none',
});

export const groupContent = style({
	width: '100%',
	fontSize: theme.fontSize.sm,
});

export const menu = style({
	display: 'flex',
	width: '100%',
	minWidth: 0,
	flexDirection: 'column',
	gap: theme.spacing[1],
	margin: 0,
	padding: 0,
	listStyle: 'none',
});

export const menuItem = style({
	position: 'relative',
});

export const menuButton = style({
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	gap: theme.spacing[2],
	overflow: 'hidden',
	border: 0,
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
	padding: theme.spacing[2],
	color: sidebarForeground,
	fontFamily: 'inherit',
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.none,
	textAlign: 'left',
	textDecoration: 'none',
	outline: 'none',
	transition:
		'width 200ms linear, height 200ms linear, padding 200ms linear, background-color 150ms ease, color 150ms ease',
	userSelect: 'none',
	cursor: 'pointer',
	selectors: {
		'&:hover': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${sidebarRing}`,
		},
		'&:active': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
		'&:disabled, &[aria-disabled="true"]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-active="true"]': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
			fontWeight: theme.fontWeight.medium,
		},
		'&[data-state="open"]:hover': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
	},
});

export const menuButtonVariants = styleVariants<
	Record<SidebarMenuButtonVariant, object>
>({
	default: {},
	outline: {
		backgroundColor: theme.colors.background.paper,
		boxShadow: `0 0 0 1px ${sidebarBorder}`,
		selectors: {
			'&:hover': {
				backgroundColor: sidebarAccent,
				boxShadow: `0 0 0 1px ${sidebarAccent}`,
			},
		},
	},
});

export const menuButtonSizes = styleVariants<
	Record<SidebarMenuButtonSize, object>
>({
	default: {
		height: theme.spacing[8],
		fontSize: theme.fontSize.sm,
	},
	sm: {
		height: '1.75rem',
		fontSize: theme.fontSize.xs,
	},
	lg: {
		height: theme.spacing[12],
		fontSize: theme.fontSize.sm,
	},
});

globalStyle(`${menuItem}:has([data-sidebar="menu-action"]) ${menuButton}`, {
	paddingRight: theme.spacing[8],
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${menuButton}`, {
	width: theme.spacing[8],
	height: theme.spacing[8],
	padding: theme.spacing[2],
});

globalStyle(
	`${desktopSidebar}[data-collapsible="icon"] ${menuButton}[data-size="lg"]`,
	{
		padding: 0,
	},
);

globalStyle(`${menuButton} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

globalStyle(`${menuButton} span:last-child`, {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const menuAction = style({
	position: 'absolute',
	top: '0.375rem',
	right: theme.spacing[1],
	display: 'flex',
	aspectRatio: '1',
	width: theme.spacing[5],
	alignItems: 'center',
	justifyContent: 'center',
	border: 0,
	borderRadius: theme.borderRadius.md,
	backgroundColor: 'transparent',
	padding: 0,
	color: sidebarForeground,
	outline: 'none',
	transition:
		'opacity 150ms ease, background-color 150ms ease, color 150ms ease, transform 150ms ease',
	cursor: 'pointer',
	selectors: {
		'&::after': {
			content: '',
			position: 'absolute',
			inset: `calc(-1 * ${theme.spacing[2]})`,
		},
		'&:hover': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${sidebarRing}`,
		},
	},
	'@media': {
		[`(min-width: ${mobileBreakpoint})`]: {
			selectors: {
				'&::after': {
					display: 'none',
				},
			},
		},
	},
});

globalStyle(`${menuAction} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
});

globalStyle(`${menuButton}:hover ~ ${menuAction}`, {
	color: sidebarForeground,
});

globalStyle(`${menuButton}[data-size="sm"] ~ ${menuAction}`, {
	top: theme.spacing[1],
});

globalStyle(`${menuButton}[data-size="default"] ~ ${menuAction}`, {
	top: '0.375rem',
});

globalStyle(`${menuButton}[data-size="lg"] ~ ${menuAction}`, {
	top: '0.625rem',
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${menuAction}`, {
	display: 'none',
});

globalStyle(`${menuAction}[data-show-on-hover="true"]`, {
	'@media': {
		[`(min-width: ${mobileBreakpoint})`]: {
			opacity: 0,
		},
	},
});

globalStyle(
	`${menuItem}:hover ${menuAction}[data-show-on-hover="true"], ${menuItem}:focus-within ${menuAction}[data-show-on-hover="true"], ${menuButton}[data-active="true"] ~ ${menuAction}[data-show-on-hover="true"], ${menuAction}[data-state="open"]`,
	{
		opacity: 1,
	},
);

export const menuBadge = style({
	pointerEvents: 'none',
	position: 'absolute',
	right: theme.spacing[1],
	display: 'flex',
	height: theme.spacing[5],
	minWidth: theme.spacing[5],
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.borderRadius.md,
	padding: `0 ${theme.spacing[1]}`,
	color: sidebarForeground,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.medium,
	fontVariantNumeric: 'tabular-nums',
	userSelect: 'none',
});

globalStyle(`${menuButton}:hover ~ ${menuBadge}`, {
	color: sidebarForeground,
});

globalStyle(`${menuButton}[data-active="true"] ~ ${menuBadge}`, {
	color: sidebarForeground,
});

globalStyle(`${menuButton}[data-size="sm"] ~ ${menuBadge}`, {
	top: theme.spacing[1],
});

globalStyle(`${menuButton}[data-size="default"] ~ ${menuBadge}`, {
	top: '0.375rem',
});

globalStyle(`${menuButton}[data-size="lg"] ~ ${menuBadge}`, {
	top: '0.625rem',
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${menuBadge}`, {
	display: 'none',
});

export const menuSkeleton = style({
	display: 'flex',
	height: theme.spacing[8],
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.md,
	padding: `0 ${theme.spacing[2]}`,
});

export const skeleton = style({
	borderRadius: theme.borderRadius.md,
	backgroundColor: theme.colors.background.element,
	animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const skeletonIcon = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const skeletonText = style({
	height: theme.spacing[4],
	maxWidth: 'var(--skeleton-width)',
	flex: 1,
});

export const menuSub = style({
	display: 'flex',
	minWidth: 0,
	flexDirection: 'column',
	gap: theme.spacing[1],
	margin: '0 14px',
	padding: '2px 10px',
	borderLeft: `1px solid ${sidebarBorder}`,
	listStyle: 'none',
	transform: 'translateX(1px)',
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${menuSub}`, {
	display: 'none',
});

export const menuSubItem = style({
	position: 'relative',
});

export const menuSubButton = style({
	display: 'flex',
	height: '1.75rem',
	minWidth: 0,
	alignItems: 'center',
	gap: theme.spacing[2],
	overflow: 'hidden',
	borderRadius: theme.borderRadius.md,
	padding: `0 ${theme.spacing[2]}`,
	color: sidebarForeground,
	lineHeight: theme.lineHeight.none,
	textDecoration: 'none',
	outline: 'none',
	transform: 'translateX(-1px)',
	transition: 'background-color 150ms ease, color 150ms ease',
	selectors: {
		'&:hover': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${sidebarRing}`,
		},
		'&:active': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
		'&:disabled, &[aria-disabled="true"]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-active="true"]': {
			backgroundColor: sidebarAccent,
			color: sidebarForeground,
		},
	},
});

export const menuSubButtonSizes = styleVariants<
	Record<SidebarMenuSubButtonSize, object>
>({
	sm: {
		fontSize: theme.fontSize.xs,
	},
	md: {
		fontSize: theme.fontSize.sm,
	},
});

globalStyle(`${menuSubButton} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
	color: sidebarForeground,
});

globalStyle(`${menuSubButton} span:last-child`, {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

globalStyle(`${desktopSidebar}[data-collapsible="icon"] ${menuSubButton}`, {
	display: 'none',
});
