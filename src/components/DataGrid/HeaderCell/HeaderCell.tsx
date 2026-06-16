import type { CSSProperties } from 'react';
import type { DataGridColumn } from '../types';
import { headerCellClass } from './styles.css';

export type HeaderCellProps<T> = {
	column: DataGridColumn<T>;
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
};

export function HeaderCell<TData>({
	column,
	height,
	width,
}: HeaderCellProps<TData>) {
	return (
		<th
			style={{ color: column.color, height, width }}
			align={column.align ?? 'left'}
			title={column.label}
			className={headerCellClass}
		>
			{column.renderHeaderCell?.(column) || column.label}
		</th>
	);
}
