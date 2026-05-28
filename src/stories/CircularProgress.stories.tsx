import type { Meta } from 'storybook-react-rsbuild';
import { CircularProgress } from '~/components';

export default {
	title: 'CircularProgress',
	component: CircularProgress,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof CircularProgress>;

export function Demo() {
	return <CircularProgress size={30} color="primary" />;
}

export function Determinate() {
	return <CircularProgress variant="determinate" value={70} />;
}
