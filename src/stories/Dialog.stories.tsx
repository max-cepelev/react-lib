import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, Dialog, TextField } from '~/components';

const scrollableParagraphs = Array.from({ length: 12 }, (_, index) => ({
	id: `dialog-scroll-paragraph-${index + 1}`,
	text: `Dialog content paragraph ${index + 1}. This area demonstrates long content inside the popup while keeping the footer available.`,
}));

export default {
	title: 'Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export function Default() {
	return (
		<Dialog>
			<Dialog.Trigger render={<Button variant="outline" />}>
				Open Dialog
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Edit profile</Dialog.Title>
					<Dialog.Description>
						Make changes to your profile here. Save when you are done.
					</Dialog.Description>
				</Dialog.Header>
				<TextField label="Name" defaultValue="Ada Lovelace" />
				<TextField label="Username" defaultValue="@ada" />
				<Dialog.Footer>
					<Dialog.Close render={<Button variant="outline" />}>
						Cancel
					</Dialog.Close>
					<Button>Save changes</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog>
	);
}

export function NoCloseButton() {
	return (
		<Dialog>
			<Dialog.Trigger render={<Button variant="outline" />}>
				Open without Close Button
			</Dialog.Trigger>
			<Dialog.Content showCloseButton={false}>
				<Dialog.Header>
					<Dialog.Title>No close button</Dialog.Title>
					<Dialog.Description>
						This dialog can still be dismissed by pressing Escape or clicking
						outside.
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog>
	);
}

export function CloseButtonInFooter() {
	return (
		<Dialog>
			<Dialog.Trigger render={<Button variant="outline" />}>
				Share
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Share link</Dialog.Title>
					<Dialog.Description>
						Anyone who has this link will be able to view this project.
					</Dialog.Description>
				</Dialog.Header>
				<TextField label="Link" defaultValue="https://example.com/project" />
				<Dialog.Footer showCloseButton />
			</Dialog.Content>
		</Dialog>
	);
}

export function ScrollableContent() {
	return (
		<Dialog>
			<Dialog.Trigger render={<Button variant="outline" />}>
				Scrollable Content
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Scrollable content</Dialog.Title>
					<Dialog.Description>
						This dialog contains enough body content to verify scrolling.
					</Dialog.Description>
				</Dialog.Header>
				<div style={{ maxHeight: 220, overflowY: 'auto' }}>
					{scrollableParagraphs.map(({ id, text }) => (
						<p key={id}>{text}</p>
					))}
				</div>
				<Dialog.Footer>
					<Dialog.Close render={<Button variant="outline" />}>
						Close
					</Dialog.Close>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog>
	);
}

export function Controlled() {
	const [open, setOpen] = useState(false);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<Button onClick={() => setOpen(true)}>Open controlled dialog</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Controlled dialog</Dialog.Title>
						<Dialog.Description>
							This dialog is controlled by React state. Click outside or press
							Escape to close.
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Dialog.Close render={<Button variant="outline" />}>
							Cancel
						</Dialog.Close>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog>
		</div>
	);
}
