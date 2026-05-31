import { FileText, Inbox, Plus } from 'lucide-react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, Empty, Input } from '~/components';

export default {
	title: 'Empty',
	component: Empty,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export function Default() {
	return (
		<div style={{ width: 420, minHeight: 320 }}>
			<Empty>
				<Empty.Header>
					<Empty.Media>
						<Inbox />
					</Empty.Media>
					<Empty.Title>No projects found</Empty.Title>
					<Empty.Description>
						Create a project to keep work, settings, and activity in one place.
					</Empty.Description>
				</Empty.Header>
				<Empty.Content>
					<Button startAdornment={<Plus />}>Create project</Button>
				</Empty.Content>
			</Empty>
		</div>
	);
}

export function IconMedia() {
	return (
		<div style={{ width: 420, minHeight: 320 }}>
			<Empty>
				<Empty.Header>
					<Empty.Media variant="icon">
						<FileText />
					</Empty.Media>
					<Empty.Title>No documents</Empty.Title>
					<Empty.Description>
						Upload a document or use the search field to narrow the current
						filters.
					</Empty.Description>
				</Empty.Header>
				<Empty.Content>
					<Input fullWidth placeholder="Search documents" />
					<Button fullWidth variant="outline">
						Upload document
					</Button>
				</Empty.Content>
			</Empty>
		</div>
	);
}

export function WithLink() {
	return (
		<div style={{ width: 420, minHeight: 320 }}>
			<Empty>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Inbox />
					</Empty.Media>
					<Empty.Title>Nothing here yet</Empty.Title>
					<Empty.Description>
						Read the <a href="https://example.com">setup guide</a> before adding
						the first item.
					</Empty.Description>
				</Empty.Header>
			</Empty>
		</div>
	);
}
