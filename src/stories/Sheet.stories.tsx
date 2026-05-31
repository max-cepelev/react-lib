import type { Meta } from 'storybook-react-rsbuild';
import { Button, Sheet, TextField } from '~/components';

export default {
	title: 'Sheet',
	component: Sheet,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export function Default() {
	return (
		<Sheet>
			<Sheet.Trigger render={<Button variant="outline" />}>
				Open Sheet
			</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Edit profile</Sheet.Title>
					<Sheet.Description>
						Make changes to your profile here. Save when you are done.
					</Sheet.Description>
				</Sheet.Header>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						padding: '0 16px',
					}}
				>
					<TextField label="Name" defaultValue="Ada Lovelace" />
					<TextField label="Username" defaultValue="@ada" />
				</div>
				<Sheet.Footer>
					<Sheet.Close render={<Button />}>Save changes</Sheet.Close>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet>
	);
}

export function Sides() {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Sheet key={side}>
					<Sheet.Trigger render={<Button variant="outline" />}>
						{side}
					</Sheet.Trigger>
					<Sheet.Content side={side}>
						<Sheet.Header>
							<Sheet.Title>{side} sheet</Sheet.Title>
							<Sheet.Description>
								This sheet opens from the {side} side.
							</Sheet.Description>
						</Sheet.Header>
						<div style={{ padding: '0 16px 16px' }}>
							Sheet content for the selected side.
						</div>
					</Sheet.Content>
				</Sheet>
			))}
		</div>
	);
}

export function NoCloseButton() {
	return (
		<Sheet>
			<Sheet.Trigger render={<Button variant="outline" />}>
				Open without close button
			</Sheet.Trigger>
			<Sheet.Content showCloseButton={false}>
				<Sheet.Header>
					<Sheet.Title>No close button</Sheet.Title>
					<Sheet.Description>
						This sheet can still be dismissed by pressing Escape or clicking
						outside.
					</Sheet.Description>
				</Sheet.Header>
				<Sheet.Footer>
					<Sheet.Close render={<Button variant="outline" />}>Close</Sheet.Close>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet>
	);
}
