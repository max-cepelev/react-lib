import { clsx } from 'clsx';
import { useId, useState } from 'react';
import { CircularProgress } from '../CircularProgress';
import { Combobox, useComboboxAnchor } from '../Combobox';
import { Label } from '../Label';
import { Typography } from '../Typography';
import * as styles from './styles.css';
import type { AutocompleteProps } from './types';

function defaultGetOptionLabel<TOption>(option: TOption) {
	return typeof option === 'string' ? option : String(option);
}

function Autocomplete<TOption>(props: AutocompleteProps<TOption>) {
	const {
		className,
		contentClassName,
		defaultValue,
		disabled = false,
		error = false,
		fullWidth = false,
		getOptionLabel = defaultGetOptionLabel,
		getOptionValue = getOptionLabel,
		helperText,
		id,
		inputClassName,
		isOptionEqualToValue,
		isLoading = false,
		label,
		labelClassName,
		loadingText,
		multiple,
		noOptionsText = 'No results found',
		onChange,
		options,
		placeholder,
		renderOption,
		required,
		size = 'medium',
		style,
		value,
		...rootProps
	} = props;
	const generatedId = useId();
	const inputId = id ?? (label ? generatedId : undefined);
	const anchor = useComboboxAnchor();
	const [innerValue, setInnerValue] = useState<TOption | TOption[] | null>(
		defaultValue ?? (multiple ? [] : null),
	);
	const selectedValue = value ?? innerValue;
	const invalid = error ? true : undefined;

	const handleChange = (nextValue: TOption | TOption[] | null) => {
		if (value === undefined) {
			setInnerValue(nextValue);
		}

		if (multiple) {
			(onChange as ((value: TOption[]) => void) | undefined)?.(
				Array.isArray(nextValue) ? nextValue : [],
			);
			return;
		}

		(onChange as ((value: TOption | null) => void) | undefined)?.(
			nextValue as TOption | null,
		);
	};

	const isEqual =
		isOptionEqualToValue ??
		((option: TOption, selectedOption: TOption) =>
			getOptionValue(option) === getOptionValue(selectedOption));

	const renderItem = (option: TOption) => (
		<Combobox.Item key={getOptionValue(option)} value={option}>
			{renderOption?.(option) ?? getOptionLabel(option)}
		</Combobox.Item>
	);

	return (
		<div
			style={style}
			className={clsx(
				styles.field,
				{ [styles.fullWidth]: fullWidth },
				className,
			)}
		>
			{label && (
				<Label
					htmlFor={inputId}
					disabled={disabled}
					required={required}
					error={error}
					className={clsx(styles.label, labelClassName)}
				>
					{label}
				</Label>
			)}
			<Combobox<TOption, typeof multiple>
				{...rootProps}
				disabled={disabled}
				isItemEqualToValue={isEqual}
				itemToStringLabel={getOptionLabel}
				itemToStringValue={getOptionValue}
				items={options}
				multiple={multiple}
				onValueChange={handleChange}
				value={selectedValue}
			>
				{multiple ? (
					<Combobox.Chips
						ref={anchor}
						size={size}
						className={clsx({ [styles.fullWidth]: fullWidth }, inputClassName)}
					>
						{(Array.isArray(selectedValue) ? selectedValue : []).map(
							(option) => (
								<Combobox.Chip key={getOptionValue(option)}>
									{getOptionLabel(option)}
								</Combobox.Chip>
							),
						)}
						<Combobox.ChipsInput
							id={inputId}
							disabled={disabled}
							required={required}
							aria-invalid={invalid}
							placeholder={
								Array.isArray(selectedValue) && selectedValue.length
									? undefined
									: placeholder
							}
						/>
					</Combobox.Chips>
				) : (
					<Combobox.Input
						id={inputId}
						disabled={disabled}
						required={required}
						aria-invalid={invalid}
						placeholder={placeholder}
						showClear
						size={size}
						className={clsx({ [styles.fullWidth]: fullWidth }, inputClassName)}
					/>
				)}
				<Combobox.Content
					anchor={multiple ? anchor : undefined}
					className={contentClassName}
				>
					{isLoading ? (
						<div
							data-slot="autocomplete-loading"
							className={styles.loading}
							role="status"
						>
							{loadingText ?? (
								<CircularProgress thickness={1.6} size={18} color="inherit" />
							)}
						</div>
					) : (
						<>
							<Combobox.Empty>{noOptionsText}</Combobox.Empty>
							<Combobox.List>{renderItem}</Combobox.List>
						</>
					)}
				</Combobox.Content>
			</Combobox>
			{helperText && (
				<Typography
					variant="caption"
					className={clsx(styles.helperText, {
						[styles.error]: error,
						[styles.disabled]: disabled,
					})}
				>
					{helperText}
				</Typography>
			)}
		</div>
	);
}

export { Autocomplete };
