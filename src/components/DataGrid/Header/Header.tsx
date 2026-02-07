import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { HeaderCell } from '../HeaderCell';
import type { DataGridColumn } from '../types';
import { stickyClass } from './styles.css';

type HeaderProps<TData> = {
	columns: DataGridColumn<TData>[];
	height: CSSProperties['height'];
	sticky?: boolean;
};

export function Header<TData>({ columns, height, sticky }: HeaderProps<TData>) {
	return (
		<thead>
			<tr className={clsx({ [stickyClass]: sticky })}>
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
