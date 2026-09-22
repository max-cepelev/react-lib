import {
	act,
	fireEvent,
	render,
	renderHook,
	screen,
} from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { DataGridColumns, DataGridRowId } from './types';

vi.mock('./styles.css', () => ({
	container: '',
	disabled: '',
	fullHeight: '',
	loading: '',
	table: '',
	titleClass: '',
}));
vi.mock('./Body/styles.css', () => ({ container: '' }));
vi.mock('./Row/styles.css', () => ({
	rowClass: '',
	selectableClass: '',
	selectionCellClass: '',
	selectionCheckbox: '',
}));
vi.mock('./Cell/styles.css', () => ({ cellClass: '', disabledClass: '' }));
vi.mock('./Header/styles.css', () => ({
	headerRow: '',
	selectionCheckbox: '',
	selectionHeaderCell: '',
}));
vi.mock('./HeaderCell/styles.css', () => ({ headerCellClass: '' }));
vi.mock('./Footer/styles.css', () => ({ footerClass: '' }));
vi.mock('../Checkbox/checkbox.css', () => ({
	checkIcon: '',
	indicator: '',
	minusIcon: '',
	root: '',
}));
vi.mock('../DataGridSortHeader/styles.css', () => ({
	alignments: { left: '' },
	wrapper: '',
}));
vi.mock('./State', () => ({ State: () => null }));
vi.mock('./Row/useLogic', async (importOriginal) => {
	const actual = await importOriginal<typeof import('./Row/useLogic')>();
	return { useLogic: vi.fn(actual.useLogic) };
});

import { DataGrid } from './DataGrid';
import { useLogic as useRowLogic } from './Row/useLogic';
import { useLogic } from './useLogic';

const rows = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
	{ id: 3, name: 'Charlie' },
];

