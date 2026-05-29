import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import { badgeVariants, rootClass } from './styles.css';
import type { BadgeVariant } from './types';

function Badge({
	className,
	variant = 'default',
	render,
	...props
}: useRender.ComponentProps<'span'> & {
	variant?: BadgeVariant;
}) {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: clsx(rootClass, badgeVariants[variant], className),
			},
			props,
		),
		render,
		state: {
			slot: 'badge',
			variant,
		},
	});
}

export { Badge, type BadgeVariant, badgeVariants };
