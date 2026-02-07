import { Calendar1 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Calendar, type PropsSingle } from '../Calendar';
import { MaskField } from '../MaskField';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import type { TextFieldProps } from '../TextField';

export type DatePickerProps = Omit<PropsSingle, 'onSelect' | 'mode'> & {
	label?: string;

	disabled?: boolean;

	onSelect?: (date: Date | undefined) => void;

	selectMonth?: boolean;

	selectYear?: boolean;

	calendarClassName?: string;
} & Pick<
		TextFieldProps,
		'error' | 'helperText' | 'className' | 'fullWidth' | 'size' | 'name'
	>;

export const DatePicker = (props: DatePickerProps) => {
	const {
		label,
		disabled = false,
		selected,
		onSelect,
		selectMonth,
		selectYear,
		error,
		helperText,
		className,
		fullWidth,
		size,
		name,
		...rest
	} = props;
	const [innerError, setInnerError] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [month, setMonth] = useState(new Date());
	const [inputValue, setInputValue] = useState('');

	const getLayout = () => {
		if (selectMonth && selectYear) {
			return 'dropdown';
		}

		if (selectMonth) {
			return 'dropdown-months';
		}

		if (selectYear) {
			return 'dropdown-years';
		}

		return 'label';
	};

	const handleClick = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleDayPickerSelect = (date: Date | undefined) => {
		if (!date) {
			setInputValue('');
			onSelect?.(undefined);
		} else {
			onSelect?.(date);
			setMonth(date);
			setInputValue(
				date.toLocaleString('ru-RU', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
				}),
			);
		}

		handleClose();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInnerError(null);
		setInputValue(e.target.value);

		const [day, month, year] = e.target.value.split('.').map(Number);
		if (
			Number.isNaN(day) ||
			Number.isNaN(month) ||
			Number.isNaN(year) ||
			day < 1 ||
			day > 31 ||
			month < 1 ||
			month > 12 ||
			year < 1000
		) {
			setInnerError('Некорректная дата');
			return;
		}
		const parsedDate = new Date(year, month - 1, day);

		onSelect?.(parsedDate);
		setMonth(parsedDate);
	};

	// Sync the input value with the selected date
	useEffect(() => {
		if (selected) {
			setInputValue(
				selected.toLocaleString('ru-RU', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
				}),
			);
			setMonth(selected);
		} else {
			setInputValue('');
		}
	}, [selected]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<MaskField
				value={inputValue}
				onChange={handleInputChange}
				label={label}
				disabled={disabled}
				className={className}
				fullWidth={fullWidth}
				size={size}
				name={name}
				endAdornment={
					<PopoverTrigger asChild>
						<Button variant="ghost" size="icon" onClick={handleClick}>
							<Calendar1 />
						</Button>
					</PopoverTrigger>
				}
				maskProps={{
					mask: '__.__.____',
					replacement: { _: /\d/ },
					showMask: true,
				}}
				placeholder="дд.мм.гггг"
				error={!!innerError || error}
				helperText={innerError || helperText}
			/>
			<PopoverContent align="end" alignOffset={-10} side="bottom">
				<Calendar
					month={month}
					onMonthChange={setMonth}
					selected={selected}
					onSelect={handleDayPickerSelect}
					{...rest}
					mode="single"
					captionLayout={getLayout()}
				/>
			</PopoverContent>
		</Popover>
	);
};
