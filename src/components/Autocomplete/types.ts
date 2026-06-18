import type { CSSProperties, ReactNode } from 'react';
import type { ComboboxProps, ComboboxSize } from '../Combobox';

export type AutocompleteSize = ComboboxSize;

type AutocompleteBaseProps<TOption> = Omit<
	ComboboxProps.Root<TOption, boolean>,
	| 'children'
	| 'defaultValue'
	| 'isItemEqualToValue'
	| 'itemToStringLabel'
	| 'itemToStringValue'
	| 'items'
	| 'multiple'
	| 'onValueChange'
	| 'value'
> & {
	options: TOption[];
	label?: string;
	labelClassName?: string;
	helperText?: string;
	error?: boolean;
	isLoading?: boolean;
	loadingText?: ReactNode;
	size?: AutocompleteSize;
	fullWidth?: boolean;
	id?: string;
	placeholder?: string;
	noOptionsText?: string;
	className?: string;
	style?: CSSProperties;
	inputClassName?: string;
	contentClassName?: string;
	disabled?: boolean;
	required?: boolean;
	getOptionLabel?: (option: TOption) => string;
	getOptionValue?: (option: TOption) => string;
	isOptionEqualToValue?: (option: TOption, value: TOption) => boolean;
	renderOption?: (option: TOption) => ReactNode;
};

export type AutocompleteSingleProps<TOption> =
	AutocompleteBaseProps<TOption> & {
		multiple?: false;
		value?: TOption | null;
		defaultValue?: TOption | null;
		onChange?: (value: TOption | null) => void;
	};

export type AutocompleteMultipleProps<TOption> =
	AutocompleteBaseProps<TOption> & {
		multiple: true;
		value?: TOption[];
		defaultValue?: TOption[];
		onChange?: (value: TOption[]) => void;
	};

export type AutocompleteProps<TOption> =
	| AutocompleteSingleProps<TOption>
	| AutocompleteMultipleProps<TOption>;
