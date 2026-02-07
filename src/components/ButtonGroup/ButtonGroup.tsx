import { clsx } from 'clsx';
import { Button } from '../Button';
import { Label } from '../Label';
import { Tooltip } from '../Tooltip';
import {
	buttonClass,
	buttonsClass,
	containerClass,
	labelClass,
} from './buttonGroup.css';

type Value = string | number;

type Option<T extends Value> = {
	value: T;
	label: string | React.ReactNode;
	disabled?: boolean;
	title?: string;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
};

type ButtonGroupProps<
	TValue extends Value,
	Multiple extends boolean = false,
> = {
	options: Option<TValue>[];
	value: Multiple extends true ? TValue[] : TValue;
	onChange: (value: Multiple extends true ? TValue[] : TValue) => void;
	size?: 'sm' | 'lg' | 'md' | 'icon';
	className?: string;
	label?: string;
	multiple?: Multiple;
};

export const ButtonGroup = <T extends Value, Multiple extends boolean = false>({
	value,
	onChange,
	options,
	size,
	className,
	label,
	multiple,
}: ButtonGroupProps<T, Multiple>) => {
	const isMultiple = multiple === true;

	const isActive = (optionValue: T): boolean => {
		if (isMultiple) {
			return (value as T[]).includes(optionValue);
		}
		return value === optionValue;
	};

	const handleChange = (optionValue: T) => {
		if (isMultiple) {
			const currentValue = value as T[];
			if (currentValue.includes(optionValue)) {
				// biome-ignore lint/suspicious/noExplicitAny: <>
				onChange(currentValue.filter((v) => v !== optionValue) as any);
			} else {
				// biome-ignore lint/suspicious/noExplicitAny: <>
				onChange([...currentValue, optionValue] as any);
			}
		} else {
			// biome-ignore lint/suspicious/noExplicitAny: <>
			onChange(optionValue as any);
		}
	};

	return (
		<div className={clsx(containerClass, className)}>
			{label && <Label className={labelClass}>{label}</Label>}
			<div className={buttonsClass}>
				{options.map((option) => (
					<Tooltip arrow key={option.value} text={option.title}>
						<Button
							size={size}
							className={buttonClass}
							disabled={option.disabled}
							onClick={() => handleChange(option.value)}
							startAdornment={option.startAdornment}
							endAdornment={option.endAdornment}
							variant={isActive(option.value) ? 'default' : 'outline'}
							key={option.value}
						>
							{option.label}
						</Button>
					</Tooltip>
				))}
			</div>
		</div>
	);
};
