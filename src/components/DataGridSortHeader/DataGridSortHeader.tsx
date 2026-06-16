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
	setSorting: (sorting: DataGridSorting<TData>) => void;
	className?: string;
};

export function DataGridSortHeader<TData>({
	sorting,
	setSorting,
	column: { label, field, align = 'left' },
	className,
}: DataGridSortHeaderProps<TData>) {
	if (!field) {
		return null;
	}
	const handleClick = () => {
		if (sorting.key === field) {
			setSorting({
				key: field,
				order: sorting.order === 'asc' ? 'desc' : 'asc',
			});
		} else {
			setSorting({
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
		>
			{label}
			{sorting.key === field ? (
				sorting.order === 'asc' ? (
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
