import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { DatePicker, type DatePickerProps } from '@max-ts/kit';
import type { FormFieldBindingProps } from '../types';

export type FormDatePickerProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = Omit<
	DatePickerProps,
	'error' | 'helperText' | 'name' | 'onSelect' | 'selected'
> &
	FormFieldBindingProps<TSchema, TFieldPath, Date>;

export const FormDatePicker = <
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
>({
	form,
	path,
	...restProps
}: FormDatePickerProps<TSchema, TFieldPath>) => (
	<Field<TSchema, TFieldPath> of={form} path={path}>
		{(field) => {
			const handleSelect = field.onChange as (date: Date | undefined) => void;

			return (
				<DatePicker
					{...restProps}
					name={field.props.name}
					selected={field.input instanceof Date ? field.input : undefined}
					onSelect={handleSelect}
					error={Boolean(field.errors)}
					helperText={field.errors?.[0]}
				/>
			);
		}}
	</Field>
);
