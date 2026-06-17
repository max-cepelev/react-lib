import type { ReactElement, ReactNode } from 'react';

export type DataGridColumn<TRow> = {
	label: string;
	field?: keyof TRow;
	width?: number | string;
	align?: 'left' | 'center' | 'right' | 'justify';
	isDisabled?: boolean;
	color?: string;
	sortable?: boolean;
	sortAccessor?: (row: TRow) => string | number | Date | null | undefined;
	sortComparator?: (a: TRow, b: TRow) => number;
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

export type DataGridSortOrder = 'asc' | 'desc';

export type DataGridSorting<TRow> = {
	key: keyof TRow;
	order: DataGridSortOrder;
} | null;

export type DataGridSortMode = 'client' | 'manual';

export type DataGridEmptyState = {
	text: string;
	imgSrc?: string;
	imgAlt?: string;
	actions?: ReactElement;
};
