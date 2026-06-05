'use client';

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import type { CollapsibleProps } from './types';

function Collapsible({ ...props }: CollapsibleProps.Root) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function Trigger({ ...props }: CollapsibleProps.Trigger) {
	return (
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
	);
}

function Content({ ...props }: CollapsibleProps.Content) {
	return (
		<CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
	);
}

Collapsible.Trigger = Trigger;
Collapsible.Content = Content;

export { Collapsible };
