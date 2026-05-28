import type { Meta } from 'storybook-react-rsbuild';
import { Accordion } from '~/components';

export default {
	title: 'Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export function Demo() {
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
			<Accordion defaultValue={['item-1']}>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Информация о заказе</Accordion.Trigger>
					<Accordion.Content>
						<p>Сумма заказа: 1 000 руб</p>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>Информация о заказе</Accordion.Trigger>
					<Accordion.Content>
						<p>Сумма заказа: 3 000 руб</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
							placeat assumenda maiores dolores debitis commodi blanditiis, cum
							iste enim laboriosam dolor fugiat vero est odit. In officia est
							voluptate commodi?
						</p>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>Информация о заказе</Accordion.Trigger>
					<Accordion.Content>
						<p>Сумма заказа: 4 000 руб</p>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
