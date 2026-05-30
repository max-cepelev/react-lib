'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { clsx } from 'clsx';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import * as styles from './styles.css';
import type { DropdownMenuProps } from './types';

function DropdownMenu({ ...props }: DropdownMenuProps.Root) {
	return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function Portal({ ...props }: DropdownMenuProps.Portal) {
	return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function Trigger({ ...props }: DropdownMenuProps.Trigger) {
	return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function Content({
	align = 'start',
	alignOffset = 0,
	side = 'bottom',
	sideOffset = 4,
	className,
	...props
}: DropdownMenuProps.Content) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className={styles.positioner}
			>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={clsx(styles.content, className)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

function Group({ ...props }: DropdownMenuProps.Group) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function Label({ className, inset, ...props }: DropdownMenuProps.Label) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			data-inset={inset ? '' : undefined}
			className={clsx(styles.label, className)}
			{...props}
		/>
	);
}

function Item({
	className,
	inset,
	variant = 'default',
	...props
}: DropdownMenuProps.Item) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset ? '' : undefined}
			data-variant={variant}
			className={clsx(styles.item, className)}
			{...props}
		/>
	);
}

function Sub({ ...props }: DropdownMenuProps.Sub) {
	return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function SubTrigger({
	className,
	inset,
	children,
	...props
}: DropdownMenuProps.SubTrigger) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset ? '' : undefined}
			className={clsx(styles.subTrigger, className)}
			{...props}
		>
			{children}
			<ChevronRightIcon className={styles.subTriggerIcon} />
		</MenuPrimitive.SubmenuTrigger>
	);
}

function SubContent({
	align = 'start',
	alignOffset = -3,
	side = 'right',
	sideOffset = 0,
	className,
	...props
}: DropdownMenuProps.Content) {
	return (
		<Content
			data-slot="dropdown-menu-sub-content"
			className={clsx(styles.subContent, className)}
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

function CheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: DropdownMenuProps.CheckboxItem) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			data-inset={inset ? '' : undefined}
			className={clsx(styles.checkboxItem, className)}
			checked={checked}
			{...props}
		>
			<span
				className={styles.itemIndicator}
				data-slot="dropdown-menu-checkbox-item-indicator"
			>
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon className={styles.icon} />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function RadioGroup({ ...props }: DropdownMenuProps.RadioGroup) {
	return (
		<MenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

function RadioItem({
	className,
	children,
	inset,
	...props
}: DropdownMenuProps.RadioItem) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-inset={inset ? '' : undefined}
			className={clsx(styles.radioItem, className)}
			{...props}
		>
			<span
				className={styles.itemIndicator}
				data-slot="dropdown-menu-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon className={styles.icon} />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function Separator({ className, ...props }: DropdownMenuProps.Separator) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={clsx(styles.separator, className)}
			{...props}
		/>
	);
}

function Shortcut({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={clsx(styles.shortcut, className)}
			{...props}
		/>
	);
}

DropdownMenu.Portal = Portal;
DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
DropdownMenu.Group = Group;
DropdownMenu.Label = Label;
DropdownMenu.Item = Item;
DropdownMenu.Sub = Sub;
DropdownMenu.SubTrigger = SubTrigger;
DropdownMenu.SubContent = SubContent;
DropdownMenu.Shortcut = Shortcut;
DropdownMenu.Separator = Separator;
DropdownMenu.RadioGroup = RadioGroup;
DropdownMenu.RadioItem = RadioItem;
DropdownMenu.CheckboxItem = CheckboxItem;

export { DropdownMenu };
