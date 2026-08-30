import type {
	ComponentPropsWithRef,
	ReactNode,
	Ref,
	SyntheticEvent,
} from 'react';
import type { PropsBase } from '../Calendar/Calendar';
import type { InputGroupProps } from '../InputGroup/types';
import type { PopoverProps } from '../Popover/types';

export type DatePickerValueChangeDetails = {
	source: 'calendar' | 'clear' | 'input';
	event?: SyntheticEvent;
};

export type DatePickerInputProps = Omit<
	ComponentPropsWithRef<'input'>,
	| 'defaultValue'
	| 'disabled'
	| 'id'
	| 'name'
	| 'placeholder'
	| 'readOnly'
	| 'ref'
	| 'required'
	| 'type'
	| 'value'
>;

export type DatePickerCalendarProps = Omit<
	PropsBase,
	'defaultMonth' | 'mode' | 'month' | 'onMonthChange' | 'required'
>;

export type DatePickerContentProps = Omit<PopoverProps.Content, 'children'>;

export type DatePickerPopoverProps = Omit<
	PopoverProps.Root,
	'children' | 'defaultOpen' | 'onOpenChange' | 'open'
>;

export type DatePickerTriggerProps = Omit<
	InputGroupProps.Button,
	'children' | 'disabled' | 'ref' | 'type'
>;

export type DatePickerProps = Omit<
	ComponentPropsWithRef<'div'>,
	'children' | 'defaultValue' | 'onChange'
> & {
	value?: Date | null;
	defaultValue?: Date | null;
	onValueChange?: (
		value: Date | null,
		details: DatePickerValueChangeDetails,
	) => void;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	month?: Date;
	defaultMonth?: Date;
	onMonthChange?: (month: Date) => void;
	label?: ReactNode;
	helperText?: ReactNode;
	error?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	fullWidth?: boolean;
	size?: 'small' | 'medium' | 'large';
	name?: string;
	inputId?: string;
	inputRef?: Ref<HTMLInputElement>;
	placeholder?: string;
	min?: Date;
	max?: Date;
	formatDate?: (date: Date) => string;
	parseDate?: (inputValue: string) => Date | null;
	invalidDateMessage?: ReactNode;
	unavailableDateMessage?: ReactNode;
	openCalendarLabel?: string;
	calendarIcon?: ReactNode;
	closeOnSelect?: boolean;
	inputProps?: DatePickerInputProps;
	triggerProps?: DatePickerTriggerProps;
	calendarProps?: DatePickerCalendarProps;
	contentProps?: DatePickerContentProps;
	popoverProps?: DatePickerPopoverProps;
};
