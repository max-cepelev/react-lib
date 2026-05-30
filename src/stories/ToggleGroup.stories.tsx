import { Move, ZoomIn, ZoomOut } from 'lucide-react';
import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { ToggleGroup } from '~/components';

export default {
	title: 'ToggleGroup',
	component: ToggleGroup,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>;

export function Demo() {
	const [filter, setFilter] = React.useState<2 | 1 | 3>(1);

	return (
		<ToggleGroup
			onChange={setFilter}
			value={filter}
			options={[
				{
					label: '1',
					value: 1,
				},
				{
					label: '2',
					value: 2,
				},
				{
					label: '3',
					value: 3,
				},
			]}
		/>
	);
}

export function MultipleWithLabel() {
	const [filters, setFilters] = React.useState([1, 3]);

	return (
		<ToggleGroup
			onChange={setFilters}
			label="Rooms"
			size="lg"
			value={filters}
			multiple
			options={[
				{
					label: '1',
					value: 1,
				},
				{
					label: '2',
					value: 2,
				},
				{
					label: '3',
					value: 3,
				},
			]}
		/>
	);
}

export function IconButtonsWithTitle() {
	const [filters, setFilters] = React.useState([1, 3]);

	return (
		<ToggleGroup
			onChange={setFilters}
			label="Rooms"
			size="lg"
			value={filters}
			multiple
			options={[
				{
					label: <ZoomOut />,
					value: 1,
					title: 'Zoom out',
				},
				{
					label: <ZoomIn />,
					value: 2,
					title: 'Zoom in',
				},
				{
					label: <Move />,
					value: 3,
					title: 'Move',
				},
			]}
		/>
	);
}
