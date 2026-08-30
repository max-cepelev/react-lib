import { clsx } from 'clsx';
import { Calendar1 } from 'lucide-react';
import { Calendar } from '../Calendar/Calendar';
import { InputGroup } from '../InputGroup/InputGroup';
import { Label } from '../Label/Label';
import { Popover } from '../Popover/Popover';
import { Typography } from '../Typography/Typography';
import * as styles from './styles.css';
import type { DatePickerProps } from './types';
import { useLogic } from './useLogic';

export const DatePicker = (props: DatePickerProps) => {
	const {
		calendarIcon,
		calendarProps = {},
		className,
		contentProps = {},
		disabled = false,
		error = false,
		fullWidth = false,
		helperText,
		inputProps = {},
		label,
		name,
		openCalendarLabel = 'Открыть календарь',
		placeholder = 'дд.мм.гггг',
		popoverProps = {},
		readOnly = false,
		ref,
		required = false,
		size = 'medium',
		style,
		triggerProps = {},
		value: _value,
		defaultValue: _defaultValue,
		onValueChange: _onValueChange,
		open: _open,
		defaultOpen: _defaultOpen,
		onOpenChange: _onOpenChange,
		month: _month,
		defaultMonth: _defaultMonth,
		onMonthChange: _onMonthChange,
		inputId: _inputId,
		inputRef: _inputRef,
		min: _min,
		max: _max,
		formatDate: _formatDate,
		parseDate: _parseDate,
		invalidDateMessage: _invalidDateMessage,
		unavailableDateMessage: _unavailableDateMessage,
		closeOnSelect: _closeOnSelect,
		...rootProps
	} = props;
	const {
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
		selectedDate,
		setDisplayedMonth,
		setInputElementRef,
		setOpen,
	} = useLogic(props);
	const {
		'aria-describedby': inputAriaDescribedBy,
		'aria-invalid': inputAriaInvalid,
		className: inputClassName,
		inputMode,
		onBlur: _inputOnBlur,
		onChange: _inputOnChange,
		onKeyDown: _inputOnKeyDown,
		...restInputProps
	} = inputProps;
	const {
		'aria-label': triggerAriaLabel,
		className: triggerClassName,
		size: triggerSize,
		...restTriggerProps
	} = triggerProps;
	const {
		align = 'end',
		alignOffset = -10,
		side = 'bottom',
		...restContentProps
	} = contentProps;
	const displayedHelperText = internalError ?? helperText;
	const isInvalid = Boolean(internalError) || error;
	const describedBy = [
		inputAriaDescribedBy,
		displayedHelperText != null ? helperTextId : undefined,
	]
		.filter(Boolean)
		.join(' ');
	const isInteractionDisabled = disabled || readOnly;

	return (
		<Popover
			{...popoverProps}
			open={isOpen}
			onOpenChange={(nextOpen) => setOpen(nextOpen)}
		>
			<div
				{...rootProps}
				data-slot="date-picker"
				data-disabled={disabled ? '' : undefined}
				data-invalid={isInvalid ? '' : undefined}
				ref={ref}
				style={style}
				className={clsx(styles.root, fullWidth && styles.fullWidth, className)}
			>
				{label != null && (
					<Label
						htmlFor={inputId}
						disabled={disabled}
						error={isInvalid}
						required={required}
					>
						{label}
					</Label>
				)}

				<InputGroup
					data-slot="date-picker-control"
					data-size={size}
					className={styles.control}
				>
					<InputGroup.Input
						{...restInputProps}
						data-slot="date-picker-input"
						ref={setInputElementRef}
						id={inputId}
						name={name}
						type="text"
						inputMode={inputMode ?? 'numeric'}
						value={inputValue}
						placeholder={placeholder}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						aria-invalid={isInvalid || inputAriaInvalid || undefined}
						aria-describedby={describedBy || undefined}
						className={inputClassName}
						onChange={handleInputChange}
						onBlur={handleInputBlur}
						onKeyDown={handleInputKeyDown}
					/>
					<InputGroup.Addon data-slot="date-picker-actions" align="inline-end">
						<Popover.Trigger
							disabled={isInteractionDisabled}
							render={
								<InputGroup.Button
									{...restTriggerProps}
									data-slot="date-picker-trigger"
									size={triggerSize ?? 'iconExtraSmall'}
									disabled={isInteractionDisabled}
									aria-label={triggerAriaLabel ?? openCalendarLabel}
									className={clsx(styles.trigger, triggerClassName)}
								>
									{calendarIcon ?? <Calendar1 />}
								</InputGroup.Button>
							}
						/>
					</InputGroup.Addon>
				</InputGroup>

				{displayedHelperText != null && (
					<Typography
						id={helperTextId}
						data-slot="date-picker-helper-text"
						component="p"
						variant="caption"
						color={isInvalid ? 'error' : 'secondary'}
						role={internalError ? 'alert' : undefined}
						className={styles.helperText}
					>
						{displayedHelperText}
					</Typography>
				)}
			</div>

			<Popover.Content
				{...restContentProps}
				data-slot="date-picker-content"
				align={align}
				alignOffset={alignOffset}
				side={side}
			>
				<div data-slot="date-picker-calendar">
					<Calendar
						{...calendarProps}
						mode="single"
						required={required}
						month={displayedMonth}
						onMonthChange={setDisplayedMonth}
						selected={selectedDate ?? undefined}
						onSelect={handleCalendarSelect}
						disabled={
							disabledMatchers.length > 0 ? disabledMatchers : undefined
						}
					/>
				</div>
			</Popover.Content>
		</Popover>
	);
};
