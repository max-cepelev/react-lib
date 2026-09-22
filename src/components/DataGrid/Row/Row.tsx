import { clsx } from 'clsx';
import { memo } from 'react';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Cell } from '../Cell';
import type { DataGridColumn, DataGridRowId } from '../types';
import {
	rowClass,
	selectableClass,
	selectionCellClass,
	selectionCheckbox,
} from './styles.css';
import { useLogic } from './useLogic';

export type RowProps<TRow> = {
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
const RowComponent = <TRow,>({
	row,
	rowHeight,
	onRowClick,
	columns,
	rowIndex,
	rowId,
	isSelectionEnabled,
	isSelected,
	onSelectionChange,
}: RowProps<TRow>) => {
	const { handleSelect, handleSelectionChange, stopPropagation } = useLogic({
		row,
		rowId,
		onRowClick,
		onSelectionChange,
	});

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
						className={selectionCheckbox}
						checked={isSelected}
						aria-label="Select row"
						onClick={stopPropagation}
						onKeyDown={stopPropagation}
						onCheckedChange={handleSelectionChange}
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
};

export const Row = memo(RowComponent) as typeof RowComponent;
