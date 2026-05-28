import type { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export namespace AccordionProps {
	export type Root = AccordionPrimitive.Root.Props & {
		className?: string;
	};

	export type Item = AccordionPrimitive.Item.Props & {
		className?: string;
	};

	export type Trigger = AccordionPrimitive.Trigger.Props & {
		className?: string;
		children: React.ReactNode;
	};

	export type Content = AccordionPrimitive.Panel.Props & {
		className?: string;
		children: React.ReactNode;
	};
}
