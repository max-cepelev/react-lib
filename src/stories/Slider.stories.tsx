import type { Meta } from 'storybook-react-rsbuild';
import { Slider } from '~/components';

export default {
	title: 'Slider',
	component: Slider,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Slider>;

export function SliderDemo() {
	return (
		<Slider
			style={{ width: '300px', backgroundColor: '#fafafa' }}
			defaultValue={[33]}
			max={100}
			step={1}
		/>
	);
}

export function Range() {
	return (
		<Slider
			style={{ width: '300px' }}
			defaultValue={[25, 50]}
			max={100}
			step={5}
		/>
	);
}

export function Multiple() {
	return (
		<Slider
			style={{ width: '300px' }}
			defaultValue={[10, 20, 70]}
			max={100}
			step={10}
		/>
	);
}

export function Vertical() {
	return (
		<div
			style={{
				display: 'flex',
				height: 160,
				alignItems: 'center',
				justifyContent: 'center',
				gap: 24,
			}}
		>
			<Slider
				style={{ height: '100%' }}
				defaultValue={[50]}
				max={100}
				step={1}
				orientation="vertical"
			/>
			<Slider
				style={{ height: '100%' }}
				defaultValue={[25]}
				max={100}
				step={1}
				orientation="vertical"
			/>
		</div>
	);
}

export function Disabled() {
	return (
		<Slider
			style={{ width: '300px' }}
			defaultValue={[50]}
			max={100}
			step={1}
			disabled
		/>
	);
}
