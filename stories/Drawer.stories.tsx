import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, Drawer } from '~/components';

export default {
	title: 'Drawer',
	component: Drawer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Drawer>;

export function Demo() {
	const [open, setOpen] = React.useState(false);
	return (
		<Drawer
			open={open}
			closeButton={<Button variant="outline">Cancel</Button>}
			onOpenChange={setOpen}
			trigger={<Button variant="outline">Edit Profile</Button>}
			title="Edit profile"
			description="Make changes to your profile here. Click save when you&apos;re done."
		>
			<div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
				Content
			</div>
		</Drawer>
	);
}
