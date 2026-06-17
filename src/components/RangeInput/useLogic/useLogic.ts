import {
	type ChangeEvent,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useId,
	useState,
} from 'react';
import type { SliderValue } from '../../Slider';
import type { RangeInputProps } from '../RangeInput';

const getNumberFromInputValue = (value: string) => {
	const numberValue = Number(value);

	return Number.isNaN(numberValue) ? null : numberValue;
};

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const normalizeRange = (minValue: number, maxValue: number) => {
	if (minValue <= maxValue) {
		return [minValue, maxValue] as const;
	}

	return [maxValue, minValue] as const;
};

const getSliderValue = (
	minValue: number,
	maxValue: number,
	min: number,
	max: number,
) => normalizeRange(clamp(minValue, min, max), clamp(maxValue, min, max));

const getRangeValue = (value: SliderValue) => {
	if (!Array.isArray(value)) {
		return null;
	}

	const [minValue, maxValue] = value;

	if (minValue === undefined || maxValue === undefined) {
		return null;
	}

	return [minValue, maxValue] as const;
};

export const useLogic = ({
	min,
	max,
	maxValue,
	minValue,
	onChange,
}: RangeInputProps) => {
	const minId = useId();
	const maxId = useId();

	const [minVal, setMinVal] = useState(minValue ?? min);
	const [maxVal, setMaxVal] = useState(maxValue ?? max);
	const sliderValue = getSliderValue(minVal, maxVal, min, max);

	const commit = useCallback(
		(nextMinValue: number, nextMaxValue: number) => {
			const [normalizedMinValue, normalizedMaxValue] = normalizeRange(
				clamp(nextMinValue, min, max),
				clamp(nextMaxValue, min, max),
			);

			setMinVal(normalizedMinValue);
			setMaxVal(normalizedMaxValue);
			onChange(normalizedMinValue, normalizedMaxValue);
		},
		[min, max, onChange],
	);

	const onValueChange = useCallback((newValue: SliderValue) => {
		const rangeValue = getRangeValue(newValue);

		if (rangeValue === null) {
			return;
		}

		const [newMinValue, newMaxValue] = rangeValue;
		const [normalizedMinValue, normalizedMaxValue] = normalizeRange(
			newMinValue,
			newMaxValue,
		);

		setMinVal(normalizedMinValue);
		setMaxVal(normalizedMaxValue);
	}, []);

	const onMinValueChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			const numberValue = getNumberFromInputValue(value);

			if (numberValue !== null) {
				setMinVal(numberValue);
			}
		},
		[],
	);

	const onMaxValueChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			const numberValue = getNumberFromInputValue(value);

			if (numberValue !== null) {
				setMaxVal(numberValue);
			}
		},
		[],
	);

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key !== 'Enter') {
				return;
			}

			commit(minVal, maxVal);
		},
		[commit, minVal, maxVal],
	);

	const onConfirm = useCallback(
		(value: SliderValue) => {
			const rangeValue = getRangeValue(value);

			if (rangeValue === null) {
				return;
			}

			const [nextMinValue, nextMaxValue] = rangeValue;
			commit(nextMinValue, nextMaxValue);
		},
		[commit],
	);

	useEffect(() => {
		setMinVal(minValue ?? min);
		setMaxVal(maxValue ?? max);
	}, [minValue, maxValue, min, max]);

	return {
		maxId,
		minId,
		minVal,
		maxVal,
		sliderValue,
		onValueChange,
		onMinValueChange,
		onMaxValueChange,
		onKeyDown,
		onConfirm,
	};
};
