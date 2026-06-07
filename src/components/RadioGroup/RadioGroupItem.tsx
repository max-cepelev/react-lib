'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { clsx } from 'clsx';
import { CircleIcon } from 'lucide-react';
import { Label } from '../Label';
import {
	iconClass,
	indicatorClass,
	itemClass,
	itemWrapperClass,
} from './styles.css';

export type RadioGroupItemProps = RadioPrimitive.Root.Props & {
	label: string;
};

export const RadioGroupItem = ({
	className,
	label,
	...props
}: RadioGroupItemProps) => {
	return (
		<div className={itemWrapperClass}>
			<RadioPrimitive.Root
				data-slot="radio-group-item"
				id={props.id || props.value}
				className={clsx(itemClass, className)}
				{...props}
			>
				<RadioPrimitive.Indicator
					data-slot="radio-group-indicator"
					className={indicatorClass}
				>
					<CircleIcon className={iconClass} />
				</RadioPrimitive.Indicator>
			</RadioPrimitive.Root>
			<Label htmlFor={props.id || props.value} data-slot="radio-group-label">
				{label}
			</Label>
		</div>
	);
};
