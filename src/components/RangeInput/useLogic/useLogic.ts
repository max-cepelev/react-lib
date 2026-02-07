import {
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	useEffect,
	useId,
	useState,
} from 'react';
import type { RangeInputProps } from '../RangeInput';

export const useLogic = ({
	min,
	max,
	maxValue,
	minValue,
	onChange,
}: RangeInputProps) => {
	const minId = useId();
	const maxId = useId();

	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);

	const onValueChange = (newValue: number[]) => {
		if (newValue[0] === newValue[1]) {
			onChange(newValue[0], newValue[1]);
			return;
		}
		setMinVal(newValue[0]);
		setMaxVal(newValue[1]);
	};

	const onMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!Number.isNaN(+value)) {
			setMinVal(+value);
		}
	};

	const onMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!Number.isNaN(value)) {
			setMaxVal(+value);
		}
	};

	const onKeyDown = (
		event: DetailedHTMLProps<
			InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		>,
	) => {
		if (event.key === 'Enter') {
			const minValue = minVal >= min && minVal <= max ? minVal : min;
			const maxValue = maxVal >= min && maxVal <= max ? maxVal : max;
			onChange(minValue, maxValue);
		}
	};

	const onConfirm = (value: Array<number>) => {
		onChange(value[0], value[1]);
	};

	useEffect(() => {
		setMinVal(minValue ? minValue : min);
		setMaxVal(maxValue ? maxValue : max);
	}, [minValue, maxValue, min, max]);
	return {
		maxId,
		minId,
		minVal,
		maxVal,
		onValueChange,
		onMinValueChange,
		onMaxValueChange,
		onKeyDown,
		onConfirm,
	};
};
