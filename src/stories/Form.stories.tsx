import { Form, useForm } from '@formisch/react';
import type { Meta } from 'storybook-react-rsbuild';
import * as v from 'valibot';
import { Button } from '~/components';
import {
	FormCheckboxField,
	FormDatePicker,
	FormMaskField,
	FormSelect,
	FormTextArea,
	FormTextField,
} from '~/form';

const ProfileSchema = v.object({
	birthday: v.optional(v.date()),
	bio: v.string(),
	name: v.pipe(v.string(), v.minLength(1, 'Enter a name')),
	newsletter: v.boolean(),
	phone: v.string(),
	status: v.picklist(['active', 'paused']),
});

export default {
	title: 'Form/Formisch',
	parameters: {
		layout: 'centered',
	},
} satisfies Meta;

export const Fields = () => {
	const form = useForm({
		schema: ProfileSchema,
		initialInput: {
			bio: '',
			name: '',
			newsletter: true,
			phone: '',
			status: 'active',
		},
	});

	return (
		<Form of={form} onSubmit={() => undefined}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					width: 360,
				}}
			>
				<FormTextField
					form={form}
					path={['name']}
					label="Name"
					fullWidth
					required
				/>
				<FormTextArea
					form={form}
					path={['bio']}
					label="Bio"
					placeholder="Tell us about yourself"
				/>
				<FormMaskField
					form={form}
					path={['phone']}
					label="Phone"
					maskProps={{
						mask: '+1 (___) ___-____',
						replacement: { _: /\d/ },
					}}
				/>
				<FormSelect
					form={form}
					path={['status']}
					label="Status"
					options={[
						{ label: 'Active', value: 'active' },
						{ label: 'Paused', value: 'paused' },
					]}
				/>
				<FormDatePicker form={form} path={['birthday']} label="Birthday" />
				<FormCheckboxField
					form={form}
					path={['newsletter']}
					label="Receive product updates"
				/>
				<Button type="submit">Submit</Button>
			</div>
		</Form>
	);
};
