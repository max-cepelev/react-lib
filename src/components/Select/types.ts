import type { Select as SelectPrimitive } from '@base-ui/react/select';

export type SelectSize = 'small' | 'medium' | 'large';

type SelectValue<
	Value,
	Multiple extends boolean | undefined,
> = Multiple extends true ? Value[] : Value;

export namespace SelectProps {
	export type Root<
		Value = string,
		Multiple extends boolean | undefined = false,
	> = Omit<SelectPrimitive.Root.Props<Value, Multiple>, 'onValueChange'> & {
		onValueChange?: (
			value: SelectValue<Value, Multiple>,
			eventDetails: SelectPrimitive.Root.ChangeEventDetails,
		) => void;
	};

	export type Trigger = SelectPrimitive.Trigger.Props & {
		size?: SelectSize;
	};

	export type ScrollUpButton = SelectPrimitive.ScrollUpArrow.Props;

	export type ScrollDownButton = SelectPrimitive.ScrollDownArrow.Props;

	export type Content = SelectPrimitive.Popup.Props &
		Pick<
			SelectPrimitive.Positioner.Props,
			'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
		> & {
			position?: 'popper' | 'item-aligned';
		};

	export type Group = SelectPrimitive.Group.Props;

	export type Value = SelectPrimitive.Value.Props;

	export type Label = SelectPrimitive.GroupLabel.Props;

	export type Item = SelectPrimitive.Item.Props;

	export type Separator = SelectPrimitive.Separator.Props;
}
