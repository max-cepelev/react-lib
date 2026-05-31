import { useLayoutEffect } from 'react';
import { useOverflowed } from '~/hooks';
import { DEFAULT_ROWS_COUNT } from './constants';
import type { OverflowTypographyProps } from './types';
import { getRowsCountStyle } from './utils';

export const useLogic = ({
	text,
	children,
	tooltipProps,
	visibleLastSymbolsCount = 0,
	rowsCount = DEFAULT_ROWS_COUNT,
	ref,
	style: styleProp,
}: OverflowTypographyProps) => {
	const style = getRowsCountStyle(rowsCount, styleProp);
	const label = text ?? (typeof children === 'string' ? children : undefined);
	const hasVisibleLastSymbols = Boolean(label && visibleLastSymbolsCount > 0);
	const hasMultipleRows = hasVisibleLastSymbols ? false : rowsCount > 1;
	const overflowCheckKey = [
		label,
		rowsCount,
		visibleLastSymbolsCount,
		hasVisibleLastSymbols,
	].join('|');
	const {
		check,
		isOverflowed,
		ref: overflowRef,
	} = useOverflowed(ref, hasMultipleRows);
	const {
		content: tooltipContent,
		text: tooltipText,
		...restTooltipProps
	} = tooltipProps || {};
	const resolvedTooltipContent = isOverflowed
		? (tooltipContent ?? tooltipText ?? label)
		: undefined;

	useLayoutEffect(() => {
		check(overflowCheckKey);
	}, [check, overflowCheckKey]);

	return {
		label,
		hasVisibleLastSymbols,
		hasMultipleRows,
		overflowRef,
		tooltipContent: resolvedTooltipContent,
		restTooltipProps,
		style,
		visibleLastSymbolsCount,
	};
};
