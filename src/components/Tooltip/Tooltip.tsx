import {
	Arrow,
	Content,
	Portal,
	Provider,
	Root,
	type TooltipContentProps,
	Trigger,
} from '@radix-ui/react-tooltip';

import clsx from 'clsx';
import { arrowClass, contentClass, textClass } from './styles.css';

const TooltipProvider = Provider;
const TooltipRoot = Root;
const TooltipTrigger = Trigger;

const TooltipContent = ({
	sideOffset = 4,
	alignOffset,
	ref,
	...props
}: React.ComponentProps<typeof Content>) => (
	<Content ref={ref} sideOffset={sideOffset} {...props} />
);

export type TooltipProps = React.ComponentProps<typeof Root> & {
	text?: string;
	content?: React.ReactNode;
	arrow?: boolean;
	align?: TooltipContentProps['align'];
	sideOffset?: number;
	alignOffset?: number;
	side?: TooltipContentProps['side'];
	className?: string;
	ref?: React.Ref<HTMLButtonElement>;
};

export const Tooltip = ({
	text,
	content,
	children,
	side = 'top',
	sideOffset,
	alignOffset,
	delayDuration = 0,
	className,
	ref,
	...props
}: TooltipProps) => (
	<TooltipProvider delayDuration={delayDuration}>
		<TooltipRoot {...props}>
			<TooltipTrigger ref={ref} asChild>
				{children}
			</TooltipTrigger>
			{content || text ? (
				<Portal>
					<TooltipContent
						className={clsx(contentClass, className)}
						alignOffset={alignOffset}
						sideOffset={sideOffset}
						hideWhenDetached
						side={side}
					>
						{content ?? <p className={textClass}>{text}</p>}
						{props.arrow && <Arrow className={arrowClass} />}
					</TooltipContent>
				</Portal>
			) : null}
		</TooltipRoot>
	</TooltipProvider>
);
