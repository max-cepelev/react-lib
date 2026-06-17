import type { CSSProperties } from 'react';
import { DataGridSortHeader } from '../../DataGridSortHeader';
import type { DataGridColumn, DataGridSorting } from '../types';
import { headerCellClass } from './styles.css';

export type HeaderCellProps<T> = {
	column: DataGridColumn<T>;
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
	sorting?: DataGridSorting<T>;
	onSortingChange?: (sorting: DataGridSorting<T>) => void;
};

export function HeaderCell<TData>({
	column,
	height,
	width,
	sorting,
	onSortingChange,
}: HeaderCellProps<TData>) {
	const content =
		column.renderHeaderCell?.(column) ||
		(column.sortable ? (
			<DataGridSortHeader
				column={column}
				sorting={sorting ?? null}
				onSortingChange={onSortingChange}
			/>
		) : (
			column.label
		));

	return (
		<th
			style={{ color: column.color, height, width }}
			align={column.align ?? 'left'}
			title={column.label}
			className={headerCellClass}
		>
			{content}
		</th>
	);
}
