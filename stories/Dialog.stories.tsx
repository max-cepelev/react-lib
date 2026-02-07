import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, Dialog } from '~/components';

export default {
	title: 'Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Dialog>;

export const DialogDemo = () => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog
			open={open}
			trigger={<Button>Trigger</Button>}
			onOpenChange={() => setOpen(!open)}
			title="Are you absolutely sure?"
			description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
		>
			<div>erdfodfksdflkw</div>
		</Dialog>
	);
};
