'use client';

import { Indicator, Item } from '@radix-ui/react-radio-group';
import { clsx } from 'clsx';
import { CircleIcon } from 'lucide-react';
import { Label } from '../Label';
import {
	iconClass,
	indicatorClass,
	itemClass,
	itemWrapperClass,
} from './styles.css';

export type RadioGroupItemProps = React.ComponentProps<typeof Item> & {
	label: string;
};

export const RadioGroupItem = ({
	className,
	label,
	...props
}: RadioGroupItemProps) => {
	return (
		<div className={itemWrapperClass}>
			<Item
				data-slot="radio-group-item"
				id={props.id || props.value}
				className={clsx(itemClass, className)}
				{...props}
			>
				<Indicator data-slot="radio-group-indicator" className={indicatorClass}>
					<CircleIcon className={iconClass} />
				</Indicator>
			</Item>
			<Label htmlFor={props.id || props.value} data-slot="radio-group-label">
				{label}
			</Label>
		</div>
	);
};
