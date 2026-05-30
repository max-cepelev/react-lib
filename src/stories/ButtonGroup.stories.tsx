import { ArchiveIcon, ChevronDownIcon, CopyIcon, PlusIcon } from 'lucide-react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, ButtonGroup } from '~/components';

export default {
	title: 'ButtonGroup',
	component: ButtonGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export function Basic() {
	return (
		<ButtonGroup>
			<Button variant="outline">Archive</Button>
			<Button variant="outline">Report</Button>
			<Button variant="outline">Snooze</Button>
		</ButtonGroup>
	);
}

export function WithTextAndSeparator() {
	return (
		<ButtonGroup>
			<ButtonGroup.Text>
				<ArchiveIcon />
				Inbox
			</ButtonGroup.Text>
			<Button variant="outline">Copy</Button>
			<ButtonGroup.Separator />
			<Button variant="outline">Paste</Button>
		</ButtonGroup>
	);
}

export function SplitButton() {
	return (
		<ButtonGroup>
			<Button variant="outline">Create</Button>
			<ButtonGroup.Separator />
			<Button variant="outline" size="icon" aria-label="Create more">
				<PlusIcon />
			</Button>
		</ButtonGroup>
	);
}

export function NestedGroups() {
	return (
		<ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">
					<CopyIcon />
					Copy
				</Button>
				<Button variant="outline">Paste</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">More</Button>
				<Button variant="outline" size="icon" aria-label="More actions">
					<ChevronDownIcon />
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	);
}

export function Vertical() {
	return (
		<ButtonGroup orientation="vertical">
			<Button variant="outline">Top</Button>
			<Button variant="outline">Middle</Button>
			<Button variant="outline">Bottom</Button>
		</ButtonGroup>
	);
}
