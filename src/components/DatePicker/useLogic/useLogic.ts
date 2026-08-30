import {
	type ChangeEvent,
	type FocusEvent,
	type KeyboardEvent,
	type ReactNode,
	type SyntheticEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from 'react';
import type { OnSelectHandler } from 'react-day-picker';
import type { DatePickerProps, DatePickerValueChangeDetails } from '../types';
import {
	formatDateInput,
	getDisabledMatchers,
	isDateUnavailable,
	isSameDate,
	isValidDate,
	parseDateInput,
} from '../utils';

const assignRef = <T>(ref: React.Ref<T> | undefined, value: T | null) => {
	if (typeof ref === 'function') {
		ref(value);
	} else if (ref) {
		ref.current = value;
	}
};

export const useLogic = (props: DatePickerProps) => {
	const {
		calendarProps,
		closeOnSelect = true,
		defaultMonth,
		defaultOpen = false,
		defaultValue = null,
		disabled = false,
		formatDate = formatDateInput,
		inputId: inputIdProp,
		inputProps,
		inputRef,
		invalidDateMessage = 'Некорректная дата',
		max,
		min,
		month: monthProp,
		onMonthChange,
		onOpenChange,
		onValueChange,
		open: openProp,
		parseDate = parseDateInput,
		readOnly = false,
		required = false,
		unavailableDateMessage = 'Дата недоступна для выбора',
		value: valueProp,
	} = props;
	const generatedInputId = useId();
	const inputId = inputIdProp ?? generatedInputId;
	const helperTextId = `${inputId}-helper-text`;
	const isValueControlled = valueProp !== undefined;
	const isOpenControlled = openProp !== undefined;
	const isMonthControlled = monthProp !== undefined;
	const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(
		defaultValue,
	);
	const selectedDate = isValueControlled ? valueProp : uncontrolledValue;
	const initialDate = isValidDate(selectedDate) ? selectedDate : null;
	const [inputValue, setInputValue] = useState(() =>
		initialDate ? formatDate(initialDate) : '',
	);
	const [internalError, setInternalError] = useState<ReactNode | null>(null);
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const isOpen = isOpenControlled ? openProp : uncontrolledOpen;
	const [uncontrolledMonth, setUncontrolledMonth] = useState(() =>
		isValidDate(initialDate)
			? initialDate
			: isValidDate(defaultMonth)
				? defaultMonth
				: new Date(),
	);
	const displayedMonth = isMonthControlled ? monthProp : uncontrolledMonth;
	const disabledMatchers = useMemo(
		() => getDisabledMatchers(calendarProps?.disabled, min, max),
		[calendarProps?.disabled, max, min],
	);

	const setInputElementRef = useCallback(
		(element: HTMLInputElement | null) => assignRef(inputRef, element),
		[inputRef],
	);

	const setOpen = useCallback(
		(nextOpen: boolean) => {
			if (!isOpenControlled) {
				setUncontrolledOpen(nextOpen);
			}

			onOpenChange?.(nextOpen);
		},
		[isOpenControlled, onOpenChange],
	);

	const setDisplayedMonth = useCallback(
		(nextMonth: Date) => {
			if (!isMonthControlled) {
				setUncontrolledMonth(nextMonth);
			}

			onMonthChange?.(nextMonth);
		},
		[isMonthControlled, onMonthChange],
	);

	const commitValue = useCallback(
		(nextValue: Date | null, details: DatePickerValueChangeDetails) => {
			if (!isValueControlled) {
				setUncontrolledValue(nextValue);
			}

			if (nextValue) {
				setDisplayedMonth(nextValue);
			}

			onValueChange?.(nextValue, details);
		},
		[isValueControlled, onValueChange, setDisplayedMonth],
	);

	const validateInput = useCallback(
		(input: string, event?: SyntheticEvent) => {
			const normalizedInput = input.trim();

			if (!normalizedInput) {
				if (required) {
					setInternalError(invalidDateMessage);
					return;
				}

				setInternalError(null);

				if (isValidDate(selectedDate)) {
					commitValue(null, { event, source: 'clear' });
				}
				return;
			}

			const parsedDate = parseDate(normalizedInput);

			if (!isValidDate(parsedDate)) {
				setInternalError(invalidDateMessage);
				return;
			}

			if (isDateUnavailable(parsedDate, disabledMatchers)) {
				setInternalError(unavailableDateMessage);
				return;
			}

			setInternalError(null);

			if (
				!isSameDate(parsedDate, isValidDate(selectedDate) ? selectedDate : null)
			) {
				commitValue(parsedDate, { event, source: 'input' });
			}
			setInputValue(
				formatDate(
					isValueControlled && isValidDate(selectedDate)
						? selectedDate
						: parsedDate,
				),
			);
		},
		[
			commitValue,
			disabledMatchers,
			formatDate,
			invalidDateMessage,
			isValueControlled,
			parseDate,
			required,
			selectedDate,
			unavailableDateMessage,
		],
	);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			inputProps?.onChange?.(event);
			setInputValue(event.target.value);
			setInternalError(null);
		},
		[inputProps],
	);

	const handleInputBlur = useCallback(
		(event: FocusEvent<HTMLInputElement>) => {
			inputProps?.onBlur?.(event);
			validateInput(event.currentTarget.value, event);
		},
		[inputProps, validateInput],
	);

	const handleInputKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			inputProps?.onKeyDown?.(event);

			if (event.defaultPrevented) {
				return;
			}

			if (event.key === 'Enter') {
				event.preventDefault();
				event.currentTarget.blur();
			} else if (event.key === 'Escape') {
				setInputValue(
					isValidDate(selectedDate) ? formatDate(selectedDate) : '',
				);
				setInternalError(null);
			}
		},
		[formatDate, inputProps, selectedDate],
	);

	const handleCalendarSelect: OnSelectHandler<Date | undefined> = useCallback(
		(nextDate, _triggerDate, _modifiers, event) => {
			if (!nextDate && required) {
				return;
			}

			setInternalError(null);
			commitValue(nextDate ?? null, {
				event,
				source: nextDate ? 'calendar' : 'clear',
			});

			if (!isValueControlled) {
				setInputValue(nextDate ? formatDate(nextDate) : '');
			}

			if (closeOnSelect) {
				setOpen(false);
			}
		},
		[
			closeOnSelect,
			commitValue,
			formatDate,
			isValueControlled,
			required,
			setOpen,
		],
	);

	useEffect(() => {
		const nextDate = isValidDate(selectedDate) ? selectedDate : null;
		setInputValue(nextDate ? formatDate(nextDate) : '');
		setInternalError(null);

		if (nextDate && !isMonthControlled) {
			setUncontrolledMonth(nextDate);
		}
	}, [formatDate, isMonthControlled, selectedDate]);

	useEffect(() => {
		if ((disabled || readOnly) && isOpen) {
			setOpen(false);
		}
	}, [disabled, isOpen, readOnly, setOpen]);

	return {
		disabledMatchers,
		displayedMonth,
		handleCalendarSelect,
		handleInputBlur,
		handleInputChange,
		handleInputKeyDown,
		helperTextId,
		inputId,
		inputValue,
		internalError,
		isOpen,
		selectedDate: isValidDate(selectedDate) ? selectedDate : null,
		setDisplayedMonth,
		setInputElementRef,
		setOpen,
	};
};
