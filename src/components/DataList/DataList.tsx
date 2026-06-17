import { clsx } from 'clsx';
import { type Key, type ReactNode, useCallback, useRef, useState } from 'react';
import { type ListRange, Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { ContentState, type ContentStateProps } from '../ContentState';
import { ITEM_CLASSNAME, OVERSCAN_COUNT } from './constants';
import { EndData } from './EndData';
import { ErrorState } from './ErrorState';
import { Loader } from './Loader';
import { NoData } from './NoData';
import { ScrollToTopButton } from './ScrollToTopButton';
import { itemClass, list } from './styles.css';

// Дженерик получает из типа только обязательные поля и возвращает их как union
type RequiredKeys<T> = {
	// biome-ignore lint/complexity/noBannedTypes: <>
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type DataListProps<TDataItem extends Record<string, unknown>> = {
	data?: Array<TDataItem>;

	/**
	 * Поле, используемое в качестве ключа списка
	 */
	keyId: RequiredKeys<TDataItem>;

	/**
	 * Название класса, применяется к корневому компоненту
	 */
	className?: string;

	/**
	 *  Используется для отображения placeholder при отсутствии данных в таблице
	 */
	noDataPlaceholder?: ReactNode;

	/**
	 *  Сообщение, отображаемое при достижении конца списка
	 */
	endOfScrollMsg?: string;

	errorState?: ContentStateProps.ErrorState;

	/**
	 * Если true, показывается анимация загрузки
	 */
	isLoading?: boolean;

	/**
	 * Флаг состояния ошибки
	 */
	isError?: boolean;

	/**
	 * Флаг достижения конца списка
	 */
	isEndReached?: boolean;

	ref?: React.RefObject<VirtuosoHandle | null>;

	/**
	 * Содержание карточки
	 */
	itemContent: (
		dataItem: TDataItem,
		{ index, className }: { index: number; className: string },
	) => ReactNode;

	/**
	 * Функция обработки нажатия на кнопку "Повторить запрос"
	 */
	onRetry: () => void;

	/**
	 * Обработчик подгрузки данных
	 */
	onEndReached?: () => void;
};

export const DataList = <TDataItem extends Record<string, unknown>>({
	data,
	keyId,
	className,
	itemContent,
	noDataPlaceholder,
	endOfScrollMsg,
	errorState,
	isLoading,
	isError,
	isEndReached,
	onRetry,
	onEndReached,
	ref,
}: DataListProps<TDataItem>) => {
	const innerRef = useRef<VirtuosoHandle>(null);

	const virtuoso = ref || innerRef;

	const [isStickyButtonActive, setIsStickyButtonActive] = useState(false);

	const handleRangeChanged = useCallback((range: ListRange) => {
		if (range.startIndex > 2) {
			setIsStickyButtonActive(true);
		} else {
			setIsStickyButtonActive(false);
		}
	}, []);

	const handleScrollToTop = useCallback(
		() =>
			virtuoso.current?.scrollToIndex({
				index: 0,
				align: 'start',
				behavior: 'smooth',
			}),
		[virtuoso],
	);

	const handleEndReach = useCallback(() => {
		if (!isEndReached && onEndReached) {
			onEndReached();
		}
	}, [isEndReached, onEndReached]);

	const isDataExist = Boolean(data?.length);

	if (!isDataExist && !isLoading && !isError) {
		return noDataPlaceholder ? noDataPlaceholder : <NoData />;
	}

	return (
		<ContentState
			isLoading={isLoading && !isDataExist}
			isError={isError && !isDataExist}
			errorState={errorState}
		>
			<Virtuoso
				className={clsx(list, className)}
				style={{ height: '100%' }}
				data={data}
				ref={virtuoso}
				overscan={OVERSCAN_COUNT}
				endReached={handleEndReach}
				rangeChanged={handleRangeChanged}
				itemContent={(index, item) => (
					<li key={item[keyId] as Key}>
						{itemContent?.(item, {
							index,
							className: clsx(itemClass, ITEM_CLASSNAME),
						})}
					</li>
				)}
				components={{
					Footer: () => (
						<>
							{isLoading && <Loader />}
							{isError && <ErrorState onRetry={onRetry} />}
							{isEndReached && <EndData endOfScrollMsg={endOfScrollMsg} />}
						</>
					),
				}}
			/>
			<ScrollToTopButton
				isVisible={isStickyButtonActive}
				onClick={handleScrollToTop}
			/>
		</ContentState>
	);
};
