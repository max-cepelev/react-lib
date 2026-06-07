import {
	type SelectPositioner,
	Select as SelectPrimitive,
	type SelectRoot,
} from '@base-ui/react/select';
import { clsx } from 'clsx';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as styles from './styles.css';

export type SelectProps<Value = string> = Omit<
	SelectRoot.Props<Value>,
	'onValueChange'
> & {
	onValueChange?: (
		value: Value,
		eventDetails: SelectRoot.ChangeEventDetails,
	) => void;
};

const Select = <Value = string>({
	onValueChange,
	...props
}: SelectProps<Value>) => (
	<SelectPrimitive.Root
		{...props}
		onValueChange={(value, eventDetails) => {
			if (value !== null) {
				onValueChange?.(value as Value, eventDetails);
			}
		}}
	/>
);
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

export type SelectTriggerProps = SelectPrimitive.Trigger.Props & {
	size?: 'sm' | 'md' | 'lg';
};
const SelectTrigger = ({
	className,
	children,
	size = 'md',
	...props
}: SelectTriggerProps) => (
	<SelectPrimitive.Trigger
		data-slot="select-trigger"
		className={clsx(styles.trigger, styles.sizes[size], className)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon render={<ChevronDown className={styles.chevron} />} />
	</SelectPrimitive.Trigger>
);

export type ScrollUpButtonProps = SelectPrimitive.ScrollUpArrow.Props;
const SelectScrollUpButton = ({ className, ...props }: ScrollUpButtonProps) => (
	<SelectPrimitive.ScrollUpArrow
		data-slot="select-scroll-up-button"
		className={clsx(styles.scrollButton, className)}
		{...props}
	>
		<ChevronUp className={styles.icon} />
	</SelectPrimitive.ScrollUpArrow>
);

export type ScrollDownButtonProps = SelectPrimitive.ScrollDownArrow.Props;

const SelectScrollDownButton = ({
	className,
	...props
}: ScrollDownButtonProps) => (
	<SelectPrimitive.ScrollDownArrow
		data-slot="select-scroll-down-button"
		className={clsx(styles.scrollButton, className)}
		{...props}
	>
		<ChevronDown className={styles.icon} />
	</SelectPrimitive.ScrollDownArrow>
);

export type SelectContentProps = SelectPrimitive.Popup.Props &
	Pick<
		SelectPositioner.Props,
		'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
	> & {
		position?: 'popper' | 'item-aligned';
	};

const SelectContent = ({
	className,
	children,
	side = 'bottom',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	alignItemWithTrigger,
	position = 'popper',
	...props
}: SelectContentProps) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Positioner
			side={side}
			sideOffset={sideOffset}
			align={align}
			alignOffset={alignOffset}
			alignItemWithTrigger={alignItemWithTrigger ?? position === 'item-aligned'}
			className={styles.positioner}
		>
			<SelectPrimitive.Popup
				data-slot="select-content"
				className={clsx(styles.content, className)}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.List className={styles.viewport}>
					{children}
				</SelectPrimitive.List>
				<SelectScrollDownButton />
			</SelectPrimitive.Popup>
		</SelectPrimitive.Positioner>
	</SelectPrimitive.Portal>
);

export type SelectLabelProps = SelectPrimitive.GroupLabel.Props;
const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
	<SelectPrimitive.GroupLabel
		data-slot="select-label"
		className={clsx(styles.label, className)}
		{...props}
	/>
);

export type SelectItemProps = SelectPrimitive.Item.Props;
const SelectItem = ({ className, children, ...props }: SelectItemProps) => (
	<SelectPrimitive.Item
		data-slot="select-item"
		className={clsx(styles.item, className)}
		{...props}
	>
		<SelectPrimitive.ItemIndicator className={styles.itemIndicatorWrapper}>
			<Check className={styles.icon} />
		</SelectPrimitive.ItemIndicator>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
);

export type SelectSeparatorProps = SelectPrimitive.Separator.Props;

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
	<SelectPrimitive.Separator
		data-slot="select-separator"
		className={clsx(styles.separator, className)}
		{...props}
	/>
);

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
