import { useLayoutEffect } from 'react';
import { useOverflowed } from '~/hooks';
import { DEFAULT_ROWS_COUNT } from './constants';
import type {
	OverflowTypographyProps,
	OverflowTypographyTooltipProps,
} from './types';
import { getRowsCountStyle } from './utils';

type UseLogicReturn = {
	label: string | undefined;
	hasVisibleLastSymbols: boolean;
	hasMultipleRows: boolean;
	overflowRef: (node: HTMLElement | null) => void;
	tooltipContent: React.ReactNode;
	restTooltipProps: Omit<OverflowTypographyTooltipProps, 'content' | 'text'>;
	visibleLastSymbolsCount: number;
	style: React.CSSProperties;
	restProps: OverflowTypographyProps;
};

export const useLogic = ({
	text,
	children,
	tooltipProps,
	visibleLastSymbolsCount = 0,
	rowsCount = DEFAULT_ROWS_COUNT,
	ref,
	style: styleProp,
	...restProps
}: OverflowTypographyProps): UseLogicReturn => {
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
		restProps,
	};
};
