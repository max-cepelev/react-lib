import { clsx } from 'clsx';
import { type CSSProperties, type ReactNode, useMemo } from 'react';
import type { ContentStateProps } from '../ContentState';
import { Body } from './Body';
import { ROW_HEIGHT } from './constants';
import { Footer } from './Footer';
import { Header } from './Header';
import {
	container,
	disabled,
	fullHeight,
	loading,
	table,
	titleClass,
} from './styles.css';
import type {
	DataGridColumn,
	DataGridEmptyState,
	DataGridSorting,
	DataGridSortMode,
} from './types';

export type DataGridProps<TRow> = {
	rows: TRow[];
	columns: DataGridColumn<TRow>[];
	className?: string;
	height?: CSSProperties['height'];
	rowHeight?: number;
	headerHeight?: number;
	keyId: keyof TRow;
	isLoading?: boolean;
	isDisabled?: boolean;
	isError?: boolean;
	emptyState?: DataGridEmptyState;
	errorState?: ContentStateProps.ErrorState;
	sorting?: DataGridSorting<TRow>;
	onSortingChange?: (sorting: DataGridSorting<TRow>) => void;
	sortMode?: DataGridSortMode;
	onSelectRow?: (row: TRow[]) => void;
	onRowClick?: (row: TRow) => void;
	title?: string;
	footer?: ReactNode;
};

export function DataGrid<TRow>({
	rows,
	columns,
	height = '100%',
	className,
	rowHeight = ROW_HEIGHT,
	headerHeight = ROW_HEIGHT,
	keyId,
	onRowClick,
	isLoading,
	isDisabled,
	isError,
	emptyState,
	errorState,
	sorting,
	onSortingChange,
	sortMode = 'client',
	footer,
	title,
}: DataGridProps<TRow>) {
	const sortedRows = useMemo(() => {
		if (!sorting || sortMode === 'manual') {
			return rows;
		}

		const column = columns.find(({ field }) => field === sorting.key);
		const sortDirection = sorting.order === 'asc' ? 1 : -1;

		return rows
			.map((row, index) => ({ row, index }))
			.sort((a, b) => {
				const result =
					column?.sortComparator?.(a.row, b.row) ??
					compareValues(
						column?.sortAccessor
							? column.sortAccessor(a.row)
							: a.row[sorting.key],
						column?.sortAccessor
							? column.sortAccessor(b.row)
							: b.row[sorting.key],
					);

				return result === 0 ? a.index - b.index : result * sortDirection;
			})
			.map(({ row }) => row);
	}, [columns, rows, sortMode, sorting]);

	const isFullHeight = isLoading || isError || rows.length === 0;
	return (
		<div
			data-slot="data-grid"
			style={{ height }}
			className={clsx(container, className)}
		>
			<table
				className={clsx(
					table,
					{
						[disabled]: isDisabled,
						[loading]: isLoading,
						[fullHeight]: isFullHeight,
					},
					className,
				)}
			>
				{title && <caption className={titleClass}>{title}</caption>}
				<Header
					columns={columns}
					height={headerHeight}
					sorting={sorting}
					onSortingChange={onSortingChange}
				/>
				<Body
					rows={sortedRows}
					columns={columns}
					rowHeight={rowHeight}
					keyId={keyId}
					onRowClick={onRowClick}
					isLoading={isLoading}
					emptyState={emptyState}
					errorState={errorState}
					isError={isError}
				/>
			</table>
			{footer && <Footer>{footer}</Footer>}
		</div>
	);
}

function compareValues(a: unknown, b: unknown) {
	if (a == null && b == null) {
		return 0;
	}

	if (a == null) {
		return -1;
	}

	if (b == null) {
		return 1;
	}

	if (a instanceof Date && b instanceof Date) {
		return a.getTime() - b.getTime();
	}

	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}

	return String(a).localeCompare(String(b), undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}
