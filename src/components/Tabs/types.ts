import type { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

export type TabsVariant = 'default' | 'line';

export namespace TabsProps {
	export type Root = TabsPrimitive.Root.Props;

	export type List = TabsPrimitive.List.Props & {
		variant?: TabsVariant;
	};

	export type Trigger = TabsPrimitive.Tab.Props;

	export type Content = TabsPrimitive.Panel.Props;
}

export type TabsRootProps = TabsProps.Root;
export type TabsListProps = TabsProps.List;
export type TabsTriggerProps = TabsProps.Trigger;
export type TabsContentProps = TabsProps.Content;
