import { clsx } from 'clsx';
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';
import {
	Button,
	type ButtonProps,
	Tooltip,
	Typography,
	useDashboard,
} from '~/components';
import { PAGE_HEADER_CLASSNAME } from '../constants';
import {
	actionsClass,
	breadcrumbsClass,
	buttonsClass,
	rootClass,
	subtitleClass,
	subtitleContainerClass,
	titleClass,
	titleContainerClass,
} from './styles.css';

export type PageHeaderProps = {
	/**
	 * Заголовок страницы
	 * @example <PageHeader title="Заголовок страницы" />
	 */
	title: ReactNode | string;

	/**
	 * Описание страницы
	 * @example <PageHeader description="Описание страницы" />
	 */
	subtitle?: ReactNode | string;

	/**
	 * Хлебные крошки
	 * @example <PageHeader breadcrumbs={
	 * <Breadcrumbs>
	 *   <Link>Первая ссылка</Link>,
	 *   <Link>Вторая ссылка</Link>,
	 *   <>Текст</>
	 * </Breadcrumbs>
	 * } />
	 */
	breadcrumbs?: ReactNode;

	/**
	 * Набор дополнительных действий
	 * @example <PageHeader actions={<Button variant='link'>Перейти к счету</Button>} />
	 */
	actions?: ReactNode;
	/**
	 * Название класса, применяется к корневому компоненту
	 */
	className?: string;

	/**
	 * Кнопка возврата на предыдущий экран
	 * @example
	 * <PageHeader
	 *  backButton={{
	 *    onClick: () => {},
	 *  }}
	 * />
	 */
	backButton?: Omit<ButtonProps, 'children' | 'variant'>;
};

export const Header = (props: PageHeaderProps) => {
	const { title, subtitle, breadcrumbs, actions, backButton, className } =
		props;
	const { pinned, togglePinned } = useDashboard();

	useEffect(() => {
		if (typeof title === 'string') {
			document.title = title;
		}
	}, [title]);

	return (
		<header className={clsx(PAGE_HEADER_CLASSNAME, rootClass, className)}>
			<div className={buttonsClass}>
				<Tooltip text={pinned ? 'Развернуть' : 'Свернуть'}>
					<Button variant="ghost" size="icon" onClick={togglePinned}>
						{pinned ? <PanelLeftOpen /> : <PanelLeftClose />}
					</Button>
				</Tooltip>
				{backButton && (
					<Tooltip text="Назад">
						<Button {...(backButton as ButtonProps)} variant="ghost">
							<ChevronLeft />
						</Button>
					</Tooltip>
				)}
			</div>
			{breadcrumbs && <div className={breadcrumbsClass}>{breadcrumbs}</div>}
			<div className={actionsClass}>{actions}</div>
			{typeof title === 'string' ? (
				<Typography
					className={titleClass}
					component="h1"
					variant="h3"
					aria-level={1}
				>
					{title}
				</Typography>
			) : (
				<div className={titleContainerClass}>{title}</div>
			)}
			{subtitle && typeof subtitle === 'string' && (
				<Typography className={subtitleClass} aria-level={2}>
					{subtitle}
				</Typography>
			)}
			{subtitle && typeof subtitle !== 'string' && (
				<div className={subtitleContainerClass}>{subtitle}</div>
			)}
		</header>
	);
};
