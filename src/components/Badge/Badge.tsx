import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { badgeVariants, rootClass } from './styles.css';
import type { BadgeVariant } from './types';

function Badge({
	className,
	variant = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'span'> & {
	asChild?: boolean;
	variant?: BadgeVariant;
}) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot="badge"
			className={clsx(rootClass, badgeVariants[variant], className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants, type BadgeVariant };
