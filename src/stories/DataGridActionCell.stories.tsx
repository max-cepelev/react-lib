import { Edit, Save, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import {
	DataGrid,
	DataGridActionCell,
	type DataGridActionCellProps,
	type DataGridActions,
	type DataGridColumns,
} from '~/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'DataGridActionCell',
	component: DataGridActionCell,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DataGridActionCell>;

type DataType = {
	id: string;
	documentName: string;
};

const FAKE_DATA = [
	{
		id: '1',
		documentName: 'Документ 1',
	},
	{
		id: '2',
		documentName: 'Документ 2',
	},
	{
		id: '3',
		documentName: 'Документ 3',
	},
];

export const Example = () => {
	type FakeActionCellProps<TRow> = Pick<DataGridActionCellProps<TRow>, 'row'>;

	const FakeActionCell = <TRow,>({ row }: FakeActionCellProps<TRow>) => {
		const [isEditing, setIsEditing] = useState(false);
		const [isDeleting, setIsDeleting] = useState(false);
		const [isSigning, setIsSigning] = useState(false);

		const handleEdit = () => {
			setIsEditing(true);
		};

		const handleDelete = () => {
			setIsDeleting(true);
		};

		const handleSign = () => {
			setIsSigning(true);
		};

		useEffect(() => {
			if (isEditing) {
				setTimeout(() => setIsEditing(false), 1500);
			}

			if (isDeleting) {
				setTimeout(() => setIsDeleting(false), 1500);
			}

			if (isSigning) {
				setTimeout(() => setIsSigning(false), 1500);
			}
		}, [isEditing, isDeleting, isSigning]);

		// biome-ignore lint/correctness/useExhaustiveDependencies: <>
		const fakeActions = useMemo(
			() => ({
				main: [
					{
						icon: <Edit />,
						name: 'Редактировать',
						loading: isEditing,
						onClick: handleEdit,
					},
					{
						icon: <Trash />,
						name: 'Удалить',
						loading: isDeleting,
						loadingNote: 'Происходит удаление',
						isBlockingOperation: true,
						onClick: handleDelete,
					},
				],
				secondary: [
					{
						name: 'Подписать',
						loading: isSigning,
						loadingNote: 'Происходит подписание',
						isBlockingOperation: true,
						onClick: handleSign,
					},
				],
			}),
			[isEditing, isDeleting, isSigning],
		);

		return <DataGridActionCell actions={fakeActions} row={row} />;
	};

	const columns: DataGridColumns<DataType> = [
		{
			field: 'documentName',
			title: 'Документ',
		},
		{
			title: 'Действия',
			width: '130px',
			align: 'right',
			renderCell: (row) => <FakeActionCell row={row} />,
		},
	];

	return <DataGrid rows={FAKE_DATA} columns={columns} keyId="id" />;
};

export const LoaderActions = () => {
	type DataTypeActions = {
		id: string;
		actions?: object;
	};

	const [deleteLoading, setDeleteLoading] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);

	useEffect(() => {
		if (deleteLoading) {
			setTimeout(() => {
				setDeleteLoading(false);
			}, 1500);
		}

		if (saveLoading) {
			setTimeout(() => {
				setSaveLoading(false);
			}, 1500);
		}
	}, [deleteLoading, saveLoading]);

	const fakeActions: DataGridActions<DataTypeActions> = {
		main: [
			{
				icon: <Trash />,
				name: 'Удалить',
				onClick: () => setDeleteLoading((prevState) => !prevState),
				isLoading: deleteLoading,
			},
			{
				icon: <Save />,
				name: 'Сохранить',
				isLoading: saveLoading,
				onClick: () => setSaveLoading((prevState) => !prevState),
			},
		],
	};

	const fakeData: DataTypeActions = {
		id: '123456789',
	};

	return <DataGridActionCell actions={fakeActions} row={fakeData} />;
};

export const BlockingOperations = () => {
	type DataTypeActions = {
		id: string;
		actions?: object;
	};

	const [deleteLoading, setDeleteLoading] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);

	useEffect(() => {
		if (deleteLoading) {
			setTimeout(() => {
				setDeleteLoading(false);
			}, 1500);
		}

		if (saveLoading) {
			setTimeout(() => {
				setSaveLoading(false);
			}, 1500);
		}
	}, [deleteLoading, saveLoading]);

	const fakeActions: DataGridActions<DataTypeActions> = {
		main: [
			{
				icon: <Trash />,
				name: 'Удалить',
				onClick: () => setDeleteLoading((prevState) => !prevState),
				isLoading: deleteLoading,
				isBlockingOperation: true,
			},
			{
				icon: <Save />,
				name: 'Сохранить',
				needConfirm: true,
				onClick: () => setSaveLoading((prevState) => !prevState),
				isLoading: saveLoading,
			},
		],
		secondary: [
			{ name: 'Редактировать', onClick: () => console.log('secondary 1') },
		],
	};

	const fakeData: DataTypeActions = {
		id: '123456789',
	};

	return <DataGridActionCell actions={fakeActions} row={fakeData} />;
};
