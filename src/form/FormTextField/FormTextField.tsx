import { TextField, type TextFieldProps } from '../../components';
import { FormController } from '../external';
import type { WithFormFieldProps } from '../types';

export type FormTextFieldProps<FieldValues extends object> = WithFormFieldProps<
	TextFieldProps,
	FieldValues
> & {
	trimmed?: boolean;
	gridArea?: string;
};

export function FormTextField<T extends object>({
	name,
	control,
	gridArea,
	...props
}: FormTextFieldProps<T>) {
	return (
		<FormController
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<TextField
					{...props}
					{...field}
					style={{ gridArea }}
					value={field.value || ''}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	);
}
