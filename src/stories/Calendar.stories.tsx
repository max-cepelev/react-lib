import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import type { Meta } from 'storybook-react-rsbuild';
import { Calendar, Card } from '~/components';

export default {
	title: 'Calendar',
	component: Calendar,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export const Default = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return <Calendar mode="single" selected={date} onSelect={setDate} />;
};

export const Multiple = () => {
	const now = new Date();
	const [date, setDate] = useState<Date[] | undefined>([
		now,
		new Date(now.setDate(now.getDate() + 1)),
	]);

	return <Calendar mode="multiple" selected={date} onSelect={setDate} />;
};

export const Range = () => {
	const now = new Date();
	const [date, setDate] = useState<DateRange | undefined>({
		from: now,
		to: new Date(now.setDate(now.getDate() + 1)),
	});

	return (
		<Card style={{ padding: 8 }}>
			<Calendar
				mode="range"
				selected={date}
				numberOfMonths={2}
				onSelect={setDate}
			/>
		</Card>
	);
};

export const MonthSelect = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode="single"
			captionLayout="dropdown-months"
			selected={date}
			onSelect={setDate}
		/>
	);
};

export const YearSelect = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode="single"
			captionLayout="dropdown-years"
			selected={date}
			onSelect={setDate}
		/>
	);
};
