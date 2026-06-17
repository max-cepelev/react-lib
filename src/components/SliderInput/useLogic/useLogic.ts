import {
	type ChangeEvent,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useId,
	useState,
} from 'react';
import type { SliderValue } from '../../Slider';
import type { SliderInputProps } from '../SliderInput';

const getNumberFromInputValue = (value: string) => {
	const numberValue = Number(value);

	return Number.isNaN(numberValue) ? null : numberValue;
};

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const getSingleValue = (value: SliderValue) => {
	if (Array.isArray(value)) {
		return value[0] ?? null;
	}

	return value;
};

export const useLogic = ({ min, max, value, onChange }: SliderInputProps) => {
	const inputId = useId();
	const [inputValue, setInputValue] = useState(value ?? min);

	const commit = useCallback(
		(nextValue: number) => {
			const normalizedValue = clamp(nextValue, min, max);

			setInputValue(normalizedValue);
			onChange(normalizedValue);
		},
		[min, max, onChange],
	);

	const onValueChange = useCallback((newValue: SliderValue) => {
		const nextValue = getSingleValue(newValue);

		if (nextValue === null) {
			return;
		}

		setInputValue(nextValue);
	}, []);

	const onInputValueChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const numberValue = getNumberFromInputValue(event.target.value);

			if (numberValue !== null) {
				setInputValue(numberValue);
			}
		},
		[],
	);

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key !== 'Enter') {
				return;
			}

			commit(inputValue);
		},
		[commit, inputValue],
	);

	const onConfirm = useCallback(
		(value: SliderValue) => {
			const nextValue = getSingleValue(value);

			if (nextValue === null) {
				return;
			}

			commit(nextValue);
		},
		[commit],
	);

	useEffect(() => {
		setInputValue(value ?? min);
	}, [value, min]);

	return {
		inputId,
		inputValue,
		onInputValueChange,
		onKeyDown,
		onValueChange,
		onConfirm,
	};
};
