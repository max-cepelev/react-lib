import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { SliderInput } from '~/components';

export default {
	title: 'SliderInput',
	component: SliderInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof SliderInput>;

export function Demo() {
	const [value, setValue] = React.useState(35);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<SliderInput
				value={value}
				unit="%"
				size="small"
				min={0}
				max={100}
				onChange={setValue}
				width={250}
			/>
			<SliderInput
				value={value}
				unit="%"
				size="medium"
				min={0}
				max={100}
				onChange={setValue}
				width={250}
			/>
			<SliderInput
				value={value}
				unit="%"
				size="large"
				min={0}
				max={100}
				onChange={setValue}
				width={250}
			/>
		</div>
	);
}

export function Active() {
	const [value, setValue] = React.useState(50);

	return (
		<SliderInput
			value={value}
			size="medium"
			min={0}
			max={100}
			onChange={setValue}
			width={250}
			isActive
		/>
	);
}
