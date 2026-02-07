import {
	Tabs as Root,
	type TabsContentProps,
	type TabsListProps,
	type TabsProps,
	type TabsTriggerProps,
} from '@radix-ui/react-tabs';
import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

export type { TabsProps, TabsContentProps, TabsListProps, TabsTriggerProps };

export const Tabs = (props: TabsProps) => {
	return <Root {...props} />;
};

Tabs.Content = TabsContent;
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
