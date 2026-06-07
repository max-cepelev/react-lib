import {
	type TooltipPositioner,
	Tooltip as TooltipPrimitive,
	type TooltipRoot,
} from '@base-ui/react/tooltip';

import clsx from 'clsx';
import {
	arrowClass,
	contentClass,
	positionerClass,
	textClass,
} from './styles.css';

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRootComponent = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipProps = Omit<TooltipRoot.Props, 'children'> & {
	children: React.ReactElement;
	text?: string;
	content?: React.ReactNode;
	arrow?: boolean;
	align?: TooltipPositioner.Props['align'];
	sideOffset?: number;
	alignOffset?: number;
	side?: TooltipPositioner.Props['side'];
	className?: string;
	delayDuration?: number;
	ref?: React.Ref<HTMLButtonElement>;
};

export const Tooltip = ({
	text,
	content,
	children,
	side = 'top',
	sideOffset = 10,
	align = 'center',
	alignOffset,
	arrow,
	delayDuration = 0,
	className,
	ref,
	...props
}: TooltipProps) => (
	<TooltipProvider delay={delayDuration}>
		<TooltipRootComponent {...props}>
			<TooltipTrigger ref={ref} render={children} />
			{content || text ? (
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Positioner
						align={align}
						alignOffset={alignOffset}
						sideOffset={sideOffset}
						side={side}
						className={positionerClass}
					>
						<TooltipPrimitive.Popup
							data-slot="tooltip-content"
							className={clsx(contentClass, className)}
						>
							{content ?? <p className={textClass}>{text}</p>}
							{arrow && <TooltipPrimitive.Arrow className={arrowClass} />}
						</TooltipPrimitive.Popup>
					</TooltipPrimitive.Positioner>
				</TooltipPrimitive.Portal>
			) : null}
		</TooltipRootComponent>
	</TooltipProvider>
);
