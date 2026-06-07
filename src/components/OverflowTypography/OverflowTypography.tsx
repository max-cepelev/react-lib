import { clsx } from 'clsx';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';
import * as styles from './styles.css';
import type { OverflowTypographyProps } from './types';
import { useLogic } from './useLogic';
import { truncateString } from './utils';

export const OverflowTypography = (props: OverflowTypographyProps) => {
	const {
		label,
		hasVisibleLastSymbols,
		visibleLastSymbolsCount,
		hasMultipleRows,
		overflowRef,
		tooltipContent,
		restTooltipProps,
		style,
		restProps,
	} = useLogic(props);

	const { align = 'left', className, text, children } = props;

	if (hasVisibleLastSymbols && label) {
		const { firstPartLabel, secondPartLabel } = truncateString(
			visibleLastSymbolsCount,
			label,
		);

		return (
			<Tooltip {...restTooltipProps} arrow content={tooltipContent}>
				<div
					className={clsx(styles.wrapper, styles.wrapperAlignments[align])}
					data-slot="overflow-typography"
				>
					<Typography
						{...restProps}
						align={align}
						className={clsx(styles.truncate, className)}
						component="span"
						data-slot="overflow-typography-start"
						display="block"
						ref={overflowRef}
						style={style}
					>
						{firstPartLabel}
					</Typography>
					<Typography
						{...restProps}
						align={align}
						className={className}
						component="span"
						data-slot="overflow-typography-end"
						style={style}
					>
						{secondPartLabel}
					</Typography>
				</div>
			</Tooltip>
		);
	}

	return (
		<Tooltip {...restTooltipProps} arrow content={tooltipContent}>
			<Typography
				{...restProps}
				align={align}
				className={clsx(
					styles.truncate,
					hasMultipleRows && styles.multipleRows,
					className,
				)}
				data-slot="overflow-typography"
				display="block"
				ref={overflowRef}
				style={style}
			>
				{text ?? children}
			</Typography>
		</Tooltip>
	);
};
