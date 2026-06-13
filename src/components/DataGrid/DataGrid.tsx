import { clsx } from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
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
import type { DataGridColumn, DataGridState } from './types';

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
	emptyState?: DataGridState;
	errorState?: DataGridState;
	onSelectRow?: (row: TRow[]) => void;
	onRowClick?: (row: TRow) => void;
	onRetry?: () => void;
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
	footer,
	title,
	onRetry,
}: DataGridProps<TRow>) {
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
				<Header columns={columns} height={headerHeight} />
				<Body
					rows={rows}
					columns={columns}
					rowHeight={rowHeight}
					keyId={keyId}
					onRowClick={onRowClick}
					isLoading={isLoading}
					emptyState={emptyState}
					errorState={errorState}
					isError={isError}
					onRetry={onRetry}
				/>
			</table>
			{footer && <Footer>{footer}</Footer>}
		</div>
	);
}
