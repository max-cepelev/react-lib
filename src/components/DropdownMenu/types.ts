import type { Menu } from '@base-ui/react/menu';

export namespace DropdownMenuProps {
	export type Root = Menu.Root.Props;

	export type Portal = Menu.Portal.Props;

	export type Trigger = Menu.Trigger.Props;

	export type Content = Menu.Popup.Props &
		Pick<
			Menu.Positioner.Props,
			'align' | 'alignOffset' | 'side' | 'sideOffset'
		>;
	export type Group = Menu.Group.Props;

	export type Label = Menu.GroupLabel.Props & {
		inset?: boolean;
	};

	export type Item = Menu.Item.Props & {
		inset?: boolean;
		variant?: 'default' | 'destructive';
	};

	export type Sub = Menu.SubmenuRoot.Props;

	export type SubTrigger = Menu.SubmenuTrigger.Props & {
		inset?: boolean;
	};

	export type CheckboxItem = Menu.CheckboxItem.Props & {
		inset?: boolean;
	};

	export type RadioGroup = Menu.RadioGroup.Props;

	export type RadioItem = Menu.RadioItem.Props & {
		inset?: boolean;
	};

	export type Separator = Menu.Separator.Props;
}
