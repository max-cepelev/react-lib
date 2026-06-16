'use client';

import { stringifyAsLabel } from '@base-ui/react/internals/resolveValueLabel';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { clsx } from 'clsx';
import { Check, ChevronDown, ChevronUp, XIcon } from 'lucide-react';
import type { PointerEvent } from 'react';

import * as styles from './styles.css';
import type { SelectProps } from './types';
import {
	getValueKey,
	SelectContext,
	useChipsValueLogic,
	useRootLogic,
	useSelectContext,
} from './useLogic';

function Select<Value = string, Multiple extends boolean | undefined = false>({
	defaultValue,
	disabled = false,
	isItemEqualToValue,
	itemToStringLabel,
	items,
	multiple,
	onValueChange,
	value: valueProp,
	...props
}: SelectProps.Root<Value, Multiple>) {
	const { contextValue, handleValueChange, value } = useRootLogic({
		defaultValue,
		disabled,
		isItemEqualToValue,
		itemToStringLabel,
		items,
		multiple,
		onValueChange,
		value: valueProp,
	} as SelectProps.Root<Value, Multiple>);

	return (
		<SelectContext.Provider value={contextValue}>
			<SelectPrimitive.Root<Value, Multiple>
				data-slot="select"
				disabled={disabled}
				isItemEqualToValue={isItemEqualToValue}
				itemToStringLabel={itemToStringLabel}
				items={items}
				multiple={multiple}
				value={value as SelectProps.Root<Value, Multiple>['value']}
				{...props}
				onValueChange={(nextValue, eventDetails) => {
					if (nextValue !== null) {
						handleValueChange(nextValue, eventDetails);
					}
				}}
			/>
		</SelectContext.Provider>
	);
}

function Group({ ...props }: SelectProps.Group) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function Value({
	className,
	children,
	placeholder,
	...props
}: SelectProps.Value) {
	const context = useSelectContext();

	if (!context.multiple || children) {
		return (
			<SelectPrimitive.Value
				data-slot="select-value"
				className={clsx(styles.value, className)}
				placeholder={placeholder}
				{...props}
			>
				{children}
			</SelectPrimitive.Value>
		);
	}

	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={clsx(styles.value, className)}
			placeholder={placeholder}
			{...props}
		>
			{(selectedValue) => {
				const values = Array.isArray(selectedValue) ? selectedValue : [];

				if (values.length === 0) {
					return placeholder;
				}

				return <ChipsValue values={values} />;
			}}
		</SelectPrimitive.Value>
	);
}

function Trigger({
	className,
	children,
	render,
	size = 'medium',
	...props
}: SelectProps.Trigger) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			nativeButton={false}
			render={render ?? <div />}
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

function Chip({ count, value }: { count?: number; value?: unknown }) {
	const { disabled, getLabel, removeValue } = useSelectContext();
	const label = count ? `+${count}` : getLabel(value);
	const removeLabel = stringifyAsLabel(value);

	const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	return (
		<span className={styles.chip} data-slot="select-value-chip">
			<span className={styles.chipLabel}>{label}</span>
			{!count && (
				<button
					aria-label={`Remove ${removeLabel}`}
					className={styles.chipRemove}
					data-slot="select-value-chip-remove"
					disabled={disabled}
					onClick={(event) => removeValue(value, event)}
					onPointerDown={handlePointerDown}
					type="button"
				>
					<XIcon />
				</button>
			)}
		</span>
	);
}

function ChipsValue({ values }: { values: unknown[] }) {
	const {
		containerRef,
		getLabel,
		hiddenCount,
		measureRef,
		overflowMeasureRef,
		visibleValues,
	} = useChipsValueLogic(values);

	return (
		<span
			className={styles.chipsValue}
			data-slot="select-value-chips"
			ref={containerRef}
		>
			<span
				aria-hidden="true"
				className={styles.chipsMeasure}
				data-slot="select-value-chips-measure"
				ref={measureRef}
			>
				{values.map((value) => (
					<span
						className={styles.chip}
						data-chip-measure="chip"
						key={getValueKey(value)}
					>
						<span className={styles.chipLabel}>{getLabel(value)}</span>
						<span className={styles.chipRemove}>
							<XIcon />
						</span>
					</span>
				))}
				<span
					className={styles.chip}
					data-chip-measure="overflow"
					ref={overflowMeasureRef}
				>
					+{values.length}
				</span>
			</span>
			{visibleValues.map((value) => (
				<Chip key={getValueKey(value)} value={value} />
			))}
			{hiddenCount > 0 && <Chip count={hiddenCount} />}
		</span>
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
