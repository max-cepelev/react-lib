import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { clsx } from 'clsx';
import { content, positioner } from './styles.css';
import type { PopoverProps } from './types';

const createHandle = PopoverPrimitive.createHandle;

const Popover = ({ ...props }: PopoverProps.Root) => (
	<PopoverPrimitive.Root data-slot="popover" {...props} />
);

const Trigger = ({ ...props }: PopoverProps.Trigger) => (
	<PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

const Content = ({
	className,
	align = 'center',
	alignOffset = 0,
	side = 'bottom',
	sideOffset = 4,
	...props
}: PopoverProps.Content) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Positioner
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			className={positioner}
		>
			<PopoverPrimitive.Popup
				data-slot="popover-content"
				className={clsx(content, className)}
				{...props}
			/>
		</PopoverPrimitive.Positioner>
	</PopoverPrimitive.Portal>
);

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Root = Popover;

export { createHandle, Popover };
