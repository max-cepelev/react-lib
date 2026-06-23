import type { DataGridRowId } from '../types';

export function compareValues(a: unknown, b: unknown) {
	if (a == null && b == null) {
		return 0;
	}

	if (a == null) {
		return -1;
	}

	if (b == null) {
		return 1;
	}

	if (a instanceof Date && b instanceof Date) {
		return a.getTime() - b.getTime();
	}

	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}

	return String(a).localeCompare(String(b), undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}

export function getRowId(value: unknown): DataGridRowId {
	if (typeof value === 'string' || typeof value === 'number') {
		return value;
	}

	return String(value);
}
