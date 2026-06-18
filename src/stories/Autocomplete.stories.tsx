import { useEffect, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Autocomplete, Input } from '~/components';

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

export default {
	title: 'Autocomplete',
	component: Autocomplete,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Autocomplete>;

export function Default() {
	const [value, setValue] = useState<string | null>(null);

	return (
		<Autocomplete
			label="Fruit"
			helperText="Choose one fruit from the list"
			options={fruits}
			value={value}
			onChange={setValue}
			placeholder="Select a fruit"
		/>
	);
}

export function Sizes() {
	return (
		<div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
			{(['small', 'medium', 'large'] as const).map((size) => (
				<div
					key={size}
					style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
				>
					<Input
						size={size}
						placeholder={`${size} input`}
						readOnly
						style={{ width: 280 }}
					/>
					<Autocomplete
						size={size}
						options={fruits}
						placeholder={`${size} autocomplete`}
						style={{ width: 280 }}
					/>
					<Autocomplete
						multiple
						size={size}
						defaultValue={['Apple']}
						options={fruits}
						placeholder={`${size} multiple`}
						style={{ width: 280 }}
					/>
				</div>
			))}
		</div>
	);
}

export function ErrorState() {
	return (
		<Autocomplete
			label="Fruit"
			helperText="Fruit is required"
			options={fruits}
			placeholder="Select a fruit"
			error
			required
		/>
	);
}

export function WithObjectItems() {
	const [value, setValue] = useState<FruitOption | null>(fruitOptions[1]);

	return (
		<Autocomplete
			label="Fruit"
			options={fruitOptions}
			value={value}
			onChange={setValue}
			placeholder="Select a fruit"
			getOptionLabel={(option) => option.name}
			getOptionValue={(option) => option.id}
			renderOption={(option) => (
				<>
					<span>{option.name}</span>
					<span style={{ marginLeft: 'auto', opacity: 0.6 }}>
						{option.category}
					</span>
				</>
			)}
		/>
	);
}

export function MultipleWithObjects() {
	const [value, setValue] = useState<FruitOption[]>([
		fruitOptions[1],
		fruitOptions[3],
	]);

	return (
		<Autocomplete<FruitOption>
			multiple
			label="Fruits"
			helperText="Select several fruits"
			options={fruitOptions}
			value={value}
			onChange={setValue}
			placeholder="Add fruit"
			getOptionLabel={(option) => option.name}
			getOptionValue={(option) => option.id}
			fullWidth
			renderOption={(option) => (
				<>
					<span>{option.name}</span>
					<span style={{ marginLeft: 'auto', opacity: 0.6 }}>
						{option.category}
					</span>
				</>
			)}
			style={{ width: 360 }}
		/>
	);
}

export function AsyncOptions() {
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState<FruitOption[]>([]);
	const [value, setValue] = useState<FruitOption | null>(null);

	useEffect(() => {
		if (query.trim().length < 2) {
			setOptions([]);
			setIsLoading(false);
			return;
		}

		setIsLoading(true);

		const timer = window.setTimeout(() => {
			const normalizedQuery = query.trim().toLowerCase();
			setOptions(
				fruitOptions.filter((option) =>
					option.name.toLowerCase().includes(normalizedQuery),
				),
			);
			setIsLoading(false);
		}, 600);

		return () => window.clearTimeout(timer);
	}, [query]);

	return (
		<Autocomplete<FruitOption>
			label="Async fruit"
			helperText="Options are loaded from an external source"
			options={options}
			value={value}
			onChange={setValue}
			onInputValueChange={setQuery}
			placeholder="Type at least 2 characters"
			filter={null}
			isLoading={isLoading}
			noOptionsText={
				query.trim().length < 2
					? 'Type at least 2 characters'
					: 'No fruits found'
			}
			getOptionLabel={(option) => option.name}
			getOptionValue={(option) => option.id}
			style={{ width: 320 }}
		/>
	);
}
