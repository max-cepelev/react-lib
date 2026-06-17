import type { DataGridProps } from '../DataGrid';
import { Row } from '../Row';
import { State } from '../State';
import type { DataGridRowId } from '../types';
import { container } from './styles.css';

export type BodyProps<TRow> = Pick<
	DataGridProps<TRow>,
	| 'emptyState'
	| 'errorState'
	| 'isLoading'
	| 'isError'
	| 'columns'
	| 'rows'
	| 'onRowClick'
	| 'keyId'
	| 'isRowSelectionEnabled'
> & {
	rowHeight: number;
	selectedRowIdSet: Set<DataGridRowId>;
	onRowSelectionChange: (rowId: DataGridRowId, isSelected: boolean) => void;
};

export function Body<TRow>({
	isError,
	isLoading,
	emptyState,
	errorState,
	columns,
	rows,
	rowHeight,
	keyId,
	onRowClick,
	isRowSelectionEnabled,
	selectedRowIdSet,
	onRowSelectionChange,
}: BodyProps<TRow>) {
	const isEmpty = rows.length === 0;
	const isStateVisible = isError || isLoading || isEmpty;
	const columnsLength = columns.length + (isRowSelectionEnabled ? 1 : 0);

	return isStateVisible ? (
		<tbody className={container}>
			<State
				emptyState={emptyState}
				errorState={errorState}
				isEmpty={isEmpty}
				isError={isError}
				isLoading={isLoading}
				columnsLength={columnsLength}
			/>
		</tbody>
	) : (
		<tbody className={container}>
			{rows.map((row, index) => {
				const rowId = getRowId(row[keyId]);
				return (
					<Row
						key={rowId}
						row={row}
						rowId={rowId}
						rowHeight={rowHeight}
						columns={columns}
						onRowClick={onRowClick}
						rowIndex={index}
						isSelectionEnabled={isRowSelectionEnabled}
						isSelected={selectedRowIdSet.has(rowId)}
						onSelectionChange={onRowSelectionChange}
					/>
				);
			})}
		</tbody>
	);
}

function getRowId(value: unknown): DataGridRowId {
	if (typeof value === 'string' || typeof value === 'number') {
		return value;
	}

	return String(value);
}
