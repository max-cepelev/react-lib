import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { DatePicker } from '~/components';

export default {
	title: 'DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof DatePicker>;

export const Default = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<DatePicker selected={date} onSelect={setDate} selectMonth selectYear />
	);
};
