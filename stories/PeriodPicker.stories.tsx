import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { PeriodPicker, Typography } from '~/components';

export default {
	title: 'PeriodPicker',
	component: PeriodPicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof PeriodPicker>;

export const Default = () => {
	const [date, setDate] = useState<Date | null>(new Date());

	return (
		<div>
			<Typography>Selected date: {date?.toLocaleDateString()}</Typography>
			<PeriodPicker
				// min={new Date(2025, 2, 1)}
				max={new Date(2025, 8, 1)}
				value={date}
				onSelect={setDate}
			/>
		</div>
	);
};

export const Quarter = () => {
	const [date, setDate] = useState<Date | null>(new Date());

	return (
		<div>
			<Typography>Selected date: {date?.toLocaleDateString()}</Typography>
			<PeriodPicker type="quarter" value={date} onSelect={setDate} />
		</div>
	);
};
