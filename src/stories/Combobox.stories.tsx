import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Combobox, useComboboxAnchor } from '~/components';

const fruits = [
	'Apple',
	'Banana',
	'Blueberry',
	'Grapes',
	'Orange',
	'Pineapple',
	'Strawberry',
];

export default {
	title: 'Combobox',
	component: Combobox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Combobox>;

export function Default() {
	return (
		<Combobox items={fruits}>
			<Combobox.Input placeholder="Select a fruit" showClear />
			<Combobox.Content>
				<Combobox.Empty>No fruits found</Combobox.Empty>
				<Combobox.List>
					{fruits.map((fruit) => (
						<Combobox.Item key={fruit} value={fruit}>
							{fruit}
						</Combobox.Item>
					))}
				</Combobox.List>
			</Combobox.Content>
		</Combobox>
	);
}

export function WithGroups() {
	return (
		<Combobox items={fruits}>
			<Combobox.Input placeholder="Search timezone" />
			<Combobox.Content>
				<Combobox.Empty>No timezone found</Combobox.Empty>
				<Combobox.List>
					<Combobox.Group>
						<Combobox.Label>North America</Combobox.Label>
						<Combobox.Item value="Eastern Standard Time">
							Eastern Standard Time
						</Combobox.Item>
						<Combobox.Item value="Central Standard Time">
							Central Standard Time
						</Combobox.Item>
						<Combobox.Item value="Pacific Standard Time">
							Pacific Standard Time
						</Combobox.Item>
					</Combobox.Group>
					<Combobox.Separator />
					<Combobox.Group>
						<Combobox.Label>Europe</Combobox.Label>
						<Combobox.Item value="Greenwich Mean Time">
							Greenwich Mean Time
						</Combobox.Item>
						<Combobox.Item value="Central European Time">
							Central European Time
						</Combobox.Item>
					</Combobox.Group>
				</Combobox.List>
			</Combobox.Content>
		</Combobox>
	);
}

export function MultipleWithChips() {
	const [value, setValue] = useState<string[]>(['Apple', 'Grapes']);
	const anchor = useComboboxAnchor();

	return (
		<Combobox multiple value={value} onValueChange={setValue} items={fruits}>
			<Combobox.Chips ref={anchor} style={{ width: 360 }}>
				{value.map((fruit) => (
					<Combobox.Chip key={fruit}>{fruit}</Combobox.Chip>
				))}
				<Combobox.ChipsInput
					placeholder={value.length ? undefined : 'Add fruit'}
				/>
			</Combobox.Chips>
			<Combobox.Content anchor={anchor}>
				<Combobox.Empty>No fruits found</Combobox.Empty>
				<Combobox.List>
					{fruits.map((fruit) => (
						<Combobox.Item key={fruit} value={fruit}>
							{fruit}
						</Combobox.Item>
					))}
				</Combobox.List>
			</Combobox.Content>
		</Combobox>
	);
}
