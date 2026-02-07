import {
	Content,
	Group,
	Icon,
	Item,
	ItemIndicator,
	ItemText,
	Label,
	Portal,
	Root,
	ScrollDownButton,
	ScrollUpButton,
	Separator,
	Trigger,
	Value,
	Viewport,
} from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as styles from './styles.css';

const Select = Root;
const SelectGroup = Group;
const SelectValue = Value;

export type SelectTriggerProps = React.ComponentPropsWithoutRef<
	typeof Trigger
> & {
	size?: 'sm' | 'md' | 'lg';
};
const SelectTrigger = ({
	className,
	children,
	size = 'md',
	...props
}: SelectTriggerProps) => (
	<Trigger
		className={clsx(styles.trigger, styles.sizes[size], className)}
		{...props}
	>
		{children}
		<Icon asChild>
			<ChevronDown className={styles.chevron} />
		</Icon>
	</Trigger>
);

export type ScrollUpButtonProps = React.ComponentPropsWithoutRef<
	typeof ScrollUpButton
>;
const SelectScrollUpButton = ({ className, ...props }: ScrollUpButtonProps) => (
	<ScrollUpButton className={clsx(styles.scrollButton, className)} {...props}>
		<ChevronUp className={styles.icon} />
	</ScrollUpButton>
);

export type ScrollDownButtonProps = React.ComponentPropsWithoutRef<
	typeof ScrollDownButton
>;

const SelectScrollDownButton = ({
	className,
	...props
}: ScrollDownButtonProps) => (
	<ScrollDownButton className={clsx(styles.scrollButton, className)} {...props}>
		<ChevronDown className={styles.icon} />
	</ScrollDownButton>
);

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof Content>;

const SelectContent = ({
	className,
	children,
	position = 'popper',
	...props
}: SelectContentProps) => (
	<Portal>
		<Content
			className={clsx(styles.content, className)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<Viewport className={styles.viewport}>{children}</Viewport>
			<SelectScrollDownButton />
		</Content>
	</Portal>
);

export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof Label>;
const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
	<Label className={`${styles.label} ${className || ''}`} {...props} />
);

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof Item>;
const SelectItem = ({ className, children, ...props }: SelectItemProps) => (
	<Item className={`${styles.item} ${className || ''}`} {...props}>
		<span className={styles.itemIndicatorWrapper}>
			<ItemIndicator>
				<Check className={styles.icon} />
			</ItemIndicator>
		</span>
		<ItemText>{children}</ItemText>
	</Item>
);

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<
	typeof Separator
>;

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
	<Separator className={`${styles.separator} ${className || ''}`} {...props} />
);

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
