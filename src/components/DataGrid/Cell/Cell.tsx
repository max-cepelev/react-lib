import { clsx } from 'clsx';
import type { DataGridColumn } from '../types';
import { cellClass, disabledClass } from './styles.css';

export type CellProps<TRow> = {
	row: TRow;
	column: DataGridColumn<TRow>;
	rowIndex: number;
	height: number;
};

export function Cell<TRow>({ row, column, rowIndex, height }: CellProps<TRow>) {
	const { align, cellColor, isDisabled } = column;
	const Content = () => {
		if (column.renderCell) {
			return column.renderCell(row, rowIndex);
		}
		if (column.format) {
			return column.format(row) || '—';
		}
		if (column.field) {
			return `${row[column.field] || '—'}`;
		}
		return '—';
	};

	return (
		<td
			align={align ?? 'left'}
			style={{
				backgroundColor: cellColor?.(row),
				height,
				width: column.width,
			}}
			className={clsx(
				cellClass,
				{ [disabledClass]: isDisabled },
				column.cellClassName?.(row),
			)}
		>
			<Content />
		</td>
	);
}
