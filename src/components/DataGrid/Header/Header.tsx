import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { HeaderCell } from '../HeaderCell';
import type { DataGridColumn, DataGridSorting } from '../types';
import { headerRow } from './styles.css';

type HeaderProps<TData> = {
	columns: DataGridColumn<TData>[];
	height: CSSProperties['height'];
	sorting?: DataGridSorting<TData>;
	onSortingChange?: (sorting: DataGridSorting<TData>) => void;
};

export function Header<TData>({
	columns,
	height,
	sorting,
	onSortingChange,
}: HeaderProps<TData>) {
	return (
		<thead>
			<tr className={clsx(headerRow)}>
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
