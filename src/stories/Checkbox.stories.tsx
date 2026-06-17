import { useId } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Checkbox, Label } from '~/components';

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
			<Label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Accept terms and conditions
			</Label>
		</div>
	);
};

export const Checked = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Checkbox id={id} defaultChecked />
			<Label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Selected
			</Label>
		</div>
	);
};

export const Indeterminate = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Checkbox id={id} indeterminate />
			<Label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Partially selected
			</Label>
		</div>
	);
};

export const Disabled = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Checkbox id={id} disabled />
			<Label htmlFor={id}>Disabled</Label>
		</div>
	);
};
