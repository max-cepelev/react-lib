import type { Meta } from 'storybook-react-rsbuild';
import { RadioGroup, RadioGroupItem } from '~/components';

export default {
	title: 'RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof RadioGroup>;

export const Example = () => {
	return (
		<div
			style={{
				width: 300,
			}}
		>
			<RadioGroup defaultValue="one">
				<RadioGroupItem label="Radio field 1" value="one" />
				<RadioGroupItem label="Radio field 2" value="two" />
				<RadioGroupItem label="Radio field 3" value="three" />
			</RadioGroup>
		</div>
	);
};
