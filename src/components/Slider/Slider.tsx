'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { clsx } from 'clsx';
import * as React from 'react';
import * as styles from './styles.css';

export type SliderValue = number | readonly number[];

export type SliderProps = SliderPrimitive.Root.Props<SliderValue> & {
	onValueCommit?: (value: SliderValue) => void;
};

const getValues = (
	value: SliderValue | undefined,
	defaultValue: SliderValue | undefined,
	min: number,
	max: number,
) => {
	if (typeof value === 'number') {
		return [value];
	}

	if (Array.isArray(value)) {
		return [...value];
	}

	if (typeof defaultValue === 'number') {
		return [defaultValue];
	}

	if (Array.isArray(defaultValue)) {
		return [...defaultValue];
	}

	return [min, max];
};

export function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	onValueCommit,
	onValueCommitted,
	...props
}: SliderProps) {
	const values = React.useMemo(
		() => getValues(value, defaultValue, min, max),
		[value, defaultValue, min, max],
	);
	const thumbs = React.useMemo(
		() =>
			Array.from({ length: values.length }, (_, thumbIndex) => ({
				key: `slider-thumb-${thumbIndex}`,
				index: thumbIndex,
			})),
		[values.length],
	);

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			className={clsx(styles.root, className)}
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			onValueCommitted={(committedValue, eventDetails) => {
				onValueCommitted?.(committedValue, eventDetails);
				onValueCommit?.(committedValue);
			}}
			{...props}
		>
			<SliderPrimitive.Control className={styles.control}>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className={styles.track}
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className={styles.range}
					/>
				</SliderPrimitive.Track>
				{thumbs.map((thumb) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						key={thumb.key}
						index={thumb.index}
						className={styles.thumb}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}
