import { Button, type ButtonProps } from '../../components';
import { useFormContext } from '../hooks';

export type FormSubmitButtonProps = Omit<ButtonProps, 'type'>;

/**
 * @description Используется для форм, отображает состояние загрузки, когда форма isSubmitting
 */
export const FormSubmitButton = ({
	children,
	isLoading,
	...props
}: FormSubmitButtonProps) => {
	const { formState } = useFormContext();

	return (
		<Button
			type="submit"
			isLoading={isLoading || formState.isSubmitting}
			{...props}
		>
			{children}
		</Button>
	);
};
