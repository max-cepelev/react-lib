import { clsx } from 'clsx';
import { useCallback } from 'react';
import { Cell } from '../Cell';
import type { DataGridColumn } from '../types';
import { rowClass, selectableClass } from './styles.css';

type RowProps<TRow> = {
	row: TRow;
	columns: DataGridColumn<TRow>[];
	rowIndex: number;
	rowId: string;
	rowHeight: number;
	onRowClick?: (row: TRow) => void;
};
export function Row<TRow>({
	row,
	rowHeight,
	onRowClick,
	columns,
	rowIndex,
	rowId,
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
