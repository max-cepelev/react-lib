import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Accordion } from '~/components';

export default {
	title: 'Accordion',
	component: Accordion,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export function Demo() {
	const [accordionId, setAccordionId] = useState<number | null>(null);

	const handleToggle = (id: number) => {
		if (accordionId === id) {
			setAccordionId(null);
		} else {
			setAccordionId(id);
		}
	};
	return (
		<div
			style={{
				width: 900,
				height: 600,
				display: 'flex',
				flexDirection: 'column',
				gap: 5,
			}}
		>
			<Accordion
				isOpen={accordionId === 0}
				onToggle={() => handleToggle(0)}
				summary={'Информация о заказе'}
			>
				<p>Сумма заказа: 1 000 руб</p>
			</Accordion>
			<Accordion
				isOpen={accordionId === 1}
				onToggle={() => handleToggle(1)}
				summary={'Информация о заказе'}
			>
				<p>Сумма заказа: 3 000 руб</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
					placeat assumenda maiores dolores debitis commodi blanditiis, cum iste
					enim laboriosam dolor fugiat vero est odit. In officia est voluptate
					commodi?
				</p>
			</Accordion>
			<Accordion
				isOpen={accordionId === 2}
				onToggle={() => handleToggle(2)}
				summary={'Информация о заказе'}
			>
				<p>Сумма заказа: 4 000 руб</p>
			</Accordion>
		</div>
	);
}
