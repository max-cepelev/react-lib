import { Select, Typography } from '~/components';

type YearsDropdownProps = {
	year: number;
	onSelect?: (year: number) => void;
	minDate: Date;
	maxDate: Date;
};

export function YearsDropdown({
	year,
	onSelect,
	minDate,
	maxDate,
}: YearsDropdownProps) {
	const years = Array.from(
		{ length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
		(_, index) => minDate.getFullYear() + index,
	);

	const onChange = (year: string) => {
		onSelect?.(Number(year));
	};

	return (
		<Select onValueChange={onChange} value={year.toString()}>
			<Select.Trigger>
				<Select.Value placeholder={year.toString()} />
			</Select.Trigger>
			<Select.Content>
				{years.map((value) => (
					<Select.Item value={value.toString()} key={value}>
						<Typography
							align="center"
							variant="subtitle1"
							transform="capitalize"
						>
							{value}
						</Typography>
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	);
}
