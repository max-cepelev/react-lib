import { Checkbox as BaseCheckbox } from '@base-ui/react';
import { clsx } from 'clsx';

import { Check, Minus } from 'lucide-react';
import { checkIcon, indicator, minusIcon, root } from './checkbox.css';

export type CheckboxProps = BaseCheckbox.Root.Props;

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
	<BaseCheckbox.Root
		data-slot="checkbox"
		className={clsx(root, className)}
		{...props}
	>
		<BaseCheckbox.Indicator className={indicator}>
			<Check className={checkIcon} />
			<Minus className={minusIcon} />
		</BaseCheckbox.Indicator>
	</BaseCheckbox.Root>
);
