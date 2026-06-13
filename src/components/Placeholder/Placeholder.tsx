import clsx from 'clsx';
import { type JSX, type ReactNode, useMemo } from 'react';
import { Typography } from '../Typography';
import {
	IMAGE_HEIGHT,
	IMAGE_WIDTH,
	MAX_INNER_WIDTH,
	TITLE_HEADER_LEVEL,
} from './constants';
import { Image, type ImageProps } from './Image';
import {
	descriptionClass,
	footerClass,
	innerContainer,
	sizes,
	wrapper,
} from './styles.css';
import type { PlaceholderSize } from './types';

export type PlaceholderProps = {
	/**
	 * Название класса, применяется к корневому компоненту
	 */
	className?: string;

	/**
	 * Ссылка на изображение
	 */
	imgSrc?: string;

	/**
	 * Описание изображения (атрибут alt)
	 */
	imgAlt?: string;

	/**
	 * Заголовок
	 */
	title: JSX.Element | JSX.Element[] | string;

	/**
	 * Описание
	 */
	description?: JSX.Element | JSX.Element[] | string;

	/**
	 * Действия
	 */
	actions?: ReactNode;

	/**
	 * Задает общий размер компонента
	 */
	size?: PlaceholderSize;
	/**
	 * Пропс для кастомизации компонента рендера основного изображения
	 * По умолчанию рендерится обычный img тег
	 * @example <Placeholder renderImage={(props) => <img {...props}/>} />
	 */
	renderImage?: (props: ImageProps) => JSX.Element;
};

export const Placeholder = ({
	className,
	title,
	imgSrc,
	imgAlt,
	description,
	actions,
	size = 'small',
	renderImage,
}: PlaceholderProps) => {
	const RenderImage = useMemo(() => renderImage || Image, [renderImage]);

	return (
		<div className={clsx(wrapper, sizes[size], className)}>
			<div
				className={innerContainer}
				style={{ maxWidth: MAX_INNER_WIDTH[size] }}
			>
				{imgSrc && (
					<RenderImage
						src={imgSrc}
						alt={imgAlt}
						width={IMAGE_WIDTH[size]}
						height={IMAGE_HEIGHT[size]}
						size={size}
					/>
				)}
				<Typography
					align="center"
					color="secondary"
					variant={TITLE_HEADER_LEVEL[size]}
				>
					{title}
				</Typography>

				{description && (
					<Typography
						className={descriptionClass}
						component="div"
						variant="body1"
					>
						{description}
					</Typography>
				)}
			</div>

			{actions && <footer className={footerClass}>{actions}</footer>}
		</div>
	);
};
