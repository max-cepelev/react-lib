import type { ReactElement, ReactNode } from 'react';

import { Button } from '../Button';
import { CircularProgress } from '../CircularProgress';
import { Placeholder, type PlaceholderProps } from '../Placeholder';
import { Typography } from '../Typography';
import { loadingContainer } from './styles.css';
import type { ContentStateErrorProps } from './types';

export type ContentStateProps = {
	/**
	 * Флаг состояния загрузки
	 */
	isLoading?: boolean;
	/**
	 * Элемент для отображения состояния загрузки
	 */
	loadingContent?: ReactElement | string;
	/**
	 * Флаг состояния ошибки
	 */
	isError?: boolean;
	/**
	 * Параметры для отображения состояния ошибки
	 */
	errorState?: ContentStateErrorProps;
	/**
	 * Флаг для отображения custom состояния ошибки
	 */
	isCustom?: boolean;
	/**
	 * Параметры для отображения custom состояния ошибки
	 */
	customState?: PlaceholderProps;
	/**
	 * Элементы для отображения состояния "Успех"
	 */
	children: ReactNode;
};

export const ContentState = ({
	isLoading,
	isError,
	isCustom,
	errorState,
	customState,
	children,
	loadingContent: LoadingContent = <CircularProgress color="primary" />,
}: ContentStateProps) => {
	if (isLoading) {
		return <div className={loadingContainer}>{LoadingContent}</div>;
	}

	if (isCustom && customState) {
		return <Placeholder {...customState} />;
	}

	if (isError && errorState) {
		const {
			title = 'Произошла ошибка',
			imgAlt,
			imgSrc,
			errorList,
			onRetry,
			actions = <Button onClick={onRetry}>Попробовать снова</Button>,
		} = errorState;

		const description = errorList.map((errorMessage) => (
			<Typography key={errorMessage} component="p">
				{errorMessage}
			</Typography>
		));

		return (
			<Placeholder
				title={title}
				description={description}
				imgAlt={imgAlt}
				imgSrc={imgSrc}
				actions={actions}
			/>
		);
	}

	return children;
};
