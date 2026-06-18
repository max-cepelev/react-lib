import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import * as styles from './styles.css';
import type { TabsProps } from './types';

function Tabs({
	className,
	orientation = 'horizontal',
	...props
}: TabsProps.Root) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			orientation={orientation}
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

function List({ className, variant = 'default', ...props }: TabsProps.List) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={clsx(styles.list, className)}
			{...props}
		/>
	);
}

function Trigger({ className, ...props }: TabsProps.Trigger) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={clsx(styles.trigger, className)}
			{...props}
		/>
	);
}

function Content({ className, ...props }: TabsProps.Content) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={clsx(styles.content, className)}
			{...props}
		/>
	);
}

Tabs.Content = Content;
Tabs.List = List;
Tabs.Trigger = Trigger;

export { Tabs };
