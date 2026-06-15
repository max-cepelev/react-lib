import type { SelectHTMLAttributes } from 'react';
import type { DropdownOption } from 'react-day-picker';
import { Select, Typography } from '~/components';
import { trigger } from './styles.css';

export function Dropdown(
	props: {
		options?: DropdownOption[] | undefined;
	} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>,
) {
	const { options, onChange, ...restProps } = props;

	const selectedValue =
		typeof restProps.value === 'string' || typeof restProps.value === 'number'
			? restProps.value.toString()
			: undefined;

	const selectedOption = options?.find(
		({ value }) => value.toString() === selectedValue,
	);

	const items = options?.map(({ value, label }) => ({
		value: value.toString(),
		label,
	}));

	const handleChange = (value: string) => {
		if (onChange) {
			onChange({
				//@ts-expect-error
				target: {
					value,
				},
			});
		}
	};

	return (
		<Select value={selectedValue} onValueChange={handleChange} items={items}>
			<Select.Trigger className={trigger}>
				<Select.Value placeholder={selectedOption?.label} />
			</Select.Trigger>
			<Select.Content>
				{options?.map(({ value, label, disabled }) => (
					<Select.Item key={value} value={value.toString()} disabled={disabled}>
						<Typography align="center" transform="capitalize">
							{label}
						</Typography>
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	);
}
