import type { Meta } from 'storybook-react-rsbuild';
import { Card, Carousel } from '~/components';

export default {
	title: 'Carousel',
	component: Carousel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export function Demo() {
	const data = [
		{
			id: 1,
			title: 'One',
		},
		{
			id: 2,
			title: 'Two',
		},
		{
			id: 3,
			title: 'Three',
		},
		{
			id: 4,
			title: 'Four',
		},
	];
	return (
		<Carousel
			keyId="id"
			data={data}
			width={500}
			showDots
			showArrows
			renderItem={(item) => (
				<Card style={{ height: 400, padding: 6 }}>
					<Card.Content
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<span
							style={{
								fontWeight: 500,
								fontSize: '1.5rem',
							}}
						>
							{item.title}
						</span>
					</Card.Content>
				</Card>
			)}
		/>
	);
}

export function Vertical() {
	const data = [
		{
			id: 1,
			title: 'One',
		},
		{
			id: 2,
			title: 'Two',
		},
		{
			id: 3,
			title: 'Three',
		},
		{
			id: 4,
			title: 'Four',
		},
	];
	return (
		<Carousel
			keyId="id"
			data={data}
			width={500}
			height={400}
			showDots
			showArrows
			orientation="vertical"
			renderItem={(item) => (
				<div style={{ padding: 10, height: '100%' }}>
					<Card style={{ height: '100%', padding: 10 }}>
						<Card.Content
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100%',
							}}
						>
							<span
								style={{
									fontWeight: 500,
									fontSize: '1.5rem',
								}}
							>
								{item.title}
							</span>
						</Card.Content>
					</Card>
				</div>
			)}
		/>
	);
}
