import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { RangeInput } from '~/components';

export default {
	title: 'RangeInput',
	component: RangeInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof RangeInput>;

export function Demo() {
	const [filters, setFilters] = React.useState({
		minEntrance: 1,
		maxEntrance: 3,
	});

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<RangeInput
				label="Цена"
				minValue={filters.minEntrance}
				maxValue={filters.maxEntrance}
				unit="руб."
				size="sm"
				min={1}
				max={10}
				onChange={(min, max) =>
					setFilters({ ...filters, minEntrance: min, maxEntrance: max })
				}
				width={250}
			/>
			<RangeInput
				label="Цена"
				minValue={filters.minEntrance}
				maxValue={filters.maxEntrance}
				unit="руб."
				size="md"
				min={1}
				max={10}
				onChange={(min, max) =>
					setFilters({ ...filters, minEntrance: min, maxEntrance: max })
				}
				width={250}
			/>
			<RangeInput
				label="Цена"
				minValue={filters.minEntrance}
				maxValue={filters.maxEntrance}
				unit="руб."
				size="lg"
				min={1}
				max={10}
				onChange={(min, max) =>
					setFilters({ ...filters, minEntrance: min, maxEntrance: max })
				}
				width={250}
			/>
		</div>
	);
}
