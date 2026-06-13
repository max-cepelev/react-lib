import type { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import type { useRender } from '@base-ui/react/use-render';
import type { ButtonProps } from '../Button';
import type { InputProps } from '../Input';
import type { TooltipProps } from '../Tooltip';

export type SidebarState = 'expanded' | 'collapsed';
export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';
export type SidebarMenuButtonVariant = 'default' | 'outline';
export type SidebarMenuButtonSize = 'medium' | 'small' | 'large';
export type SidebarMenuSubButtonSize = 'small' | 'medium';

export type SidebarContextValue = {
	state: SidebarState;
	open: boolean;
	setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

export type SidebarTooltip =
	| string
	| (Omit<TooltipProps, 'children' | 'content' | 'text'> & {
			children?: React.ReactNode;
	  });

export namespace SidebarProps {
	export type Provider = React.ComponentProps<'div'> & {
		defaultOpen?: boolean;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

	export type Root = React.ComponentProps<'div'> & {
		side?: SidebarSide;
		variant?: SidebarVariant;
		collapsible?: SidebarCollapsible;
	};

	export type Trigger = ButtonProps;
	export type Rail = React.ComponentProps<'button'>;
	export type Inset = React.ComponentProps<'main'>;
	export type Input = InputProps;
	export type Header = React.ComponentProps<'div'>;
	export type Footer = React.ComponentProps<'div'>;
	export type Separator = SeparatorPrimitive.Props;
	export type Content = React.ComponentProps<'div'>;
	export type Group = React.ComponentProps<'div'>;
	export type GroupLabel = useRender.ComponentProps<'div'>;
	export type GroupAction = useRender.ComponentProps<'button'>;
	export type GroupContent = React.ComponentProps<'div'>;
	export type Menu = React.ComponentProps<'ul'>;
	export type MenuItem = React.ComponentProps<'li'>;
	export type MenuButton = useRender.ComponentProps<'button'> & {
		isActive?: boolean;
		variant?: SidebarMenuButtonVariant;
		size?: SidebarMenuButtonSize;
		tooltip?: SidebarTooltip;
	};
	export type MenuAction = useRender.ComponentProps<'button'> & {
		showOnHover?: boolean;
	};
	export type MenuBadge = React.ComponentProps<'div'>;
	export type MenuSkeleton = React.ComponentProps<'div'> & {
		showIcon?: boolean;
	};
	export type MenuSub = React.ComponentProps<'ul'>;
	export type MenuSubItem = React.ComponentProps<'li'>;
	export type MenuSubButton = useRender.ComponentProps<'a'> & {
		size?: SidebarMenuSubButtonSize;
		isActive?: boolean;
	};
}
