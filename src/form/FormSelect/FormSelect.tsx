import { Field, type FormSchema, type RequiredPath } from '@formisch/react';
import { FormControl, Select, type SelectProps } from '@max-ts/kit';
import type { CSSProperties, ReactNode } from 'react';
import { useId } from 'react';
import type { FormFieldBindingProps, FormFieldInput } from '../types';

type SelectOptionValue = string | number;

type SelectFieldValue<Multiple extends boolean | undefined> =
	Multiple extends true ? SelectOptionValue[] : SelectOptionValue;

type FieldSelectOptionValue<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
	Multiple extends boolean | undefined,
> = Multiple extends true
	? NonNullable<
			FormFieldInput<TSchema, TFieldPath>
		> extends readonly (infer TValue)[]
		? TValue & SelectOptionValue
		: never
	: NonNullable<FormFieldInput<TSchema, TFieldPath>> & SelectOptionValue;

type ControlledSelectProp =
	| 'children'
	| 'defaultValue'
	| 'form'
	| 'inputRef'
	| 'items'
	| 'name'
	| 'onValueChange'
	| 'value';

export type FormSelectProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
	Multiple extends boolean | undefined = false,
> = Omit<
	SelectProps.Root<
		FieldSelectOptionValue<TSchema, TFieldPath, Multiple>,
		Multiple
	>,
	ControlledSelectProp | 'multiple'
> &
	FormFieldBindingProps<TSchema, TFieldPath, SelectFieldValue<Multiple>> & {
		label?: ReactNode;
		labelClassName?: string;
		multiple?: Multiple;
		options: ReadonlyArray<{
			label: ReactNode;
			value: FieldSelectOptionValue<TSchema, TFieldPath, Multiple>;
		}>;
		placeholder?: ReactNode;
		width?: CSSProperties['width'];
	};

export const FormSelect = <
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
	Multiple extends boolean | undefined = false,
>({
	form,
	path,
	label,
	labelClassName,
	options,
	multiple,
	placeholder,
	width = '100%',
	id: idProp,
	disabled,
	required,
	...restProps
}: FormSelectProps<TSchema, TFieldPath, Multiple>) => {
	type Value = FieldSelectOptionValue<TSchema, TFieldPath, Multiple>;
	type RootProps = SelectProps.Root<Value, Multiple>;

	const generatedId = useId();
	const id = idProp ?? generatedId;

	return (
		<Field<TSchema, TFieldPath> of={form} path={path}>
			{(field) => {
				const error = field.errors?.[0];
				const value = field.input as RootProps['value'];
				const handleValueChange = field.onChange as NonNullable<
					RootProps['onValueChange']
				>;

				return (
					<FormControl
						data-slot="form-select"
						disabled={disabled}
						error={error}
						htmlFor={id}
						label={label}
						labelClassName={labelClassName}
						required={required}
					>
						<Select<Value, Multiple>
							{...restProps}
							disabled={disabled}
							id={id}
							inputRef={field.props.ref}
							items={options}
							multiple={multiple}
							name={field.props.name}
							onValueChange={handleValueChange}
							required={required}
							value={value}
						>
							<Select.Trigger aria-invalid={Boolean(error)} style={{ width }}>
								<Select.Value placeholder={placeholder} />
							</Select.Trigger>
							<Select.Content>
								{options.map((option) => (
									<Select.Item key={option.value} value={option.value}>
										{option.label}
									</Select.Item>
								))}
							</Select.Content>
						</Select>
					</FormControl>
				);
			}}
		</Field>
	);
};
