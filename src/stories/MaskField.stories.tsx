import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { MaskField } from '~/components';
import { Form, FormMaskField, FormSubmitButton, useForm } from '~/form';

export default {
	title: 'MaskField',
	component: MaskField,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof MaskField>;

export const Default = () => {
	const [value, setValue] = useState('');
	return (
		<MaskField
			value={value}
			onChange={(e) => setValue(e.target.value)}
			label="Phone"
			maskProps={{
				mask: '+7 (___) ___-__-__',
				replacement: { _: /\d/ },
				showMask: true,
			}}
		/>
	);
};

export const FormExample = () => {
	const form = useForm<{ name: string }>({
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		alert(data.name);
	});
	return (
		<Form form={form} onSubmit={onSubmit}>
			<FormMaskField
				control={form.control}
				name="name"
				label="Phone"
				maskProps={{
					mask: '+7 (___) ___-__-__',
					replacement: { _: /\d/ },
					showMask: true,
				}}
			/>
			<FormSubmitButton>Submit</FormSubmitButton>
		</Form>
	);
};
