import { clsx } from 'clsx';
import { Button as BaseButton } from '../Button';
import * as styles from './styles.css';
import type { InputGroupProps } from './types';

function InputGroup({ className, ...props }: InputGroupProps.Root) {
	return (
		<div
			data-slot="input-group"
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

function Addon({
	className,
	align = 'inline-start',
	...props
}: InputGroupProps.Addon) {
	return (
		<div
			data-slot="input-group-addon"
			data-align={align}
			className={clsx(styles.addon, styles.addonAlign[align], className)}
			{...props}
		/>
	);
}

function Button({
	className,
	type = 'button',
	variant = 'ghost',
	size = 'extraSmall',
	...props
}: InputGroupProps.Button) {
	return (
		<BaseButton
			type={type}
			data-size={size}
			variant={variant}
			className={clsx(styles.button, styles.buttonSize[size], className)}
			{...props}
		/>
	);
}

function Text({ className, ...props }: InputGroupProps.Text) {
	return (
		<span
			data-slot="input-group-text"
			className={clsx(styles.text, className)}
			{...props}
		/>
	);
}

function Input({ className, ...props }: InputGroupProps.Input) {
	return (
		<input
			data-slot="input-group-control"
			className={clsx(styles.control, styles.input, className)}
			{...props}
		/>
	);
}

function Textarea({ className, ...props }: InputGroupProps.Textarea) {
	return (
		<textarea
			data-slot="input-group-control"
			className={clsx(styles.control, styles.textarea, className)}
			{...props}
		/>
	);
}

InputGroup.Addon = Addon;
InputGroup.Button = Button;
InputGroup.Text = Text;
InputGroup.Input = Input;
InputGroup.Textarea = Textarea;

export { InputGroup };
