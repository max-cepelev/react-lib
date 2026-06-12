import type { Meta } from 'storybook-react-rsbuild';
import { Textarea } from '~/components';

export default {
	title: 'Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Textarea>;

export function Default() {
	return (
		<Textarea
			placeholder="Write a note..."
			style={{ width: 360 }}
			defaultValue="Textarea content"
		/>
	);
}

export function Invalid() {
	return (
		<Textarea
			aria-invalid="true"
			placeholder="Validation message"
			style={{ width: 360 }}
		/>
	);
}

export function Disabled() {
	return (
		<Textarea disabled placeholder="Disabled textarea" style={{ width: 360 }} />
	);
}
