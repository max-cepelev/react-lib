'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';
import { useIsMobile } from '~/hooks';
import { Button } from '../Button';
import { Input } from '../Input';
import { Sheet } from '../Sheet';
import { Tooltip } from '../Tooltip';
import {
	SIDEBAR_COOKIE_MAX_AGE,
	SIDEBAR_COOKIE_NAME,
	SIDEBAR_KEYBOARD_SHORTCUT,
	SIDEBAR_WIDTH,
	SIDEBAR_WIDTH_ICON,
	SIDEBAR_WIDTH_MOBILE,
} from './constants';
import * as styles from './styles.css';
import type {
	SidebarContextValue,
	SidebarProps,
	SidebarTooltip,
} from './types';

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);

	if (!context) {
		throw new Error('useSidebar must be used within a Sidebar.Provider.');
	}

	return context;
}

function Provider({
	defaultOpen = true,
	open: openProp,
	onOpenChange,
	className,
	style,
	children,
	...props
}: SidebarProps.Provider) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;

	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === 'function' ? value(open) : value;

			if (onOpenChange) {
				onOpenChange(openState);
			} else {
				_setOpen(openState);
			}

			// biome-ignore lint/suspicious/noDocumentCookie: matches the source sidebar API for persisted open state.
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[onOpenChange, open],
	);

	const toggleSidebar = React.useCallback(() => {
		if (isMobile) {
			setOpenMobile((currentOpen) => !currentOpen);
			return;
		}

		setOpen((currentOpen) => !currentOpen);
	}, [isMobile, setOpen]);

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleSidebar]);

	const state = open ? 'expanded' : 'collapsed';
	const contextValue = React.useMemo<SidebarContextValue>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, toggleSidebar],
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<div
				data-slot="sidebar-wrapper"
				style={
					{
						'--sidebar-width': SIDEBAR_WIDTH,
						'--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
						...style,
					} as React.CSSProperties
				}
				className={clsx(styles.wrapper, className)}
				{...props}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
}

function SidebarRoot({
	side = 'left',
	variant = 'sidebar',
	collapsible = 'offcanvas',
	className,
	style,
	children,
	...props
}: SidebarProps.Root) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible === 'none') {
		return (
			<div
				data-slot="sidebar"
				style={style}
				className={clsx(styles.staticSidebar, className)}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile}>
				<Sheet.Content
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					side={side}
					showCloseButton={false}
					style={
						{
							'--sidebar-width': SIDEBAR_WIDTH_MOBILE,
							...style,
						} as React.CSSProperties
					}
					className={clsx(styles.mobileContent, className)}
					{...props}
				>
					<Sheet.Header className={styles.visuallyHidden}>
						<Sheet.Title>Sidebar</Sheet.Title>
						<Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
					</Sheet.Header>
					<div className={styles.mobileInner}>{children}</div>
				</Sheet.Content>
			</Sheet>
		);
	}

	return (
		<aside
			data-state={state}
			data-collapsible={state === 'collapsed' ? collapsible : undefined}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
			className={styles.desktopSidebar}
		>
			<div data-slot="sidebar-gap" className={styles.gap} />
			<div
				data-slot="sidebar-container"
				className={clsx(styles.container, className)}
				style={style}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className={styles.inner}
				>
					{children}
				</div>
			</div>
		</aside>
	);
}

function Trigger({
	className,
	onClick,
	children,
	...props
}: SidebarProps.Trigger) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon"
			className={clsx(styles.trigger, className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			{children ?? (
				<>
					<PanelLeftIcon size={16} />
					<span className={styles.visuallyHidden}>Toggle Sidebar</span>
				</>
			)}
		</Button>
	);
}

function Rail({ className, ...props }: SidebarProps.Rail) {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			type="button"
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			title="Toggle Sidebar"
			className={clsx(styles.rail, className)}
			onClick={toggleSidebar}
			{...props}
		/>
	);
}

function Inset({ className, ...props }: SidebarProps.Inset) {
	return (
		<main
			data-slot="sidebar-inset"
			className={clsx(styles.inset, className)}
			{...props}
		/>
	);
}

function SidebarInput({ className, ...props }: SidebarProps.Input) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={clsx(styles.input, className)}
			{...props}
		/>
	);
}

function Header({ className, ...props }: SidebarProps.Header) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={clsx(styles.header, className)}
			{...props}
		/>
	);
}

function Footer({ className, ...props }: SidebarProps.Footer) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={clsx(styles.footer, className)}
			{...props}
		/>
	);
}

function Separator({
	className,
	orientation = 'horizontal',
	...props
}: SidebarProps.Separator) {
	return (
		<SeparatorPrimitive
			data-slot="sidebar-separator"
			data-sidebar="separator"
			orientation={orientation}
			className={clsx(styles.separator, className)}
			{...props}
		/>
	);
}

function Content({ className, ...props }: SidebarProps.Content) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={clsx(styles.content, className)}
			{...props}
		/>
	);
}

function Group({ className, ...props }: SidebarProps.Group) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={clsx(styles.group, className)}
			{...props}
		/>
	);
}

