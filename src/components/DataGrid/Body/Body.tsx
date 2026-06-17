import type { DataGridProps } from '../DataGrid';
import { Row } from '../Row';
import { State } from '../State';
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
> & {
	rowHeight: number;
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
}: BodyProps<TRow>) {
	const isEmpty = rows.length === 0;
	const isStateVisible = isError || isLoading || isEmpty;
	return isStateVisible ? (
		<tbody className={container}>
			<State
				emptyState={emptyState}
				errorState={errorState}
				isEmpty={isEmpty}
				isError={isError}
				isLoading={isLoading}
				columnsLength={columns.length}
			/>
		</tbody>
	) : (
		<tbody className={container}>
			{rows.map((row, index) => {
				const rowId = String(row[keyId]);
				return (
					<Row
						key={row[keyId] as string}
						row={row}
						rowId={rowId}
						rowHeight={rowHeight}
						columns={columns}
						onRowClick={onRowClick}
						rowIndex={index}
					/>
				);
			})}
		</tbody>
	);
}
