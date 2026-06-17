import type { Meta } from 'storybook-react-rsbuild';
import { Spinner } from '~/components';

export default {
	title: 'Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export function Default() {
	return <Spinner />;
}

export function CustomSize() {
	return <Spinner size={32} />;
}
