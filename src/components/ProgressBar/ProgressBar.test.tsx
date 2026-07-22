import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./styles.css', () => ({
	indicator: 'indicator',
	root: 'root',
}));

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
	it('renders an accessible determinate value', () => {
		render(<ProgressBar value={42} aria-label="Upload progress" />);

		const progress = screen.getByRole('progressbar', {
			name: 'Upload progress',
		});

		expect(progress).toHaveAttribute('aria-valuemin', '0');
		expect(progress).toHaveAttribute('aria-valuemax', '100');
		expect(progress).toHaveAttribute('aria-valuenow', '42');
		expect(progress.firstElementChild).toHaveStyle({
			transform: 'scaleX(0.42)',
		});
	});

	it.each([
		[-20, '0', 'scaleX(0)'],
		[140, '100', 'scaleX(1)'],
		[Number.NaN, '0', 'scaleX(0)'],
	])('clamps %s to the supported range', (value, expected, transform) => {
		render(<ProgressBar value={value} />);

		const progress = screen.getByRole('progressbar');

		expect(progress).toHaveAttribute('aria-valuenow', expected);
		expect(progress.firstElementChild).toHaveStyle({ transform });
	});
});
