import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./styles.css', () => ({
	adornment: 'adornment',
	container: 'container',
	disabledClass: 'disabled',
	errorClass: 'error',
	fullWidthClass: 'full-width',
	input: 'input',
	sizes: {
		large: 'large',
		medium: 'medium',
		small: 'small',
	},
	variants: {
		outlined: 'outlined',
		standard: 'standard',
	},
	withEndAdornment: 'with-end-adornment',
	withStartAdornment: 'with-start-adornment',
}));

import { Input } from './Input';

describe('Input', () => {
	it('keeps zero as a controlled value', () => {
		render(<Input aria-label="Amount" value={0} readOnly />);

		expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveValue('0');
	});
});
