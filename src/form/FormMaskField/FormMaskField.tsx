import { MaskField, type MaskFieldProps } from '../../components';
import { FormController } from '../external';
import type { WithFormFieldProps } from '../types';

export type FormMaskFieldProps<FieldValues extends object> = WithFormFieldProps<
	MaskFieldProps,
	FieldValues
>;

export function FormMaskField<T extends object>({
	name,
	control,
	...props
}: FormMaskFieldProps<T>) {
	return (
		<FormController
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<MaskField
					{...props}
					{...field}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	);
}
