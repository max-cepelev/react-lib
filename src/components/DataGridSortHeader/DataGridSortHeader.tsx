import { clsx } from 'clsx';
import {
	ArrowDownNarrowWide,
	ArrowDownUp,
	ArrowDownWideNarrow,
} from 'lucide-react';
import type { DataGridColumn } from '../DataGrid';
import { alignments, wrapper } from './styles.css';
import type { DataGridSorting } from './types';

export type DataGridSortHeaderProps<TData> = {
	column: DataGridColumn<TData>;
	sorting: DataGridSorting<TData>;
	onSortingChange?: (sorting: DataGridSorting<TData>) => void;
	setSorting?: (sorting: DataGridSorting<TData>) => void;
	className?: string;
};

export function DataGridSortHeader<TData>({
	sorting,
	onSortingChange,
	setSorting,
	column: { label, field, align = 'left' },
	className,
}: DataGridSortHeaderProps<TData>) {
	if (!field) {
		return null;
	}

	const handleSortingChange = onSortingChange ?? setSorting;
	const activeOrder = sorting?.key === field ? sorting.order : undefined;
	const isActive = Boolean(activeOrder);

	const handleClick = () => {
		if (!handleSortingChange) {
			return;
		}

		if (activeOrder === 'asc') {
			handleSortingChange({
				key: field,
				order: 'desc',
			});
		} else if (isActive) {
			handleSortingChange(null);
		} else {
			handleSortingChange({
				key: field,
				order: 'asc',
			});
		}
	};
	return (
		<button
			type="button"
			className={clsx(wrapper, alignments[align], className)}
			onClick={handleClick}
			disabled={!handleSortingChange}
		>
			{label}
			{isActive ? (
				activeOrder === 'asc' ? (
					<ArrowDownNarrowWide size={16} />
				) : (
					<ArrowDownWideNarrow size={16} />
				)
			) : (
				<ArrowDownUp size={16} />
			)}
		</button>
	);
}
