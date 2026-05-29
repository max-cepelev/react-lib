import type { Meta } from 'storybook-react-rsbuild';
import { Button, Popover } from '~/components';

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
			<Popover.Trigger render={<Button variant="outline">Trigger</Button>} />
			<Popover.Content side="top">
				Place content for the popover here.
			</Popover.Content>
		</Popover>
	);
};
