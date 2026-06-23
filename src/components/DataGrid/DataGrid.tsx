import { clsx } from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
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
	DataGridRowId,
	DataGridSorting,
	DataGridSortMode,
} from './types';
import { useLogic } from './useLogic';

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
	isRowSelectionEnabled?: boolean;
	selectedRowIds?: DataGridRowId[];
	defaultSelectedRowIds?: DataGridRowId[];
	onSelectedRowIdsChange?: (rowIds: DataGridRowId[]) => void;
	onSelectRow?: (row: TRow[]) => void;
	onRowClick?: (row: TRow) => void;
	title?: string;
	footer?: ReactNode;
};

export function DataGrid<TRow>(props: DataGridProps<TRow>) {
	const {
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
		footer,
		title,
		isRowSelectionEnabled,
	} = props;

	const {
		visibleRowIds,
		isAllRowsSelected,
		isSomeRowsSelected,
		handleRowSelectionChange,
		handleAllRowsSelectionChange,
		isFullHeight,
		sortedRows,
		selectedRowIdSet,
	} = useLogic(props);
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
					isSelectionEnabled={isRowSelectionEnabled}
					isAllRowsSelected={isAllRowsSelected}
					isSomeRowsSelected={isSomeRowsSelected}
					isSelectionDisabled={visibleRowIds.length === 0}
					onAllRowsSelectionChange={handleAllRowsSelectionChange}
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
					isRowSelectionEnabled={isRowSelectionEnabled}
					selectedRowIdSet={selectedRowIdSet}
					onRowSelectionChange={handleRowSelectionChange}
				/>
			</table>
			{footer && <Footer>{footer}</Footer>}
		</div>
	);
}
