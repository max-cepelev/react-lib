import type { SelectHTMLAttributes } from 'react';
import type { DropdownOption } from 'react-day-picker';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Typography,
} from '~/components';
import { trigger } from './styles.css';

export function Dropdown(
	props: {
		options?: DropdownOption[] | undefined;
	} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>,
) {
	const { options, onChange, ...restProps } = props;

	const selectedOption = options?.find(
		({ value }) => value === restProps.value,
	);

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
		<Select
			value={selectedOption?.value.toString()}
			onValueChange={handleChange}
		>
			<SelectTrigger className={trigger}>
				<SelectValue placeholder={selectedOption?.label} />
			</SelectTrigger>
			<SelectContent>
				{options?.map(({ value, label, disabled }) => (
					<SelectItem key={value} value={value.toString()} disabled={disabled}>
						<Typography align="center" transform="capitalize">
							{label}
						</Typography>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
