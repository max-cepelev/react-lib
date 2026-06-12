import { clsx } from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import * as styles from './styles.css';

export type TextareaProps = ComponentPropsWithRef<'textarea'>;

function Textarea({ className, ...props }: TextareaProps) {
	return (
		<textarea
			data-slot="textarea"
			className={clsx(styles.textarea, className)}
			{...props}
		/>
	);
}

export { Textarea };
