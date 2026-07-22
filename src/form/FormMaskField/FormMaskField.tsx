import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { MaskField, type MaskFieldProps } from '@max-ts/kit';
import { useId } from 'react';
import type { FormFieldBindingProps, NativeFieldBindingProp } from '../types';
import { getStringInputValue } from '../utils';

export type FormMaskFieldProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = Omit<MaskFieldProps, NativeFieldBindingProp | 'error' | 'helperText'> &
	FormFieldBindingProps<TSchema, TFieldPath, string>;

export const FormMaskField = <
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
>({
	form,
	path,
	id: idProp,
	...restProps
}: FormMaskFieldProps<TSchema, TFieldPath>) => {
	const generatedId = useId();

	return (
		<Field<TSchema, TFieldPath> of={form} path={path}>
			{(field) => (
				<MaskField
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
