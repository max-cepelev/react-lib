import { useCallback, useMemo, useState } from 'react';
import type { DataGridProps } from '../DataGrid';
import type { DataGridRowId } from '../types';
import { compareValues, getRowId } from './utils';

export const useLogic = <TRow>({
	sorting,
	sortMode = 'client',
	rows,
	columns,
	selectedRowIds,
	onSelectRow,
	onSelectedRowIdsChange,
	isLoading,
	isError,
	keyId,
	defaultSelectedRowIds = [],
}: DataGridProps<TRow>) => {
	const [uncontrolledSelectedRowIds, setUncontrolledSelectedRowIds] = useState(
		defaultSelectedRowIds,
	);
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

	const activeSelectedRowIds = selectedRowIds ?? uncontrolledSelectedRowIds;
	const selectedRowIdSet = useMemo(
		() => new Set(activeSelectedRowIds),
		[activeSelectedRowIds],
	);

	const visibleRowIds = useMemo(
		() => sortedRows.map((row) => getRowId(row[keyId])),
		[keyId, sortedRows],
	);

	const isAllRowsSelected =
		visibleRowIds.length > 0 &&
		visibleRowIds.every((rowId) => selectedRowIdSet.has(rowId));
	const isSomeRowsSelected = visibleRowIds.some((rowId) =>
		selectedRowIdSet.has(rowId),
	);

	const handleSelectedRowIdsChange = useCallback(
		(nextSelectedRowIds: DataGridRowId[]) => {
			if (!selectedRowIds) {
				setUncontrolledSelectedRowIds(nextSelectedRowIds);
			}

			onSelectedRowIdsChange?.(nextSelectedRowIds);

			if (onSelectRow) {
				const nextSelectedRowIdSet = new Set(nextSelectedRowIds);
				onSelectRow(
					rows.filter((row) => nextSelectedRowIdSet.has(getRowId(row[keyId]))),
				);
			}
		},
		[keyId, onSelectRow, onSelectedRowIdsChange, rows, selectedRowIds],
	);

	const handleRowSelectionChange = useCallback(
		(rowId: DataGridRowId, isSelected: boolean) => {
			const nextSelectedRowIdSet = new Set(activeSelectedRowIds);

			if (isSelected) {
				nextSelectedRowIdSet.add(rowId);
			} else {
				nextSelectedRowIdSet.delete(rowId);
			}

			handleSelectedRowIdsChange(Array.from(nextSelectedRowIdSet));
		},
		[activeSelectedRowIds, handleSelectedRowIdsChange],
	);

	const handleAllRowsSelectionChange = useCallback(
		(isSelected: boolean) => {
			const nextSelectedRowIdSet = new Set(activeSelectedRowIds);

			for (const rowId of visibleRowIds) {
				if (isSelected) {
					nextSelectedRowIdSet.add(rowId);
				} else {
					nextSelectedRowIdSet.delete(rowId);
				}
			}

			handleSelectedRowIdsChange(Array.from(nextSelectedRowIdSet));
		},
		[activeSelectedRowIds, handleSelectedRowIdsChange, visibleRowIds],
	);

	const isFullHeight = isLoading || isError || rows.length === 0;

	return {
		sortedRows,
		isFullHeight,
		handleRowSelectionChange,
		handleAllRowsSelectionChange,
		isAllRowsSelected,
		isSomeRowsSelected,
		visibleRowIds,
		selectedRowIdSet,
	};
};
