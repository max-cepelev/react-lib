import { Calendar1 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { TextField, type TextFieldProps } from '../TextField';
import { MONTHS, QUARTERS } from './constants';
import * as styles from './styles.css';
import { getQuarter, getQuarterLabel } from './utils';
import { YearsDropdown } from './YearsDropdown';

export type PeriodPickerProps = {
	disabled?: boolean;
	value?: Date | null;
	min?: Date;
	max?: Date;
	onSelect?: (date: Date | null) => void;
	type?: 'month' | 'quarter';
} & Pick<
	TextFieldProps,
	| 'error'
	| 'helperText'
	| 'label'
	| 'disabled'
	| 'placeholder'
	| 'className'
	| 'size'
	| 'fullWidth'
	| 'name'
>;

export const PeriodPicker = (props: PeriodPickerProps) => {
	const {
		label,
		disabled = false,
		value,
		onSelect,
		type = 'month',
		placeholder = type === 'month' ? 'Выберите месяц' : 'Выберите квартал',
		error,
		helperText,
		max = new Date(2050, 0, 1),
		min = new Date(2000, 0, 1),
		className,
		size,
		fullWidth,
		name,
	} = props;
	const now = new Date();
	const [isOpen, setIsOpen] = useState(false);
	const [year, setYear] = useState(now.getFullYear());

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleSelect = (date: Date) => {
		onSelect?.(date);

		handleClose();
	};

	const textValue =
		type === 'month'
			? value?.toLocaleDateString('ru-RU', {
					month: 'long',
					year: 'numeric',
				})
			: getQuarterLabel(value);

	useEffect(() => {
		if (value) {
			setYear(value.getFullYear());
		}
	}, [value]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<TextField
				label={label}
				value={textValue}
				disabled={disabled}
				size={size}
				fullWidth={fullWidth}
				name={name}
				endAdornment={
					<PopoverTrigger asChild>
						<Button disabled={disabled} variant="ghost" size="icon">
							<Calendar1 />
						</Button>
					</PopoverTrigger>
				}
				placeholder={placeholder}
				error={error}
				helperText={helperText}
				className={className}
			/>
			<PopoverContent align="end" alignOffset={-10} side="bottom">
				<div className={styles.wrapper}>
					<YearsDropdown
						year={year}
						onSelect={setYear}
						minDate={min}
						maxDate={max}
					/>
					{type === 'month' ? (
						<div className={styles.months}>
							{MONTHS.map((label, index) => {
								const date = new Date(year, index, value?.getDate() || 1);
								return (
									<Button
										key={label}
										variant={
											value?.getMonth() === index &&
											value.getFullYear() === date.getFullYear()
												? 'default'
												: 'ghost'
										}
										disabled={date < min || date > max}
										onClick={() => handleSelect(date)}
									>
										{label}
									</Button>
								);
							})}
						</div>
					) : (
						<div className={styles.quarters}>
							{QUARTERS.map((label, index) => {
								const monthIndex = index * 3;
								const date = new Date(year, monthIndex, 1);
								return (
									<Button
										key={label}
										variant={
											value &&
											[
												getQuarter(value.getMonth()) === index,
												value.getFullYear() === date.getFullYear(),
											].every(Boolean)
												? 'default'
												: 'ghost'
										}
										disabled={date < min || date > max}
										onClick={() => handleSelect(date)}
									>
										{label}
									</Button>
								);
							})}
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};
