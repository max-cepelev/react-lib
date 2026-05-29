import type { Meta } from 'storybook-react-rsbuild';
import { Button, Tooltip } from '~/components';

export default {
	title: 'Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = () => <Button>Default</Button>;

export const Outline = () => <Button variant="outline">Outline</Button>;

export const Destructive = () => (
	<Button variant="destructive">Destructive</Button>
);

export const Large = () => <Button size="lg">Large</Button>;

export const Small = () => <Button size="sm">Small</Button>;

export const Link = () => <Button variant="link">Link</Button>;

export const Ghost = () => <Button variant="ghost">Ghost</Button>;

export const Disabled = () => (
	<Tooltip arrow text="disabled">
		<span>
			<Button disabled>Disabled</Button>
		</span>
	</Tooltip>
);

export const Loading = () => <Button isLoading>Loading</Button>;

export const StartAdornment = () => (
	<Button startAdornment="+">StartAdornment</Button>
);

export const RenderLink = () => (
	<Button variant="link" render={<a href="/">Hello</a>} />
);
