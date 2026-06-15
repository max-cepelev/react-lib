import type { Combobox } from '@base-ui/react/combobox';
import type { Separator } from '@base-ui/react/separator';

export namespace ComboboxProps {
	export type Root<
		Value = unknown,
		Multiple extends boolean | undefined = false,
	> = Combobox.Root.Props<Value, Multiple>;

	export type Value = Combobox.Value.Props;

	export type Trigger = Combobox.Trigger.Props;

	export type Clear = Combobox.Clear.Props;

	export type Input = Combobox.Input.Props & {
		showTrigger?: boolean;
		showClear?: boolean;
		error?: boolean;
		helperText?: React.ReactNode;
	};

	export type Content = Combobox.Popup.Props &
		Pick<
			Combobox.Positioner.Props,
			'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
		>;

	export type List = Combobox.List.Props;

	export type Item = Combobox.Item.Props;

	export type Group = Combobox.Group.Props;

	export type Label = Combobox.GroupLabel.Props;

	export type Collection = Combobox.Collection.Props;

	export type Empty = Combobox.Empty.Props;

	export type Separator = Separator.Props;

	export type Chips = Combobox.Chips.Props;

	export type Chip = Combobox.Chip.Props & {
		showRemove?: boolean;
	};

	export type ChipsInput = Combobox.Input.Props & {
		error?: boolean;
		helperText?: React.ReactNode;
	};
}
