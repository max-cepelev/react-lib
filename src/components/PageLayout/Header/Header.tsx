import { clsx } from 'clsx';
import { type ReactElement, useEffect } from 'react';
import { PAGE_HEADER_CLASSNAME } from '../constants';
import * as styles from './styles.css';

export type PageHeaderProps = {
	/**
	 * HTML title
	 * @example <PageHeader htmlTitle="Заголовок страницы" />
	 */
	htmlTitle?: string;

	/**
	 * Набор дополнительных действий
	 * @example <PageHeader actions={<Button variant='link'>Перейти к счету</Button>} />
	 */
	actions?: ReactElement;
	/**
	 * Название класса, применяется к корневому компоненту
	 */
	className?: string;

	children: ReactElement;
};

export const Header = ({
	actions,
	className,
	htmlTitle,
	children,
}: PageHeaderProps) => {
	useEffect(() => {
		if (htmlTitle) {
			document.title = htmlTitle;
		}
	}, [htmlTitle]);

	return (
		<header className={clsx(styles.root, PAGE_HEADER_CLASSNAME, className)}>
			<div className={styles.content}>{children}</div>
			<div className={styles.actions}>{actions}</div>
		</header>
	);
};
