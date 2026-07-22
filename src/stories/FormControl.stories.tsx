import { useId } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Checkbox, FormControl, Textarea } from '~/components';

export default {
	title: 'FormControl',
	component: FormControl,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FormControl>;

export const Vertical = () => {
	const id = useId();

	return (
		<FormControl
			error="A short description is required"
			htmlFor={id}
			label="Description"
			required
			style={{ width: 360 }}
		>
			<Textarea id={id} aria-invalid />
		</FormControl>
	);
};

export const Inline = () => {
	const id = useId();

	return (
		<FormControl
			htmlFor={id}
			label="Receive product updates"
			orientation="inline"
		>
			<Checkbox id={id} />
		</FormControl>
	);
};
