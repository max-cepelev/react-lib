import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { Checkbox } from '../../Checkbox';
import { HeaderCell } from '../HeaderCell';
import type { DataGridColumn, DataGridSorting } from '../types';
import { headerRow, selectionHeaderCell } from './styles.css';

type HeaderProps<TData> = {
	columns: DataGridColumn<TData>[];
	height: CSSProperties['height'];
	sorting?: DataGridSorting<TData>;
	onSortingChange?: (sorting: DataGridSorting<TData>) => void;
	isSelectionEnabled?: boolean;
	isAllRowsSelected?: boolean;
	isSomeRowsSelected?: boolean;
	isSelectionDisabled?: boolean;
	onAllRowsSelectionChange?: (isSelected: boolean) => void;
};

export function Header<TData>({
	columns,
	height,
	sorting,
	onSortingChange,
	isSelectionEnabled,
	isAllRowsSelected,
	isSomeRowsSelected,
	isSelectionDisabled,
	onAllRowsSelectionChange,
}: HeaderProps<TData>) {
	return (
		<thead>
			<tr className={clsx(headerRow)}>
				{isSelectionEnabled && (
					<th
						className={selectionHeaderCell}
						style={{ height, width: height }}
						aria-label="Select all rows"
					>
						<Checkbox
							checked={isAllRowsSelected}
							indeterminate={!isAllRowsSelected && isSomeRowsSelected}
							disabled={isSelectionDisabled}
							aria-label="Select all rows"
							onCheckedChange={onAllRowsSelectionChange}
						/>
					</th>
				)}
				{columns.map((col) => (
					<HeaderCell
						key={col.label}
						column={col}
						height={height}
						width={col.width}
						sorting={sorting}
						onSortingChange={onSortingChange}
					/>
				))}
			</tr>
		</thead>
	);
}
