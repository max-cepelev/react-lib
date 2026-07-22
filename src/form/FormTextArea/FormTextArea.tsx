import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { FormControl, Textarea, type TextareaProps } from '@max-ts/kit';
import { useId } from 'react';
import type { FormFieldBindingProps, NativeFieldBindingProp } from '../types';
import { getStringInputValue } from '../utils';

export type FormTextAreaProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = Omit<TextareaProps, NativeFieldBindingProp> &
	FormFieldBindingProps<TSchema, TFieldPath, string> & {
		label?: string;
		labelClassName?: string;
	};

export const FormTextArea = <
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
>({
	form,
	path,
	label,
	labelClassName,
	id: idProp,
	disabled,
	required,
	...restProps
}: FormTextAreaProps<TSchema, TFieldPath>) => {
	const generatedId = useId();
	const id = idProp ?? generatedId;

	return (
		<Field<TSchema, TFieldPath> of={form} path={path}>
			{(field) => {
				const error = field.errors?.[0];

				return (
					<FormControl
						data-slot="form-textarea"
						disabled={disabled}
						error={error}
						htmlFor={id}
						label={label}
						labelClassName={labelClassName}
						required={required}
					>
						<Textarea
							{...restProps}
							{...field.props}
							aria-invalid={Boolean(error)}
							disabled={disabled}
							id={id}
							required={required}
							value={getStringInputValue(field.input)}
						/>
					</FormControl>
				);
			}}
		</Field>
	);
};
