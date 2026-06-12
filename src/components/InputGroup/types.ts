import type { ComponentPropsWithRef } from 'react';
import type { ButtonProps } from '../Button';

export namespace InputGroupProps {
	export type Root = ComponentPropsWithRef<'div'>;

	export type Addon = ComponentPropsWithRef<'div'> & {
		align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
	};

	export type Button = Omit<ButtonProps, 'size' | 'type'> & {
		size?: 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
		type?: 'button' | 'submit' | 'reset';
	};

	export type Text = ComponentPropsWithRef<'span'>;

	export type Input = ComponentPropsWithRef<'input'>;

	export type Textarea = ComponentPropsWithRef<'textarea'>;
}
