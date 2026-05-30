import { mergeProps } from '@base-ui/react/merge-props';
import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import * as styles from './styles.css';
import type { ButtonGroupProps } from './types';

function ButtonGroup({
	className,
	orientation = 'horizontal',
	...props
}: ButtonGroupProps.Root) {
	return (
		<fieldset
			data-slot="button-group"
			data-orientation={orientation}
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

function Text({ className, render, ...props }: ButtonGroupProps.Text) {
	return useRender({
		defaultTagName: 'div',
		props: mergeProps<'div'>(
			{
				className: clsx(styles.text, className),
			},
			props,
		),
		render,
		state: {
			slot: 'button-group-text',
		},
	});
}

function Separator({
	className,
	orientation = 'vertical',
	...props
}: ButtonGroupProps.Separator) {
	return (
		<SeparatorPrimitive
			data-slot="button-group-separator"
			data-orientation={orientation}
			orientation={orientation}
			className={clsx(styles.separator, className)}
			{...props}
		/>
	);
}

ButtonGroup.Text = Text;
ButtonGroup.Separator = Separator;

export { ButtonGroup };
