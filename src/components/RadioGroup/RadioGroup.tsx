'use client';

import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import clsx from 'clsx';
import { radioGroupClass } from './styles.css';

export type RadioGroupProps = RadioGroupPrimitive.Props;

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={clsx(radioGroupClass, className)}
			{...props}
		/>
	);
};