function GroupLabel({ className, render, ...props }: SidebarProps.GroupLabel) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: mergeProps<'div'>(
			{
				'data-slot': 'sidebar-group-label',
				'data-sidebar': 'group-label',
				className: clsx(styles.groupLabel, className),
			} as React.ComponentProps<'div'>,
			props,
		),
	});
}

function GroupAction({
	className,
	render,
	...props
}: SidebarProps.GroupAction) {
	return useRender({
		defaultTagName: 'button',
		render,
		props: mergeProps<'button'>(
			{
				type: 'button',
				'data-slot': 'sidebar-group-action',
				'data-sidebar': 'group-action',
				className: clsx(styles.groupAction, className),
			} as React.ComponentProps<'button'>,
			props,
		),
	});
}

function GroupContent({ className, ...props }: SidebarProps.GroupContent) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={clsx(styles.groupContent, className)}
			{...props}
		/>
	);
}

function Menu({ className, ...props }: SidebarProps.Menu) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={clsx(styles.menu, className)}
			{...props}
		/>
	);
}

function MenuItem({ className, ...props }: SidebarProps.MenuItem) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={clsx(styles.menuItem, className)}
			{...props}
		/>
	);
}

function getTooltipProps(tooltip: SidebarTooltip) {
	if (typeof tooltip === 'string') {
		return { text: tooltip };
	}

	const { children, ...props } = tooltip;
	return {
		content: children,
		...props,
	};
}

function MenuButton({
	isActive = false,
	variant = 'default',
	size = 'medium',
	tooltip,
	className,
	render,
	...props
}: SidebarProps.MenuButton) {
	const { isMobile, state } = useSidebar();
	const button = useRender({
		defaultTagName: 'button',
		render,
		props: mergeProps<'button'>(
			{
				type: 'button',
				'data-slot': 'sidebar-menu-button',
				'data-sidebar': 'menu-button',
				'data-size': size,
				'data-active': isActive ? 'true' : 'false',
				className: clsx(
					styles.menuButton,
					styles.menuButtonVariants[variant],
					styles.menuButtonSizes[size],
					className,
				),
			} as React.ComponentProps<'button'>,
			props,
		),
	});

	if (!tooltip || state !== 'collapsed' || isMobile) {
		return button;
	}

	return (
		<Tooltip side="right" {...getTooltipProps(tooltip)}>
			{button}
		</Tooltip>
	);
}

function MenuAction({
	className,
	showOnHover = false,
	render,
	...props
}: SidebarProps.MenuAction) {
	return useRender({
		defaultTagName: 'button',
		render,
		props: mergeProps<'button'>(
			{
				type: 'button',
				'data-slot': 'sidebar-menu-action',
				'data-sidebar': 'menu-action',
				'data-show-on-hover': showOnHover ? 'true' : undefined,
				className: clsx(styles.menuAction, className),
			} as React.ComponentProps<'button'>,
			props,
		),
	});
}

function MenuBadge({ className, ...props }: SidebarProps.MenuBadge) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={clsx(styles.menuBadge, className)}
			{...props}
		/>
	);
}

function MenuSkeleton({
	className,
	showIcon = false,
	...props
}: SidebarProps.MenuSkeleton) {
	const width = React.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={clsx(styles.menuSkeleton, className)}
			{...props}
		>
			{showIcon && (
				<div
					className={clsx(styles.skeleton, styles.skeletonIcon)}
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<div
				className={clsx(styles.skeleton, styles.skeletonText)}
				data-sidebar="menu-skeleton-text"
				style={
					{
						'--skeleton-width': width,
					} as React.CSSProperties
				}
			/>
		</div>
	);
}

function MenuSub({ className, ...props }: SidebarProps.MenuSub) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={clsx(styles.menuSub, className)}
			{...props}
		/>
	);
}

function MenuSubItem({ className, ...props }: SidebarProps.MenuSubItem) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={clsx(styles.menuSubItem, className)}
			{...props}
		/>
	);
}

function MenuSubButton({
	size = 'medium',
	isActive = false,
	className,
	render,
	...props
}: SidebarProps.MenuSubButton) {
	return useRender({
		defaultTagName: 'a',
		render,
		props: mergeProps<'a'>(
			{
				'data-slot': 'sidebar-menu-sub-button',
				'data-sidebar': 'menu-sub-button',
				'data-size': size,
				'data-active': isActive ? 'true' : 'false',
				className: clsx(
					styles.menuSubButton,
					styles.menuSubButtonSizes[size],
					className,
				),
			} as React.ComponentProps<'a'>,
			props,
		),
	});
}

const Sidebar = Object.assign(SidebarRoot, {
	Provider,
	Trigger,
	Rail,
	Inset,
	Input: SidebarInput,
	Header,
	Footer,
	Separator,
	Content,
	Group,
	GroupLabel,
	GroupAction,
	GroupContent,
	Menu,
	MenuItem,
	MenuButton,
	MenuAction,
	MenuBadge,
	MenuSkeleton,
	MenuSub,
	MenuSubItem,
	MenuSubButton,
});

export { Sidebar, useSidebar };
