import {
	type TabsList as TabsListPrimitive,
	type TabsPanel,
	Tabs as TabsPrimitive,
	type TabsRoot,
	type TabsTab,
} from '@base-ui/react/tabs';
import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

export type TabsProps = TabsRoot.Props;
export type TabsListProps = TabsListPrimitive.Props;
export type TabsTriggerProps = TabsTab.Props;
export type TabsContentProps = TabsPanel.Props;

export const Tabs = (props: TabsProps) => {
	return <TabsPrimitive.Root data-slot="tabs" {...props} />;
};

Tabs.Content = TabsContent;
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
