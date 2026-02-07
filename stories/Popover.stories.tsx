import type { Meta } from 'storybook-react-rsbuild';
import { Button, Popover, PopoverContent, PopoverTrigger } from '~/components';

export default {
	title: 'Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Popover>;

export const PopoverDemo = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Trigger</Button>
			</PopoverTrigger>
			<PopoverContent side="top">
				Place content for the popover here.
			</PopoverContent>
		</Popover>
	);
};
