'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import { clsx } from 'clsx';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import * as styles from './styles.css';
import type { SelectProps } from './types';

function Select<Value = string, Multiple extends boolean | undefined = false>({
	onValueChange,
	...props
}: SelectProps.Root<Value, Multiple>) {
	return (
		<SelectPrimitive.Root<Value, Multiple>
			data-slot="select"
			{...props}
			onValueChange={(value, eventDetails) => {
				if (value !== null) {
					onValueChange?.(value, eventDetails);
				}
			}}
		/>
	);
}

function Group({ ...props }: SelectProps.Group) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function Value({ ...props }: SelectProps.Value) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function Trigger({
	className,
	children,
	size = 'medium',
	...props
}: SelectProps.Trigger) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={clsx(styles.trigger, className)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				data-slot="select-icon"
				render={<ChevronDown className={styles.chevron} />}
			/>
		</SelectPrimitive.Trigger>
	);
}

function ScrollUpButton({ className, ...props }: SelectProps.ScrollUpButton) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={clsx(styles.scrollButton, className)}
			{...props}
		>
			<ChevronUp className={styles.icon} />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function ScrollDownButton({
	className,
	...props
}: SelectProps.ScrollDownButton) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={clsx(styles.scrollButton, className)}
			{...props}
		>
			<ChevronDown className={styles.icon} />
		</SelectPrimitive.ScrollDownArrow>
	);
}

function Content({
	className,
	children,
	side = 'bottom',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	alignItemWithTrigger,
	position = 'popper',
	...props
}: SelectProps.Content) {
	return (
		<SelectPrimitive.Portal data-slot="select-portal">
			<SelectPrimitive.Positioner
				data-slot="select-positioner"
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				alignItemWithTrigger={
					alignItemWithTrigger ?? position === 'item-aligned'
				}
				className={styles.positioner}
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					className={clsx(styles.content, className)}
					{...props}
				>
					<ScrollUpButton />
					<SelectPrimitive.List
						data-slot="select-list"
						className={styles.viewport}
					>
						{children}
					</SelectPrimitive.List>
					<ScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function Label({ className, ...props }: SelectProps.Label) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={clsx(styles.label, className)}
			{...props}
		/>
	);
}

function Item({ className, children, ...props }: SelectProps.Item) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={clsx(styles.item, className)}
			{...props}
		>
			<SelectPrimitive.ItemIndicator
				data-slot="select-item-indicator"
				className={styles.itemIndicatorWrapper}
			>
				<Check className={styles.icon} />
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemText data-slot="select-item-text">
				{children}
			</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function Separator({ className, ...props }: SelectProps.Separator) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={clsx(styles.separator, className)}
			{...props}
		/>
	);
}

Select.Trigger = Trigger;
Select.Value = Value;
Select.Content = Content;
Select.Group = Group;
Select.Label = Label;
Select.Item = Item;
Select.ScrollDownButton = ScrollDownButton;
Select.ScrollUpButton = ScrollUpButton;
Select.Separator = Separator;

export type { SelectProps };
export { Select };
