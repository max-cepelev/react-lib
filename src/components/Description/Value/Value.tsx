import clsx from 'clsx';
import type { ReactNode } from 'react';
import { CopyTypography } from '../../CopyTypography';
import { Typography, type TypographyProps } from '../../Typography';
import * as styles from './styles.css';
import { useLogic } from './useLogic';

export type ValueProps = Pick<
	TypographyProps,
	'color' | 'variant' | 'children'
> & {
	/**
	 * @example <Description.Item stub="нет значения">value</Description.Item>
	 * Заглушка, отображающаяся, если нет значения
	 */
	stub?: ReactNode;

	/**
	 * Добавляет возможность копирования
	 */
	canCopy?: boolean;

	/**
	 * Позиционирует иконку "копировать" (слева / справа от текста)
	 */
	copyPosition?: 'left' | 'right';
	/**
	 * Текст, который будет скопирован. Перекрывает обычное копирование если children является строкой
	 */
	copyText?: string;
};

export const Value = (props: ValueProps) => {
	const { valueToRender, isDefaultValueRender, leader } = useLogic(props);

	const {
		copyPosition = 'right',
		copyText,
		canCopy,
		children,
		stub,
		...restProps
	} = props;

	if (isDefaultValueRender) {
		return (
			<Typography
				className={clsx(styles.text, { [styles.leader]: leader })}
				component="dd"
				{...restProps}
			>
				{valueToRender}
			</Typography>
		);
	}

	return (
		<dd className={styles.wrapper}>
			<CopyTypography
				className={clsx({
					[styles.leader]: leader,
				})}
				copyPosition={copyPosition}
				copyText={copyText}
				{...restProps}
			>
				{valueToRender}
			</CopyTypography>
		</dd>
	);
};
