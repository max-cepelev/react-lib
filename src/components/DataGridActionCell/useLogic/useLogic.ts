import { type SyntheticEvent, useCallback } from 'react';

import type { DataGridActionCellProps } from '../DataGridActionCell';
import type { NestedAction, SingleAction } from '../types';

type UseLogicParams<TRowData> = DataGridActionCellProps<TRowData>;

export const useLogic = <TRowData>({
	row,
	actions,
}: UseLogicParams<TRowData>) => {
	const { main, secondary } = actions;

	const blockingAction = [...main, ...(secondary || [])].find(
		(action) => action.isBlockingOperation && action.isLoading,
	);

	const isDisabledAction = Boolean(blockingAction);

	const handleActionClick = useCallback(
		(
			onClick:
				| SingleAction<TRowData>['onClick']
				| NestedAction<TRowData>['onClick'],
		) =>
			() => {
				onClick?.(row);
			},
		[row],
	);

	const handleWrapperClick = (event: SyntheticEvent) => {
		event.stopPropagation();
	};

	return { isDisabledAction, handleActionClick, handleWrapperClick };
};
