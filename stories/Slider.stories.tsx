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
