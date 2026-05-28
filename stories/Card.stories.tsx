import type { Meta } from 'storybook-react-rsbuild';
import { Card } from '~/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Card>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example = () => {
	return (
		<Card>
			<Card.Header>
				<Card.Title>Create project</Card.Title>
				<Card.Description>
					Deploy your new project in one-click.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form>
					<div className="grid w-full items-center gap-4">Hello</div>
				</form>
			</Card.Content>
			<Card.Footer className="flex justify-between">
				{/* biome-ignore lint/a11y/useButtonType: <> */}
				<button>Cancel</button>
				{/* biome-ignore lint/a11y/useButtonType: <> */}
				<button>Deploy</button>
			</Card.Footer>
		</Card>
	);
};
