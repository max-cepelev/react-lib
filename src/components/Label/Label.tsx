import {
	type LabelProps as LabelPrimitiveProps,
	Root,
} from '@radix-ui/react-label';
import { clsx } from 'clsx';
import * as styles from './label.css';

export type LabelProps = LabelPrimitiveProps & {
	disabled?: boolean;
	error?: boolean;
	required?: boolean;
};
export const Label = ({ className, disabled, ...props }: LabelProps) => (
	<Root
		className={clsx(
			styles.root,
			{
				[styles.disabled]: disabled,
				[styles.error]: props.error,
				[styles.required]: props.required,
			},
			className,
		)}
		{...props}
	/>
);
