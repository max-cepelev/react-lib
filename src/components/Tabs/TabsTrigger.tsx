import { Trigger } from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import { sizes, triggerClass } from './styles.css';

export type TabsTriggerProps = React.ComponentPropsWithoutRef<
	typeof Trigger
> & {
	size?: 'sm' | 'md' | 'lg';
};
export const TabsTrigger = ({
	className,
	size = 'md',
	...props
}: TabsTriggerProps) => (
	<Trigger className={clsx(triggerClass, sizes[size], className)} {...props} />
);
