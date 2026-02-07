import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { PAGE_CONTENT_CLASSNAME } from '../constants';
import { fullHeightClass, rootClass } from './styles.css';

export type PageContentProps = {
	children: ReactNode;

	/**
	 * Флаг, растягивающий контейнер на 100% высоты
	 */
	isFullHeight?: boolean;

	/**
	 * Название класса, применяется к корневому компоненту
	 */
	className?: string;
};

export const Content = (props: PageContentProps) => {
	const { className, children, isFullHeight = true } = props;

	return (
		<article
			className={clsx(
				PAGE_CONTENT_CLASSNAME,
				rootClass,
				{ [fullHeightClass]: isFullHeight },
				className,
			)}
		>
			{children}
		</article>
	);
};
