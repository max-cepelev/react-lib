import type { Meta } from 'storybook-react-rsbuild';
import { Button, Tooltip } from '~/components';

export default {
	title: 'Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Tooltip>;

export function TooltipDemo() {
	return (
		<Tooltip
			text={'Add to library'}
			arrow
			side="top"
			delayDuration={200}
			sideOffset={8}
		>
			<Button variant="outline">Hover</Button>
		</Tooltip>
	);
}

export function Content() {
	return (
		<Tooltip
			content={<p style={{ maxWidth: '200px', color: '#fff' }}>Some content</p>}
			delayDuration={100}
			side="top"
			text="Hover"
			sideOffset={10}
		>
			<Button variant="outline">Hover</Button>
		</Tooltip>
	);
}
