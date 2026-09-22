import type { SyntheticEvent } from 'react';
import type { RowProps } from '../Row';

export const useLogic = <TRow>({
	row,
	rowId,
	onRowClick,
	onSelectionChange,
}: Pick<
	RowProps<TRow>,
	'row' | 'rowId' | 'onRowClick' | 'onSelectionChange'
>) => {
	const handleSelect = () => onRowClick?.(row);
	const handleSelectionChange = (checked: boolean) =>
		onSelectionChange?.(rowId, checked);
	const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();

	return { handleSelect, handleSelectionChange, stopPropagation };
};
