import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { HeaderCell } from '../HeaderCell';
import type { DataGridColumn } from '../types';
import { headerRow } from './styles.css';

type HeaderProps<TData> = {
	columns: DataGridColumn<TData>[];
	height: CSSProperties['height'];
};

export function Header<TData>({ columns, height }: HeaderProps<TData>) {
	return (
		<thead>
			<tr className={clsx(headerRow)}>
				{columns.map((col) => (
					<HeaderCell
						key={col.title}
						column={col}
						height={height}
						width={col.width}
					/>
				))}
			</tr>
		</thead>
	);
}
