import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import { sizes, triggerClass } from './styles.css';

export type TabsTriggerProps = TabsPrimitive.Tab.Props & {
	size?: 'small' | 'medium' | 'large';
};
export const TabsTrigger = ({
	className,
	size = 'medium',
	...props
}: TabsTriggerProps) => (
	<TabsPrimitive.Tab
		data-slot="tabs-trigger"
		className={clsx(triggerClass, sizes[size], className)}
		{...props}
	/>
);
