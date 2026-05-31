import type { TooltipProps } from '../Tooltip';
import type { TypographyProps } from '../Typography';

export type OverflowTypographyTooltipProps = Omit<
	TooltipProps,
	'children' | 'content' | 'ref' | 'text'
> & {
	content?: TooltipProps['content'];
	text?: TooltipProps['text'];
};

export type OverflowTypographyProps = Omit<TypographyProps, 'ref'> & {
	/**
	 * Максимальное количество отображаемых строк.
	 *
	 * @default 1
	 */
	rowsCount?: number;
	/**
	 * Количество видимых символов в конце обрезанной строки.
	 */
	visibleLastSymbolsCount?: number;
	/**
	 * Текст для обрезки и дефолтного содержимого tooltip.
	 */
	text?: string;
	/**
	 * Пропсы для кастомизации tooltip.
	 */
	tooltipProps?: OverflowTypographyTooltipProps;
	ref?: React.Ref<HTMLElement>;
};
