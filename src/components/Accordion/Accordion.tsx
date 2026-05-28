import { Accordion as AccordionPrimitive } from '@base-ui/react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as styles from './styles.css';
import type { AccordionProps } from './types';

function Accordion({ className, ...props }: AccordionProps.Root) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

function Item({ className, ...props }: AccordionProps.Item) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={clsx(styles.item, className)}
			{...props}
		/>
	);
}

function Trigger({ className, children, ...props }: AccordionProps.Trigger) {
	return (
		<AccordionPrimitive.Header className={styles.header}>
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={clsx(styles.trigger, className)}
				{...props}
			>
				{children}
				<ChevronDown
					data-slot="accordion-trigger-icon"
					size={16}
					className={styles.triggerIconDown}
				/>
				<ChevronUp
					data-slot="accordion-trigger-icon"
					size={16}
					className={styles.triggerIconUp}
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function Content({ className, children, ...props }: AccordionProps.Content) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className={clsx(styles.panel, className)}
			{...props}
		>
			<div className={clsx(styles.panelContent, className)}>{children}</div>
		</AccordionPrimitive.Panel>
	);
}

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;

export { Accordion };
