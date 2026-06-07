import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import { listClass } from './styles.css';

export type TabsListProps = TabsPrimitive.List.Props;
export const TabsList = ({ className, ...props }: TabsListProps) => (
	<TabsPrimitive.List
		data-slot="tabs-list"
		className={clsx(listClass, className)}
		{...props}
	/>
);
