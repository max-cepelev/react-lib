import type { ReactNode } from 'react';

export namespace ContentStateProps {
	export type ErrorState = {
		title?: string;
		message: string;
		imgSrc?: string;
		onRetry?: VoidFunction;
	};

	export type Root = {
		isLoading?: boolean;
		isError?: boolean;
		errorState?: ErrorState;
		children: ReactNode;
	};
}
