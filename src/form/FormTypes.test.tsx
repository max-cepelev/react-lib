import type { FormStore } from '@formisch/react';
import * as v from 'valibot';
import { describe, expectTypeOf, it, vi } from 'vitest';

vi.mock('./FormCheckboxField', () => ({ FormCheckboxField: () => null }));
vi.mock('./FormDatePicker', () => ({ FormDatePicker: () => null }));
vi.mock('./FormSelect', () => ({ FormSelect: () => null }));
vi.mock('./FormTextArea', () => ({ FormTextArea: () => null }));
vi.mock('./FormTextField', () => ({ FormTextField: () => null }));

import type { FormCheckboxFieldProps } from './FormCheckboxField';
import { FormCheckboxField } from './FormCheckboxField';
import type { FormDatePickerProps } from './FormDatePicker';
import { FormDatePicker } from './FormDatePicker';
import type { FormSelectProps } from './FormSelect';
import { FormSelect } from './FormSelect';
import type { FormTextAreaProps } from './FormTextArea';
import { FormTextArea } from './FormTextArea';
import type { FormTextFieldProps } from './FormTextField';
import { FormTextField } from './FormTextField';

const TestSchema = v.object({
	active: v.boolean(),
	birthday: v.date(),
	count: v.number(),
	name: v.string(),
	roles: v.array(v.picklist(['admin', 'editor'])),
	status: v.picklist(['draft', 'published']),
});

type Schema = typeof TestSchema;

describe('Form component types', () => {
	it('restrict paths and select options to compatible schema inputs', () => {
		expectTypeOf<
			FormTextFieldProps<Schema, readonly ['active']>['path']
		>().toEqualTypeOf<never>();
		expectTypeOf<
			FormTextFieldProps<Schema, readonly ['count']>['path']
		>().toEqualTypeOf<never>();
		expectTypeOf<
			FormTextAreaProps<Schema, readonly ['birthday']>['path']
		>().toEqualTypeOf<never>();
		expectTypeOf<
			FormCheckboxFieldProps<Schema, readonly ['name']>['path']
		>().toEqualTypeOf<never>();
		expectTypeOf<
			FormDatePickerProps<Schema, readonly ['status']>['path']
		>().toEqualTypeOf<never>();
		expectTypeOf<
			FormSelectProps<Schema, readonly ['status']>['options'][number]['value']
		>().toEqualTypeOf<'draft' | 'published'>();
		expectTypeOf<
			FormSelectProps<
				Schema,
				readonly ['roles'],
				true
			>['options'][number]['value']
		>().toEqualTypeOf<'admin' | 'editor'>();
	});
});

const form = {} as FormStore<Schema>;

const validTypeFixtures = () => (
	<>
		<FormTextField form={form} path={['name']} />
		<FormTextArea form={form} path={['name']} />
		<FormCheckboxField form={form} path={['active']} label="Active" />
		<FormDatePicker form={form} path={['birthday']} />
		<FormSelect
			form={form}
			path={['status']}
			options={[{ label: 'Draft', value: 'draft' }]}
		/>
		<FormSelect
			form={form}
			path={['roles']}
			multiple
			options={[{ label: 'Admin', value: 'admin' }]}
		/>
	</>
);

const invalidTypeFixtures = () => (
	<>
		{/* @ts-expect-error Text fields cannot bind to boolean schema inputs. */}
		<FormTextField form={form} path={['active']} />
		{/* @ts-expect-error Checkbox fields cannot bind to string schema inputs. */}
		<FormCheckboxField form={form} path={['name']} label="Name" />
		<FormSelect
			form={form}
			path={['status']}
			options={[
				{
					label: 'Archived',
					// @ts-expect-error Select options must match the schema literal union.
					value: 'archived',
				},
			]}
		/>
	</>
);

void validTypeFixtures;
void invalidTypeFixtures;