describe('DataGrid selection rendering', () => {
	it('keeps the row handler stable and reads the latest selection and callbacks', () => {
		const columns: DataGridColumns<(typeof rows)[number]> = [];
		const firstCallback = vi.fn();
		const nextCallback = vi.fn();
		const { result, rerender } = renderHook(
			({ selectedRowIds, onSelectedRowIdsChange }) =>
				useLogic({
					rows,
					columns,
					keyId: 'id',
					selectedRowIds,
					onSelectedRowIdsChange,
				}),
			{
				initialProps: {
					selectedRowIds: [1],
					onSelectedRowIdsChange: firstCallback,
				},
			},
		);
		const handler = result.current.handleRowSelectionChange;
		rerender({ selectedRowIds: [2, 99], onSelectedRowIdsChange: nextCallback });
		expect(result.current.handleRowSelectionChange).toBe(handler);
		act(() => handler(3, true));
		expect(firstCallback).not.toHaveBeenCalled();
		expect(nextCallback).toHaveBeenLastCalledWith([2, 99, 3]);
		act(() => result.current.handleAllRowsSelectionChange(false));
		expect(nextCallback).toHaveBeenLastCalledWith([99]);
	});

	it('does not trigger row clicks through a checkbox and updates row click callbacks', () => {
		const columns: DataGridColumns<(typeof rows)[number]> = [
			{ label: 'Name', field: 'name' },
		];
		const onRowClick = vi.fn();
		const nextOnRowClick = vi.fn();
		const { rerender } = render(
			<DataGrid
				rows={rows}
				columns={columns}
				keyId="id"
				isRowSelectionEnabled
				onRowClick={onRowClick}
			/>,
		);
		const checkbox = screen.getAllByRole('checkbox', { name: 'Select row' })[0];
		fireEvent.click(checkbox);
		fireEvent.keyDown(checkbox, { key: ' ' });
		expect(onRowClick).not.toHaveBeenCalled();
		fireEvent.click(screen.getByText('Alice'));
		expect(onRowClick).toHaveBeenCalledExactlyOnceWith(rows[0]);
		rerender(
			<DataGrid
				rows={rows}
				columns={columns}
				keyId="id"
				isRowSelectionEnabled
				onRowClick={nextOnRowClick}
			/>,
		);
		fireEvent.click(screen.getByText('Alice'));
		expect(nextOnRowClick).toHaveBeenCalledExactlyOnceWith(rows[0]);
	});

	it.each([false, true])(
		'keeps data cells unchanged when toggling selection (controlled: %s)',
		(controlled) => {
			const renderCell = vi.fn((row: (typeof rows)[number]) => row.name);
			const onSelectRow = vi.fn();
			const columns: DataGridColumns<(typeof rows)[number]> = [
				{ label: 'Name', renderCell },
			];
			const Example = () => {
				const [selectedRowIds, setSelectedRowIds] = useState<DataGridRowId[]>(
					[],
				);
				return (
					<DataGrid
						rows={rows}
						columns={columns}
						keyId="id"
						isRowSelectionEnabled
						selectedRowIds={controlled ? selectedRowIds : undefined}
						onSelectedRowIdsChange={(ids) => setSelectedRowIds(ids)}
						onSelectRow={onSelectRow}
					/>
				);
			};
			render(<Example />);
			expect(renderCell).toHaveBeenCalledTimes(rows.length);
			renderCell.mockClear();
			vi.mocked(useRowLogic).mockClear();

			const checkboxes = screen.getAllByRole('checkbox', {
				name: 'Select row',
			});
			const selectAll = screen.getByRole('checkbox', {
				name: 'Select all rows',
			});
			fireEvent.click(checkboxes[0]);
			expect(useRowLogic).toHaveBeenCalledTimes(1);
			expect(useRowLogic).toHaveBeenLastCalledWith(
				expect.objectContaining({ rowId: 1 }),
			);
			expect(checkboxes[0]).toBeChecked();
			expect(selectAll).toBePartiallyChecked();
			expect(onSelectRow).toHaveBeenLastCalledWith([rows[0]]);
			fireEvent.click(checkboxes[1]);
			expect(onSelectRow).toHaveBeenLastCalledWith([rows[0], rows[1]]);
			fireEvent.click(checkboxes[0]);
			expect(checkboxes[0]).not.toBeChecked();
			expect(onSelectRow).toHaveBeenLastCalledWith([rows[1]]);
			fireEvent.click(selectAll);
			expect(selectAll).toBeChecked();
			expect(onSelectRow).toHaveBeenLastCalledWith(rows);
			fireEvent.click(selectAll);
			expect(onSelectRow).toHaveBeenLastCalledWith([]);
			for (const checkbox of checkboxes) expect(checkbox).not.toBeChecked();
			expect(renderCell).not.toHaveBeenCalled();
		},
	);

	it('updates changed data and columns without remounting cell content', () => {
		const Editor = ({ name }: { name: string }) => (
			<label>
				{name}
				<input aria-label="Draft" defaultValue={name} />
			</label>
		);
		const renderCell = vi.fn((row: (typeof rows)[number], index: number) => (
			<Editor name={`${index}: ${row.name}`} />
		));
		const columns: DataGridColumns<(typeof rows)[number]> = [
			{ label: 'Name', renderCell },
		];
		const { rerender } = render(
			<DataGrid
				rows={rows}
				columns={columns}
				keyId="id"
				isRowSelectionEnabled
			/>,
		);
		const input = screen.getAllByRole('textbox')[0];
		fireEvent.change(input, { target: { value: 'Unsaved draft' } });
		fireEvent.click(screen.getAllByRole('checkbox', { name: 'Select row' })[0]);
		expect(screen.getAllByRole('textbox')[0]).toBe(input);
		expect(input).toHaveValue('Unsaved draft');
		renderCell.mockClear();

		const updatedRows = [{ ...rows[0], name: 'Updated' }, ...rows.slice(1)];
		rerender(<DataGrid rows={updatedRows} columns={columns} keyId="id" />);
		expect(renderCell).toHaveBeenCalledTimes(1);
		expect(screen.getByText('0: Updated')).toBeInTheDocument();
		expect(screen.getAllByRole('textbox')[0]).toBe(input);
		expect(input).toHaveValue('Unsaved draft');

		rerender(
			<DataGrid
				rows={[...updatedRows].reverse()}
				columns={columns}
				keyId="id"
			/>,
		);
		expect(screen.getByText('2: Updated')).toBeInTheDocument();
		rerender(
			<DataGrid
				rows={rows}
				columns={[{ label: 'ID', field: 'id' }]}
				keyId="id"
			/>,
		);
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
		expect(screen.getByRole('cell', { name: '1' })).toBeInTheDocument();
	});
});
