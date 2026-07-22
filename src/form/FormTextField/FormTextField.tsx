import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { TextField, type TextFieldProps } from '@max-ts/kit';
import { useId } from 'react';
import type { FormFieldBindingProps, NativeFieldBindingProp } from '../types';
import { getStringInputValue } from '../utils';

export type FormTextFieldProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = Omit<TextFieldProps, NativeFieldBindingProp | 'error' | 'helperText'> &
	FormFieldBindingProps<TSchema, TFieldPath, string>;

export const FormTextField = <
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
>({
	form,
	path,
	id: idProp,
	...restProps
}: FormTextFieldProps<TSchema, TFieldPath>) => {
	const generatedId = useId();

	return (
		<Field<TSchema, TFieldPath> of={form} path={path}>
			{(field) => (
				<TextField
					{...restProps}
					{...field.props}
					id={idProp ?? generatedId}
					value={getStringInputValue(field.input)}
					error={Boolean(field.errors)}
					helperText={field.errors?.[0]}
				/>
			)}
		</Field>
	);
};
