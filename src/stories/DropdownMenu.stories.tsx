import {
	Building2Icon,
	CreditCardIcon,
	DownloadIcon,
	EditIcon,
	Trash2Icon,
	WalletIcon,
} from 'lucide-react';
import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, DropdownMenu } from '~/components';

export default {
	title: 'DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof DropdownMenu>;

export const Basic = () => {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button variant="outline" />}>
				Open
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start" style={{ width: 200 }}>
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Item>
						Profile
						<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Billing
						<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Settings
						<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>GitHub</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Item disabled>API</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item variant="destructive">
						Log out
						<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

export const Submenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button variant="outline" />}>
				Open
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item>Team</DropdownMenu.Item>
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent>
								<DropdownMenu.Item>Email</DropdownMenu.Item>
								<DropdownMenu.Item>Message</DropdownMenu.Item>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger>
										More options
									</DropdownMenu.SubTrigger>
									<DropdownMenu.Portal>
										<DropdownMenu.SubContent>
											<DropdownMenu.Item>Calendly</DropdownMenu.Item>
											<DropdownMenu.Item>Slack</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item>Webhook</DropdownMenu.Item>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Sub>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>Advanced...</DropdownMenu.Item>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>
					<DropdownMenu.Item>
						New Team
						<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

export const Checkboxes = () => {
	const [showStatusBar, setShowStatusBar] = useState(true);
	const [showActivityBar, setShowActivityBar] = useState(false);
	const [showPanel, setShowPanel] = useState(false);

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button variant="outline" />}>
				Appearance
			</DropdownMenu.Trigger>
			<DropdownMenu.Content style={{ width: 200 }}>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Appearance</DropdownMenu.Label>
					<DropdownMenu.CheckboxItem
						checked={showStatusBar}
						onCheckedChange={setShowStatusBar}
					>
						Status Bar
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						checked={showActivityBar}
						onCheckedChange={setShowActivityBar}
						disabled
					>
						Activity Bar
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						checked={showPanel}
						onCheckedChange={setShowPanel}
					>
						Panel
					</DropdownMenu.CheckboxItem>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

export const RadioItems = () => {
	const [paymentMethod, setPaymentMethod] = useState('card');

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button variant="outline" />}>
				Payment Method
			</DropdownMenu.Trigger>
			<DropdownMenu.Content style={{ width: 224 }}>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Select Payment Method</DropdownMenu.Label>
					<DropdownMenu.RadioGroup
						value={paymentMethod}
						onValueChange={setPaymentMethod}
					>
						<DropdownMenu.RadioItem value="card">
							<CreditCardIcon />
							Credit Card
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="paypal">
							<WalletIcon />
							PayPal
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="bank">
							<Building2Icon />
							Bank Transfer
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

export const IconsAndRender = () => {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button variant="outline" />}>
				Actions
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" style={{ width: 180 }}>
				<DropdownMenu.Item>
					<EditIcon />
					Edit
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<DownloadIcon />
					Download
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					render={
						<Button variant="ghost" size="sm" fullWidth>
							Rendered with Button
						</Button>
					}
				/>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<Trash2Icon />
					Delete
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
