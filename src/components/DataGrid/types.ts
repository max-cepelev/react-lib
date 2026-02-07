import type { ReactNode } from 'react';

export type DataGridColumn<TRow> = {
	title: string;
	field?: keyof TRow;
	width?: number | string;
	align?: 'left' | 'center' | 'right' | 'justify';
	isDisabled?: boolean;
	color?: string;
	renderHeaderCell?: (
		column: Omit<
			DataGridColumn<TRow>,
			| 'renderHeaderCell'
			| 'renderCell'
			| 'format'
			| 'cellClassName'
			| 'cellColor'
		>,
	) => ReactNode;
	renderCell?: (row: TRow, index: number) => ReactNode;
	format?: (row: TRow) => string | number | null | undefined;
	cellClassName?: (row: TRow) => string;
	cellColor?: (row: TRow) => string;
};

export type DataGridColumns<TRow> = DataGridColumn<TRow>[];

export type AlignVariant = 'left' | 'center' | 'right' | 'justify';

export type DataGridState = {
	text: string;
	imgSrc?: string;
	imgAlt?: string;
	actions?: ReactNode;
	errorList?: string[];
	onRetry?: () => void;
};
