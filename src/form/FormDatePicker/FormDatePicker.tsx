import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { DatePicker, type DatePickerProps } from '@max-ts/kit';
import type { FormFieldBindingProps } from '../types';

export type FormDatePickerProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = Omit<
	DatePickerProps,
	'defaultValue' | 'error' | 'helperText' | 'name' | 'onValueChange' | 'value'
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
			const handleFieldChange = field.onChange as (
				date: Date | undefined,
			) => void;
			const handleValueChange = (date: Date | null) => {
				handleFieldChange(date ?? undefined);
			};

			return (
				<DatePicker
					{...restProps}
					name={field.props.name}
					value={field.input instanceof Date ? field.input : null}
					onValueChange={handleValueChange}
					error={Boolean(field.errors)}
					helperText={field.errors?.[0]}
				/>
			);
		}}
	</Field>
);
