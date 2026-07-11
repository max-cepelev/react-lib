import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Card, Carousel } from '~/components';

type Story = StoryObj<typeof Carousel>;

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
		<Carousel style={{ width: 500, height: 400 }}>
			<Carousel.Content>
				{data.map((item) => (
					<Carousel.Item key={item.id}>
						<Card style={{ height: '100%', padding: 6 }}>
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
					</Carousel.Item>
				))}
			</Carousel.Content>
			<Carousel.Arrows />
			<Carousel.Dots />
		</Carousel>
	);
}

export function StartAligned() {
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
		<Carousel align="start" style={{ width: 500, height: 400 }}>
			<Carousel.Content>
				{data.map((item) => (
					<Carousel.Item key={item.id}>
						<Card style={{ height: '100%', padding: 6 }}>
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
					</Carousel.Item>
				))}
			</Carousel.Content>
			<Carousel.Arrows />
			<Carousel.Dots />
		</Carousel>
	);
}

export const MultipleItemsPerView: Story = {
	args: {
		align: 'start',
	},
	render: ({ align }) => {
		const data = Array.from({ length: 8 }, (_, index) => ({
			id: index + 1,
			title: `Item ${index + 1}`,
		}));

		return (
			<Carousel align={align} style={{ width: 500, height: 240 }}>
				<Carousel.Content>
					{data.map((item) => (
						<Carousel.Item
							key={item.id}
							style={{ flexBasis: 160, height: '100%' }}
						>
							<Card style={{ height: '100%', padding: 6 }}>
								<Card.Content
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									}}
								>
									<span>{item.title}</span>
								</Card.Content>
							</Card>
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.Arrows />
				<Carousel.Dots />
			</Carousel>
		);
	},
};

export const InitialIndex: Story = {
	args: {
		initialIndex: 2,
	},
	render: ({ initialIndex }) => {
		const data = ['One', 'Two', 'Three', 'Four'];

		return (
			<Carousel initialIndex={initialIndex} style={{ width: 500, height: 240 }}>
				<Carousel.Content>
					{data.map((title) => (
						<Carousel.Item key={title}>
							<Card style={{ height: '100%', padding: 6 }}>
								<Card.Content
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									}}
								>
									<span>{title}</span>
								</Card.Content>
							</Card>
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.Arrows />
				<Carousel.Dots />
			</Carousel>
		);
	},
};

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
		<Carousel orientation="vertical" style={{ width: 500, height: 400 }}>
			<Carousel.Content>
				{data.map((item) => (
					<Carousel.Item key={item.id}>
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
					</Carousel.Item>
				))}
			</Carousel.Content>
			<Carousel.Arrows />
			<Carousel.Dots />
		</Carousel>
	);
}
