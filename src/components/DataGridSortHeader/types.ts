export type DataGridSorting<TData> = {
	key: keyof TData;
	order: 'asc' | 'desc';
};
