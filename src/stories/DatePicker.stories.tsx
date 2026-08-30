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
} satisfies Meta<typeof DatePicker>;

export const Default = () => {
	const [date, setDate] = useState<Date | null>(new Date());

	return (
		<DatePicker
			label="Дата"
			value={date}
			onValueChange={setDate}
			calendarProps={{ captionLayout: 'dropdown' }}
		/>
	);
};

export const Uncontrolled = () => (
	<DatePicker
		label="Дата рождения"
		defaultValue={new Date(1990, 0, 1)}
		helperText="Введите дату или выберите её в календаре"
	/>
);

export const RestrictedDates = () => {
	const min = new Date(2026, 7, 1);
	const max = new Date(2026, 7, 31);

	return (
		<DatePicker
			label="Рабочий день августа"
			defaultMonth={min}
			min={min}
			max={max}
			calendarProps={{
				captionLayout: 'dropdown',
				disabled: { dayOfWeek: [0, 6] },
			}}
		/>
	);
};

export const States = () => (
	<div style={{ display: 'grid', gap: 16, width: 320 }}>
		<DatePicker label="Недоступная дата" disabled fullWidth />
		<DatePicker
			label="Дата с ошибкой"
			error
			helperText="Укажите дату"
			fullWidth
		/>
	</div>
);

export const StylingSlots = () => (
	<DatePicker
		label="Стилизация"
		style={{ width: 360 }}
		inputProps={{
			className: 'custom-date-input',
			style: { fontWeight: 600 },
		}}
		calendarProps={{ style: { minWidth: 280 } }}
		contentProps={{ style: { padding: 12 } }}
	/>
);
