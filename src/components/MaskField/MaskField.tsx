import { type MaskOptions, useMask } from '@react-input/mask';
import { useCallback } from 'react';
import { TextField, type TextFieldProps } from '../TextField';

export type MaskFieldProps = TextFieldProps & {
	maskProps: MaskOptions;
};

export const MaskField = ({
	maskProps,
	ref,
	...textFieldProps
}: MaskFieldProps) => {
	const maskInputRef = useMask(maskProps);

	const mergedRef = useCallback(
		(element: HTMLInputElement) => {
			// The ref from `useMask`
			(maskInputRef as React.MutableRefObject<HTMLInputElement>).current =
				element;

			// The ref from `react-hook-form` (passed as a prop)
			if (typeof ref === 'function') {
				ref(element);
			} else if (ref) {
				ref.current = element;
			}
		},
		[maskInputRef, ref],
	);

	return <TextField ref={mergedRef} {...textFieldProps} />;
};
