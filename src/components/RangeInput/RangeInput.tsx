import { clsx } from 'clsx';
import { Slider } from '../Slider';
import { Typography } from '../Typography';
import {
	activeClass,
	container,
	inputClass,
	sizes,
	sliderClass,
	textClass,
} from './styles.css';
import { useLogic } from './useLogic';

export type RangeInputProps = {
	minValue?: number | null;
	maxValue?: number | null;
	min: number;
	max: number;
	unit?: string;
	onChange: (minValue: number, maxValue: number) => void;
	width?: number | string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	isActive?: boolean;
	minInputRef?: React.RefObject<HTMLInputElement>;
	maxInputRef?: React.RefObject<HTMLInputElement>;
};

export function RangeInput({
	min,
	max,
	onChange,
	minValue,
	maxValue,
	width = 150,
	unit = '',
	size = 'medium',
	className,
	isActive,
	minInputRef,
	maxInputRef,
}: RangeInputProps) {
	const {
		onMinValueChange,
		onMaxValueChange,
		minVal,
		maxVal,
		onKeyDown,
		onValueChange,
		onConfirm,
		minId,
		maxId,
	} = useLogic({
		min,
		max,
		maxValue,
		minValue,
		onChange,
	});
	return (
		<div
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
			<Typography className={textClass} color="disabled" variant="caption">
				от
			</Typography>
			<input
				className={inputClass}
				type="text"
				id={minId}
				value={minVal}
				onChange={onMinValueChange}
				onKeyDown={onKeyDown}
				ref={minInputRef}
			/>
			<Typography className={textClass} color="disabled" variant="caption">
				до
			</Typography>
			<input
				className={inputClass}
				type="text"
				id={maxId}
				value={maxVal}
				onChange={onMaxValueChange}
				onKeyDown={onKeyDown}
				ref={maxInputRef}
			/>
			<Typography className={textClass} color="disabled" variant="caption">
				{unit}
			</Typography>
			<div className={sliderClass}>
				<Slider
					min={min}
					max={max}
					value={[Number(minVal), Number(maxVal)]}
					onValueChange={onValueChange}
					onValueCommit={onConfirm}
				/>
			</div>
		</div>
	);
}
