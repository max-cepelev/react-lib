import { BellIcon, LockIcon, UserIcon } from 'lucide-react';
import type { Meta } from 'storybook-react-rsbuild';
import { Tabs } from '~/components';
import { theme } from '~/theme';

export default {
	title: 'Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				width: 420,
				minHeight: 160,
				padding: theme.spacing[4],
				border: `1px solid ${theme.colors.border}`,
				borderRadius: theme.borderRadius.md,
			}}
		>
			{children}
		</div>
	);
}

function TabContents() {
	return (
		<>
			<Tabs.Content value="account">
				<Content>Manage your account details.</Content>
			</Tabs.Content>
			<Tabs.Content value="password">
				<Content>Update your password and security settings.</Content>
			</Tabs.Content>
			<Tabs.Content value="notifications">
				<Content>Configure your notification preferences.</Content>
			</Tabs.Content>
		</>
	);
}

function TabList({ variant = 'default' }: { variant?: 'default' | 'line' }) {
	return (
		<Tabs.List variant={variant}>
			<Tabs.Trigger value="account">
				<UserIcon />
				Account
			</Tabs.Trigger>
			<Tabs.Trigger value="password">
				<LockIcon />
				Password
			</Tabs.Trigger>
			<Tabs.Trigger value="notifications">
				<BellIcon />
				Notifications
			</Tabs.Trigger>
		</Tabs.List>
	);
}

export function Default() {
	return (
		<Tabs defaultValue="account">
			<TabList />
			<TabContents />
		</Tabs>
	);
}

export function Line() {
	return (
		<Tabs defaultValue="account">
			<TabList variant="line" />
			<TabContents />
		</Tabs>
	);
}

export function Vertical() {
	return (
		<Tabs defaultValue="account" orientation="vertical">
			<TabList />
			<TabContents />
		</Tabs>
	);
}

export function VerticalLine() {
	return (
		<Tabs defaultValue="account" orientation="vertical">
			<TabList variant="line" />
			<TabContents />
		</Tabs>
	);
}

export function Disabled() {
	return (
		<Tabs defaultValue="account">
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password" disabled>
					Password
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">
				<Content>Account tab is active.</Content>
			</Tabs.Content>
			<Tabs.Content value="password">
				<Content>Password tab is disabled.</Content>
			</Tabs.Content>
		</Tabs>
	);
}
