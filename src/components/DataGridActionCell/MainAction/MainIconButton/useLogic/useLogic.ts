import { useEffect, useState } from 'react';

import type { MainIconButtonProps } from '../MainIconButton';

type UseLogicParam<TAction> = MainIconButtonProps<TAction>;

export const useLogic = <TAction>({ action }: UseLogicParam<TAction>) => {
	const { isLoading, disabledReason, name } = action;
	const [isVisibleTooltip, setVisibleTooltip] = useState(false);

	const handleOpenChange = (open: boolean) => setVisibleTooltip(open);

	useEffect(() => {
		if (isLoading) {
			setVisibleTooltip(false);
		}
	}, [isLoading]);

	const text = disabledReason || name;

	return {
		tooltipProps: {
			text,
			open: isVisibleTooltip,
			onOpenChange: handleOpenChange,
		},
	};
};
