import { clsx } from 'clsx';
import * as styles from './label.css';

export type LabelProps = React.ComponentProps<'label'> & {
	disabled?: boolean;
	error?: boolean;
	required?: boolean;
};

export const Label = ({ className, disabled, error, ...props }: LabelProps) => (
	// biome-ignore lint/a11y/noLabelWithoutControl: reusable label wrapper may receive htmlFor from consumers.
	<label
		data-slot="label"
		className={clsx(
			styles.root,
			{
				[styles.disabled]: disabled,
				[styles.error]: error,
				[styles.required]: props.required,
			},
			className,
		)}
		{...props}
	/>
);
