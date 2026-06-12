import { clsx } from 'clsx';
import { type ReactElement, useEffect } from 'react';
import { Typography } from '../../Typography';
import { PAGE_HEADER_CLASSNAME } from '../constants';
import * as styles from './styles.css';

export type PageHeaderProps = {
	/**
	 * HTML title
	 * @example <PageHeader title="Заголовок страницы" />
	 */
	title?: string;

	sidebarTrigger?: ReactElement;

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
	title,
	children,
	sidebarTrigger,
}: PageHeaderProps) => {
	useEffect(() => {
		if (title) {
			document.title = title;
		}
	}, [title]);

	return (
		<header className={clsx(styles.root, PAGE_HEADER_CLASSNAME, className)}>
			<div className={styles.sidebarTriggerContainer}>
				{sidebarTrigger ? sidebarTrigger : null}
			</div>
			<div className={styles.titleContainer}>
				{title && (
					<Typography variant="h4" component="h1">
						{title}
					</Typography>
				)}
			</div>
			<div className={styles.content}>{children}</div>
			<div className={styles.actions}>{actions}</div>
		</header>
	);
};
