import { Component, type ReactNode } from 'react';
import { Button } from '../Button';
import { Empty } from '../Empty';
import { Spinner } from '../Spinner';
import * as styles from './styles.css';
import type { ContentStateProps } from './types';

const DEFAULT_ERROR_STATE: ContentStateProps.ErrorState = {
	title: 'Произошла ошибка',
	message: 'Не удалось загрузить данные.',
};

type BoundaryProps = {
	children: ReactNode;
	fallback: (reset: VoidFunction) => ReactNode;
};

type BoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
	state: BoundaryState = {
		hasError: false,
	};

	static getDerivedStateFromError(): BoundaryState {
		return { hasError: true };
	}

	reset = () => {
		this.setState({ hasError: false });
	};

	render() {
		if (this.state.hasError) {
			return this.props.fallback(this.reset);
		}

		return this.props.children;
	}
}

function ErrorView({
	errorState,
	onReset,
}: {
	errorState?: ContentStateProps.ErrorState;
	onReset?: VoidFunction;
}) {
	const {
		title = DEFAULT_ERROR_STATE.title,
		message,
		imgSrc,
		onRetry,
	} = errorState ?? DEFAULT_ERROR_STATE;

	const handleRetry = () => {
		onReset?.();
		onRetry?.();
	};

	return (
		<div data-slot="content-state-error" className={styles.state}>
			<Empty>
				<Empty.Header>
					{imgSrc && (
						<Empty.Media>
							<img className={styles.errorImage} src={imgSrc} alt="" />
						</Empty.Media>
					)}
					<Empty.Title>{title}</Empty.Title>
					<Empty.Description>{message}</Empty.Description>
				</Empty.Header>
				{onRetry && (
					<Empty.Content>
						<Button onClick={handleRetry}>Попробовать снова</Button>
					</Empty.Content>
				)}
			</Empty>
		</div>
	);
}

function ContentState({
	isLoading,
	isError,
	errorState,
	children,
}: ContentStateProps.Root) {
	if (isLoading) {
		return (
			<div data-slot="content-state-loading" className={styles.state}>
				<Spinner />
			</div>
		);
	}

	if (isError) {
		return <ErrorView errorState={errorState} />;
	}

	return (
		<ErrorBoundary
			fallback={(reset) => (
				<ErrorView errorState={errorState} onReset={reset} />
			)}
		>
			{children}
		</ErrorBoundary>
	);
}

export { ContentState };
