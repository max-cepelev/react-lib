import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { clsx } from 'clsx';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';
import { InputGroup } from '../InputGroup';
import * as styles from './styles.css';
import type { ComboboxProps } from './types';

function Combobox<
	Value = unknown,
	Multiple extends boolean | undefined = false,
>(props: ComboboxProps.Root<Value, Multiple>) {
	return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

function Value(props: ComboboxProps.Value) {
	return <ComboboxPrimitive.Value {...props} />;
}

function Trigger({ className, children, ...props }: ComboboxProps.Trigger) {
	return (
		<ComboboxPrimitive.Trigger
			data-slot="combobox-trigger"
			className={clsx(styles.controlButton, styles.trigger, className)}
			{...props}
		>
			{children}
			<ChevronDownIcon className={styles.triggerIcon} />
		</ComboboxPrimitive.Trigger>
	);
}

function Clear({ className, children, ...props }: ComboboxProps.Clear) {
	return (
		<ComboboxPrimitive.Clear
			data-slot="combobox-clear"
			className={clsx(styles.controlButton, className)}
			{...props}
		>
			{children ?? <XIcon className={styles.clearIcon} />}
		</ComboboxPrimitive.Clear>
	);
}

function Input({
	className,
	children,
	disabled = false,
	error: _error,
	helperText: _helperText,
	showTrigger = true,
	showClear = false,
	...props
}: ComboboxProps.Input) {
	return (
		<ComboboxPrimitive.InputGroup
			render={<InputGroup className={clsx(styles.inputGroup, className)} />}
		>
			<ComboboxPrimitive.Input
				render={<InputGroup.Input disabled={disabled} />}
				disabled={disabled}
				{...props}
			/>
			<InputGroup.Addon align="inline-end">
				{showTrigger && (
					<Trigger className={styles.inputTrigger} disabled={disabled} />
				)}
				{showClear && <Clear disabled={disabled} />}
			</InputGroup.Addon>
			{children}
		</ComboboxPrimitive.InputGroup>
	);
}

function Content({
	className,
	side = 'bottom',
	sideOffset = 8,
	align = 'start',
	alignOffset = 0,
	anchor,
	...props
}: ComboboxProps.Content) {
	return (
		<ComboboxPrimitive.Portal>
			<ComboboxPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				anchor={anchor}
				className={styles.positioner}
			>
				<ComboboxPrimitive.Popup
					data-slot="combobox-content"
					data-chips={anchor ? 'true' : undefined}
					className={clsx(styles.content, className)}
					{...props}
				/>
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
}

function List({ className, ...props }: ComboboxProps.List) {
	return (
		<ComboboxPrimitive.List
			data-slot="combobox-list"
			className={clsx(styles.list, className)}
			{...props}
		/>
	);
}

function Item({ className, children, ...props }: ComboboxProps.Item) {
	return (
		<ComboboxPrimitive.Item
			data-slot="combobox-item"
			className={clsx(styles.item, className)}
			{...props}
		>
			{children}
			<ComboboxPrimitive.ItemIndicator className={styles.itemIndicator}>
				<CheckIcon />
			</ComboboxPrimitive.ItemIndicator>
		</ComboboxPrimitive.Item>
	);
}

function Group({ ...props }: ComboboxProps.Group) {
	return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}

function GroupLabel({ className, ...props }: ComboboxProps.Label) {
	return (
		<ComboboxPrimitive.GroupLabel
			data-slot="combobox-group-label"
			className={clsx(styles.groupLabel, className)}
			{...props}
		/>
	);
}

function Collection(props: ComboboxProps.Collection) {
	return <ComboboxPrimitive.Collection {...props} />;
}

function Empty({ className, ...props }: ComboboxProps.Empty) {
	return (
		<ComboboxPrimitive.Empty
			data-slot="combobox-empty"
			className={clsx(styles.empty, className)}
			{...props}
		/>
	);
}

function Separator({ className, ...props }: ComboboxProps.Separator) {
	return (
		<ComboboxPrimitive.Separator
			data-slot="combobox-separator"
			className={clsx(styles.separator, className)}
			{...props}
		/>
	);
}

function Chips({ className, ...props }: ComboboxProps.Chips) {
	return (
		<ComboboxPrimitive.Chips
			data-slot="combobox-chips"
			className={clsx(styles.chips, className)}
			{...props}
		/>
	);
}

function Chip({
	className,
	children,
	showRemove = true,
	...props
}: ComboboxProps.Chip) {
	return (
		<ComboboxPrimitive.Chip
			data-slot="combobox-chip"
			className={clsx(
				styles.chip,
				{ [styles.chipWithRemove]: showRemove },
				className,
			)}
			{...props}
		>
			{children}
			{showRemove && (
				<ComboboxPrimitive.ChipRemove
					className={clsx(
						styles.chipRemove,
						styles.chipRemoveButton,
						styles.chipRemoveSize.iconExtraSmall,
					)}
					data-slot="combobox-chip-remove"
				>
					<XIcon />
				</ComboboxPrimitive.ChipRemove>
			)}
		</ComboboxPrimitive.Chip>
	);
}

function ChipsInput({
	className,
	error: _error,
	helperText: _helperText,
	...props
}: ComboboxProps.ChipsInput) {
	return (
		<ComboboxPrimitive.Input
			data-slot="combobox-chip-input"
			className={clsx(styles.chipsInput, className)}
			{...props}
		/>
	);
}

function useComboboxAnchor() {
	return useRef<HTMLDivElement | null>(null);
}

Combobox.Value = Value;
Combobox.Trigger = Trigger;
Combobox.Clear = Clear;
Combobox.Input = Input;
Combobox.Content = Content;
Combobox.List = List;
Combobox.Item = Item;
Combobox.Group = Group;
Combobox.GroupLabel = GroupLabel;
Combobox.Collection = Collection;
Combobox.Empty = Empty;
Combobox.Separator = Separator;
Combobox.Chips = Chips;
Combobox.Chip = Chip;
Combobox.ChipsInput = ChipsInput;

export { Combobox, useComboboxAnchor };
