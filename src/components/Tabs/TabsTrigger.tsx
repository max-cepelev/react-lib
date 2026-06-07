import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import { sizes, triggerClass } from './styles.css';

export type TabsTriggerProps = TabsPrimitive.Tab.Props & {
	size?: 'sm' | 'md' | 'lg';
};
export const TabsTrigger = ({
	className,
	size = 'md',
	...props
}: TabsTriggerProps) => (
	<TabsPrimitive.Tab
		data-slot="tabs-trigger"
		className={clsx(triggerClass, sizes[size], className)}
		{...props}
	/>
);
