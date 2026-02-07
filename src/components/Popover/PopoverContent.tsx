import {
	Content,
	type PopoverContentProps as ContentProps,
	Portal,
} from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { content } from './styles.css';

export type PopoverContentProps = ContentProps;

export const PopoverContent = ({
	className,
	align = 'center',
	sideOffset = 4,
	...props
}: PopoverContentProps) => (
	<Portal>
		<Content
			align={align}
			sideOffset={sideOffset}
			className={clsx(content, className)}
			{...props}
		/>
	</Portal>
);
