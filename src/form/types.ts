import type {
	FieldProps,
	FieldStore,
	FormSchema,
	RequiredPath,
} from '@formisch/react';

export type FormFieldInput<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = FieldStore<TSchema, TFieldPath>['input'];

export type FormFieldPath<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
> = FieldProps<TSchema, TFieldPath>['path'];

export type CompatibleFormFieldPath<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
	TValue,
> = FormFieldPath<TSchema, TFieldPath> &
	([NonNullable<FormFieldInput<TSchema, TFieldPath>>] extends [TValue]
		? unknown
		: never);

export type FormFieldBindingProps<
	TSchema extends FormSchema,
	TFieldPath extends RequiredPath,
	TValue,
> = {
	form: FieldProps<TSchema, TFieldPath>['of'];
	path: CompatibleFormFieldPath<TSchema, TFieldPath, TValue>;
};

export type NativeFieldBindingProp =
	| 'autoFocus'
	| 'defaultValue'
	| 'form'
	| 'name'
	| 'onBlur'
	| 'onChange'
	| 'onFocus'
	| 'ref'
	| 'value';
