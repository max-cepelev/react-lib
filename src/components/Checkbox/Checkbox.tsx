import {
	type CheckboxProps as CheckboxPrimitiveProps,
	Indicator,
	Root,
} from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';

import { Check } from 'lucide-react';
import { icon, indicator, root } from './checkbox.css';

export type CheckboxProps = CheckboxPrimitiveProps;

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
	<Root className={clsx(root, className)} {...props}>
		<Indicator className={indicator}>
			<Check className={icon} />
		</Indicator>
	</Root>
);
