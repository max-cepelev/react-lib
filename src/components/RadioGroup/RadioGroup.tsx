'use client';

import { Root } from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { radioGroupClass } from './styles.css';

export type RadioGroupProps = React.ComponentProps<typeof Root>;

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
	return (
		<Root
			data-slot="radio-group"
			className={clsx(radioGroupClass, className)}
			{...props}
		/>
	);
};
