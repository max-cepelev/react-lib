import type { Meta } from 'storybook-react-rsbuild';
import { Tabs } from '~/components';

export default {
	title: 'Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Tabs>;

export const BaseUse = () => {
	return (
		<Tabs defaultValue="account">
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">
				<div
					style={{
						height: '200px',
						border: '1px solid var(--color-muted)',
						padding: '1rem',
					}}
				>
					<h1>Account</h1>
					<p>This is the account tab. Here you can manage your account</p>
				</div>
			</Tabs.Content>
			<Tabs.Content value="password">
				<div
					style={{
						height: '200px',
						border: '1px solid var(--color-muted)',
						padding: '1rem',
					}}
				>
					<h1>Password</h1>
					<p>This is the password tab. Here you can manage your password</p>
				</div>
			</Tabs.Content>
		</Tabs>
	);
};

export const Disabled = () => {
	return (
		<Tabs defaultValue="account">
			<Tabs.List>
				<Tabs.Trigger disabled value="account">
					Account
				</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">
				<div
					style={{
						height: '200px',
						border: '1px solid var(--color-muted)',
						padding: '1rem',
					}}
				>
					<h1>Account</h1>
					<p>This is the account tab. Here you can manage your account</p>
				</div>
			</Tabs.Content>
			<Tabs.Content value="password">
				<div
					style={{
						height: '200px',
						border: '1px solid var(--color-muted)',
						padding: '1rem',
					}}
				>
					<h1>Password</h1>
					<p>This is the password tab. Here you can manage your password</p>
				</div>
			</Tabs.Content>
		</Tabs>
	);
};

export const Sizes = () => {
	return (
		<Tabs defaultValue="account">
			<Tabs.List>
				<Tabs.Trigger size="small" value="account">
					Account
				</Tabs.Trigger>
				<Tabs.Trigger size="small" value="password">
					Password
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">
				<div
					style={{
						height: '200px',
						border: '1px solid var(--color-muted)',
						padding: '1rem',
					}}
				>
					<h1>Account</h1>
					<p>This is the account tab. Here you can manage your account</p>
				</div>
			</Tabs.Content>
			<Tabs.Content value="password">
				<div
					style={{
						height: '200px',
						border: '1px solid var(--color-muted)',
						padding: '1rem',
					}}
				>
					<h1>Password</h1>
					<p>This is the password tab. Here you can manage your password</p>
				</div>
			</Tabs.Content>
		</Tabs>
	);
};
