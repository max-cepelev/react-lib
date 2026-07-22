import { type FormStore, getInput, setErrors, useForm } from '@formisch/react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import * as v from 'valibot';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@max-ts/kit', () => ({
	TextField: ({
		error,
		helperText,
		...props
	}: ComponentProps<'input'> & {
		error?: boolean;
		helperText?: string;
	}) => (
		<>
			<input aria-invalid={error} {...props} />
			{helperText && <span>{helperText}</span>}
		</>
	),
}));

import { FormTextField } from './FormTextField';

const TestSchema = v.object({
	name: v.string(),
});

describe('FormTextField', () => {
	it('binds the native input value and errors to Formisch', () => {
		let form: FormStore<typeof TestSchema> | undefined;

		const TestForm = () => {
			form = useForm({
				schema: TestSchema,
				initialInput: { name: 'Ada' },
			});

			return <FormTextField form={form} path={['name']} label="Name" />;
		};

		render(<TestForm />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('Ada');

		fireEvent.change(input, { target: { value: 'Grace' } });
		expect(
			getInput(form as FormStore<typeof TestSchema>, { path: ['name'] }),
		).toBe('Grace');

		act(() => {
			setErrors(form as FormStore<typeof TestSchema>, {
				path: ['name'],
				errors: ['Name is required'],
			});
		});

		expect(screen.getByText('Name is required')).toBeInTheDocument();
		expect(input).toHaveAttribute('aria-invalid', 'true');
	});
});
