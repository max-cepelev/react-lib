import { clsx } from 'clsx';
import { useCallback } from 'react';
import { Checkbox } from '../../Checkbox';
import { Cell } from '../Cell';
import type { DataGridColumn, DataGridRowId } from '../types';
import { rowClass, selectableClass, selectionCellClass } from './styles.css';

type RowProps<TRow> = {
	row: TRow;
	columns: DataGridColumn<TRow>[];
	rowIndex: number;
	rowId: DataGridRowId;
	rowHeight: number;
	onRowClick?: (row: TRow) => void;
	isSelectionEnabled?: boolean;
	isSelected?: boolean;
	onSelectionChange?: (rowId: DataGridRowId, isSelected: boolean) => void;
};
export function Row<TRow>({
	row,
	rowHeight,
	onRowClick,
	columns,
	rowIndex,
	rowId,
	isSelectionEnabled,
	isSelected,
	onSelectionChange,
}: RowProps<TRow>) {
	const handleSelect = useCallback(() => {
		onRowClick?.(row);
	}, [onRowClick, row]);

	return (
		<tr
			onClick={handleSelect}
			onKeyDown={handleSelect}
			className={clsx(rowClass, {
				[selectableClass]: Boolean(onRowClick),
			})}
		>
			{isSelectionEnabled && (
				<td
					className={selectionCellClass}
					style={{ height: rowHeight, width: rowHeight }}
				>
					<Checkbox
						checked={isSelected}
						aria-label="Select row"
						onClick={(event) => event.stopPropagation()}
						onKeyDown={(event) => event.stopPropagation()}
						onCheckedChange={(checked) => onSelectionChange?.(rowId, checked)}
					/>
				</td>
			)}
			{columns.map((column, index) => {
				const cellId = `${rowId}-${index}`;
				return (
					<Cell
						row={row}
						rowIndex={rowIndex}
						column={column}
						key={cellId}
						height={rowHeight}
					/>
				);
			})}
		</tr>
	);
}
