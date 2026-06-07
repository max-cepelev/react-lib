import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import { contentClass } from './styles.css';

export type TabsContentProps = TabsPrimitive.Panel.Props;
export type ContentProps = TabsContentProps;

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
	<TabsPrimitive.Panel
		data-slot="tabs-content"
		className={clsx(contentClass, className)}
		{...props}
	/>
);
