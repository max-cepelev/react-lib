import { clsx } from 'clsx';
import { Copy } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import { Typography, type TypographyProps } from '../Typography';
import { copyIconClass, wrapper } from './styles.css';
import { useLogic } from './useLogic';

export type CopyTypographyProps = TypographyProps & {
	/**
	 * Текст, который будет скопирован. Перекрывает обычное копирование если children является строкой
	 */
	copyText?: string;
	/**
	 * Отображает иконку слева или справа от текста
	 * @default right
	 */
	copyPosition?: 'right' | 'left';
	/**
	 * Если `true`, в тултипе будет отображаться текст, который будет скопирован при нажатии
	 */
	isShowCopyText?: boolean;
};

export const CopyTypography = (props: CopyTypographyProps) => {
	const {
		children,
		copyPosition = 'right',
		copyText,
		isShowCopyText,
		color,
		className,
		...restProps
	} = props;

	const renderIcon = () => <Copy className={copyIconClass} />;

	const {
		tooltipOpen,
		handleMouseEnter,
		handleMouseLeave,
		handleClick,
		tooltipTitle,
		isIconOnLeft,
	} = useLogic(props);

	return (
		<Tooltip open={tooltipOpen} arrow text={tooltipTitle} side="bottom">
			<Typography
				onMouseLeave={handleMouseLeave}
				onMouseEnter={handleMouseEnter}
				onClick={handleClick}
				component="div"
				color={color}
				className={clsx(wrapper, className)}
				{...restProps}
			>
				{isIconOnLeft && renderIcon()}
				{children}
				{!isIconOnLeft && renderIcon()}
			</Typography>
		</Tooltip>
	);
};
