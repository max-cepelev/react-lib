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

type FruitOption = {
	id: string;
	name: string;
	category: string;
};

const fruitOptions: FruitOption[] = [
	{ id: 'apple', name: 'Apple', category: 'Pome' },
	{ id: 'banana', name: 'Banana', category: 'Berry' },
	{ id: 'blueberry', name: 'Blueberry', category: 'Berry' },
	{ id: 'grapes', name: 'Grapes', category: 'Berry' },
	{ id: 'orange', name: 'Orange', category: 'Citrus' },
	{ id: 'pineapple', name: 'Pineapple', category: 'Tropical' },
	{ id: 'strawberry', name: 'Strawberry', category: 'Aggregate' },
];

const getFruitLabel = (fruit: FruitOption) => fruit.name;
const getFruitValue = (fruit: FruitOption) => fruit.id;
const isSameFruit = (item: FruitOption, value: FruitOption) =>
	item.id === value.id;

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

export function WithObjectItems() {
	const [value, setValue] = useState<FruitOption | null>(fruitOptions[1]);

	return (
		<Combobox<FruitOption>
			items={fruitOptions}
			value={value}
			onValueChange={setValue}
			itemToStringLabel={getFruitLabel}
			itemToStringValue={getFruitValue}
			isItemEqualToValue={isSameFruit}
		>
			<Combobox.Input placeholder="Select a fruit" showClear />
			<Combobox.Content>
				<Combobox.Empty>No fruits found</Combobox.Empty>
				<Combobox.List>
					{(fruit: FruitOption) => (
						<Combobox.Item key={fruit.id} value={fruit}>
							<span>{fruit.name}</span>
							<span style={{ marginLeft: 'auto', opacity: 0.6 }}>
								{fruit.category}
							</span>
						</Combobox.Item>
					)}
				</Combobox.List>
			</Combobox.Content>
		</Combobox>
	);
}

export function MultipleObjectItemsWithChips() {
	const [value, setValue] = useState<FruitOption[]>([
		fruitOptions[1],
		fruitOptions[3],
	]);
	const anchor = useComboboxAnchor();

	return (
		<Combobox<FruitOption, true>
			multiple
			items={fruitOptions}
			value={value}
			onValueChange={setValue}
			itemToStringLabel={getFruitLabel}
			itemToStringValue={getFruitValue}
			isItemEqualToValue={isSameFruit}
		>
			<Combobox.Chips ref={anchor} style={{ width: 360 }}>
				{value.map((fruit) => (
					<Combobox.Chip key={fruit.id}>{fruit.name}</Combobox.Chip>
				))}
				<Combobox.ChipsInput
					placeholder={value.length ? undefined : 'Add fruit'}
				/>
			</Combobox.Chips>
			<Combobox.Content anchor={anchor}>
				<Combobox.Empty>No fruits found</Combobox.Empty>
				<Combobox.List>
					{(fruit: FruitOption) => (
						<Combobox.Item key={fruit.id} value={fruit}>
							<span>{fruit.name}</span>
							<span style={{ marginLeft: 'auto', opacity: 0.6 }}>
								{fruit.category}
							</span>
						</Combobox.Item>
					)}
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
						<Combobox.GroupLabel>North America</Combobox.GroupLabel>
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
						<Combobox.GroupLabel>Europe</Combobox.GroupLabel>
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
