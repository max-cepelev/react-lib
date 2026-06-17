import { clsx } from 'clsx';
import { Slider } from '../Slider';
import { Typography } from '../Typography';
import {
	activeClass,
	container,
	inputClass,
	sizes,
	slider,
	textClass,
} from './styles.css';
import { useLogic } from './useLogic';

export type SliderInputProps = {
	value?: number | null;
	min: number;
	max: number;
	unit?: string;
	onChange: (value: number) => void;
	width?: number | string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	isActive?: boolean;
	inputRef?: React.RefObject<HTMLInputElement>;
};

export function SliderInput({
	min,
	max,
	onChange,
	value,
	width = 150,
	unit = '',
	size = 'medium',
	className,
	isActive,
	inputRef,
}: SliderInputProps) {
	const {
		inputId,
		inputValue,
		onInputValueChange,
		onKeyDown,
		onValueChange,
		onConfirm,
	} = useLogic({
		min,
		max,
		value,
		onChange,
	});

	return (
		<div
			data-slot="slider-input"
			className={clsx(
				container,
				sizes[size],
				{
					[activeClass]: isActive,
				},
				className,
			)}
			style={{
				width,
			}}
		>
			<input
				data-slot="slider-input-field"
				className={inputClass}
				type="text"
				id={inputId}
				value={inputValue}
				onChange={onInputValueChange}
				onKeyDown={onKeyDown}
				ref={inputRef}
			/>
			{unit ? (
				<Typography className={textClass} color="disabled" variant="caption">
					{unit}
				</Typography>
			) : null}
			<Slider
				min={min}
				max={max}
				value={inputValue}
				onValueChange={onValueChange}
				onValueCommit={onConfirm}
				className={slider}
			/>
		</div>
	);
}
