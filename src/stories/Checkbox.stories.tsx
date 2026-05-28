import { useId } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Checkbox } from '~/components';

export default {
	title: 'Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export const Default = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Checkbox id={id} />
			<label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Accept terms and conditions
			</label>
		</div>
	);
};
