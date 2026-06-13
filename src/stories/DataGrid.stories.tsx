import { Delete, Edit } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import {
	DataGrid,
	DataGridActionCell,
	type DataGridColumns,
	DataGridSortHeader,
	type DataGridSorting,
	Pagination,
} from '~/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'DataGrid',
	component: DataGrid,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

const rows = [
	{
		id: 1,
		name: 'Alice',
		date: '2023-06-12',
	},
	{
		id: 2,
		name: 'Bob',
		date: '2023-06-13',
	},
	{
		id: 3,
		name: 'Charlie',
		date: '2023-06-14',
	},
	{
		id: 4,
		name: 'Dave',
		date: '2023-06-15',
	},
	{
		id: 5,
		name: 'Alice',
		date: '2023-06-12',
	},
	{
		id: 6,
		name: 'Bob',
		date: '2023-06-13',
	},
	{
		id: 7,
		name: 'Charlie',
		date: '2023-06-14',
	},
	{
		id: 8,
		name: 'Dave',
		date: '2023-06-15',
	},
	{
		id: 9,
		name: 'Alice',
		date: '2023-06-12',
	},
	{
		id: 10,
		name: 'Bob',
		date: '2023-06-13',
	},
	{
		id: 11,
		name: 'Charlie',
		date: '2023-06-14',
	},
	{
		id: 12,
		name: 'Dave',
		date: '2023-06-15',
	},
	{
		id: 13,
		name: 'Alice',
		date: '2023-06-12',
	},
	{
		id: 14,
		name: 'Bob',
		date: '2023-06-13',
	},
	{
		id: 15,
		name: 'Charlie',
		date: '2023-06-14',
	},
	{
		id: 16,
		name: 'Dave',
		date: '2023-06-15',
	},
	{
		id: 17,
		name: 'Alice',
		date: '2023-06-12',
	},
	{
		id: 18,
		name: 'Bob',
		date: '2023-06-13',
	},
	{
		id: 20,
		name: 'Charlie',
		date: '2023-06-14',
	},
	{
		id: 21,
		name: 'Dave',
		date: '2023-06-15',
	},
	{
		id: 22,
		name: 'Alice',
		date: '2023-06-12',
	},
	{
		id: 23,
		name: 'Bob',
		date: '2023-06-13',
	},
	{
		id: 24,
		name: 'Charlie',
		date: '2023-06-14',
	},
	{
		id: 25,
		name: 'Dave',
		date: '2023-06-15',
	},
];

const columns: DataGridColumns<(typeof rows)[0]> = [
	{
		title: 'ID',
		field: 'id',
		align: 'center',
	},
	{
		title: 'Имя',
		field: 'name',
	},
	{
		title: 'Дата',
		field: 'date',
		align: 'center',
	},
];

const Container = (props: { children: React.ReactNode }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '400px',
				margin: '0 auto',
			}}
		>
			{props.children}
		</div>
	);
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BaseExample = () => {
	return (
		<Container>
			<DataGrid rows={rows} columns={columns} keyId="id" />
		</Container>
	);
};

export const WithActions = () => {
	const columnsWithActions: DataGridColumns<(typeof rows)[0]> = [
		...columns,
		{
			title: 'Actions',
			align: 'center',
			width: 150,
			renderCell: (row) => (
				<DataGridActionCell
					row={row}
					actions={{
						main: [
							{
								name: 'Edit',
								icon: <Edit />,
								onClick: () => console.log('edit'),
							},
							{
								icon: <Delete />,
								name: 'Delete',
								onClick: () => console.log('delete'),
							},
						],
					}}
				/>
			),
		},
	];
	return <DataGrid rows={rows} columns={columnsWithActions} keyId="id" />;
};

export const WithSorting = () => {
	const [sorting, setSorting] = useState<DataGridSorting<(typeof rows)[0]>>({
		key: 'id',
		order: 'asc',
	});
	const sortedRows = useMemo(() => {
		return [...rows].sort((a, b) => {
			if (sorting.order === 'asc') {
				return a[sorting.key] > b[sorting.key] ? 1 : -1;
			}
			return a[sorting.key] < b[sorting.key] ? 1 : -1;
		});
	}, [sorting]);
	const columnsWithActions: DataGridColumns<(typeof rows)[0]> = [
		{
			title: 'ID',
			field: 'id',
			align: 'center',
			renderHeaderCell: (column) => (
				<DataGridSortHeader
					column={column}
					sorting={sorting}
					setSorting={setSorting}
				/>
			),
		},
		{
			title: 'Имя',
			field: 'name',
			renderHeaderCell: (column) => (
				<DataGridSortHeader
					column={column}
					sorting={sorting}
					setSorting={setSorting}
				/>
			),
		},
		{
			title: 'Дата',
			field: 'date',
			align: 'center',
			renderHeaderCell: (column) => (
				<DataGridSortHeader
					column={column}
					sorting={sorting}
					setSorting={setSorting}
				/>
			),
		},
	];
	return <DataGrid rows={sortedRows} columns={columnsWithActions} keyId="id" />;
};

export const Loading = () => {
	return <DataGrid rows={rows} columns={columns} isLoading keyId="id" />;
};

export const ErrorState = () => {
	return <DataGrid rows={rows} columns={columns} isError keyId="id" />;
};

export const EmptyState = () => {
	return <DataGrid rows={[]} columns={columns} isError keyId="id" />;
};

export const WithPagination = () => {
	const [page, setPage] = useState(1);
	const pageSize = 10;

	const slicedData = useMemo(() => {
		return rows.slice((page - 1) * pageSize, page * pageSize);
	}, [page]);
	return (
		<DataGrid
			rows={slicedData}
			columns={columns}
			keyId="id"
			footer={
				<Pagination
					onPageChange={setPage}
					totalCount={rows.length}
					currentPage={page}
					pageSize={pageSize}
				/>
			}
		/>
	);
};
