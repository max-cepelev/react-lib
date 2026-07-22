import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { Checkbox, type CheckboxProps, FormControl } from '@max-ts/kit';
import { useId } from 'react';
import type { FormFieldBindingProps } from '../types';

type ControlledCheckboxProp =
	| 'checked'
	| 'className'
	| 'defaultChecked'
	| 'form'
	| 'inputRef'
	| 'name'
	| 'onCheckedChange';

export type FormCheckboxFieldProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = Omit<CheckboxProps, ControlledCheckboxProp> &
	FormFieldBindingProps<TSchema, TFieldPath, boolean> & {
		label: string;
		className?: string;
		checkboxClassName?: string;
		labelClassName?: string;
	};

export const FormCheckboxField = <
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
>({
	form,
	path,
	label,
	className,
	checkboxClassName,
	labelClassName,
	id: idProp,
	disabled,
	required,
	...restProps
}: FormCheckboxFieldProps<TSchema, TFieldPath>) => {
	const generatedId = useId();
	const id = idProp ?? generatedId;

	return (
		<Field<TSchema, TFieldPath> of={form} path={path}>
			{(field) => {
				const error = field.errors?.[0];
				const handleCheckedChange = field.onChange as (
					checked: boolean,
				) => void;

				return (
					<FormControl
						className={className}
						data-slot="form-checkbox-field"
						disabled={disabled}
						error={error}
						htmlFor={id}
						label={label}
						labelClassName={labelClassName}
						orientation="inline"
						required={required}
					>
						<Checkbox
							{...restProps}
							aria-invalid={Boolean(error)}
							checked={field.input === true}
							className={checkboxClassName}
							disabled={disabled}
							id={id}
							inputRef={field.props.ref}
							name={field.props.name}
							onCheckedChange={handleCheckedChange}
							required={required}
						/>
					</FormControl>
				);
			}}
		</Field>
	);
};
