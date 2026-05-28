import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { AlertDialog, Button } from '~/components';

export default {
	title: 'AlertDialog',
	component: AlertDialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export function Default() {
	return (
		<AlertDialog>
			<AlertDialog.Trigger>Open Alert Dialog</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Continue</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	);
}

export function WithMedia() {
	return (
		<AlertDialog>
			<AlertDialog.Trigger>
				<Button>Open Alert Dialog with Media</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Media>
						<AlertCircle />
					</AlertDialog.Media>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Continue</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	);
}

export function SmallSize() {
	return (
		<AlertDialog>
			<AlertDialog.Trigger>
				<Button>Open Small Alert Dialog</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content size="sm">
				<AlertDialog.Header>
					<AlertDialog.Title>Delete account?</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete your account? This action cannot be
						undone.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Delete</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	);
}

export function Controlled() {
	const [open, setOpen] = useState(false);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Controlled Dialog</AlertDialog.Title>
						<AlertDialog.Description>
							This dialog is controlled by React state. Click outside or press
							Escape to close.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action onClick={() => setOpen(false)}>
							Confirm
						</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</div>
	);
}
