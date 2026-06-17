import { useId } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Label, Switch } from '~/components';

export default {
	title: 'Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export const Default = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Switch id={id} />
			<Label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Enable notifications
			</Label>
		</div>
	);
};

export const Checked = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Switch id={id} defaultChecked />
			<Label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Enabled
			</Label>
		</div>
	);
};

export const Small = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Switch id={id} size="small" />
			<Label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
				Small switch
			</Label>
		</div>
	);
};

export const Disabled = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Switch id={id} disabled />
			<Label htmlFor={id}>Disabled</Label>
		</div>
	);
};

export const DisabledChecked = () => {
	const id = useId();
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Switch id={id} disabled defaultChecked />
			<Label htmlFor={id}>Disabled checked</Label>
		</div>
	);
};
