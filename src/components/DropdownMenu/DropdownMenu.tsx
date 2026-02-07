'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { Check, ChevronRight, Circle } from 'lucide-react';

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import * as styles from './styles.css';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({
	className,
	inset,
	children,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) => (
	<DropdownMenuPrimitive.SubTrigger
		className={clsx(styles.subTrigger, { inset }, className)}
		{...props}
	>
		{children}
		<ChevronRight className={styles.icon} />
	</DropdownMenuPrimitive.SubTrigger>
);

const DropdownMenuSubContent = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>) => (
	<DropdownMenuPrimitive.SubContent
		className={clsx(styles.subContent, className)}
		{...props}
	/>
);

const DropdownMenuContent = ({
	className,
	sideOffset = 4,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			sideOffset={sideOffset}
			className={clsx(styles.content, className)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
);

const DropdownMenuItem = ({
	className,
	inset,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean;
}) => (
	<DropdownMenuPrimitive.Item
		className={clsx(styles.item, { inset }, className)}
		{...props}
	/>
);

const DropdownMenuCheckboxItem = ({
	className,
	children,
	checked,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>) => (
	<DropdownMenuPrimitive.CheckboxItem
		className={clsx(styles.checkboxItem, className)}
		checked={checked}
		{...props}
	>
		<span className={styles.checkboxItemIndicator}>
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className={styles.icon} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioItem = ({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>) => (
	<DropdownMenuPrimitive.RadioItem
		className={clsx(styles.radioItem, className)}
		{...props}
	>
		<span className={styles.radioItemIndicator}>
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className={styles.icon} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel = ({
	className,
	inset,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean;
}) => (
	<DropdownMenuPrimitive.Label
		className={clsx(styles.label, { inset }, className)}
		{...props}
	/>
);

const DropdownMenuSeparator = ({
	className,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) => (
	<DropdownMenuPrimitive.Separator
		className={clsx(styles.separator, className)}
		{...props}
	/>
);

const DropdownMenuShortcut = ({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) => {
	return <span className={clsx(styles.shortcut, className)} {...props} />;
};

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
};
