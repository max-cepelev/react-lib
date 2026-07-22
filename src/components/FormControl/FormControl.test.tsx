import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./styles.css', () => ({
	control: 'control',
	error: 'error',
	label: 'label',
	root: 'root',
}));

vi.mock('../Label/label.css', () => ({
	disabled: 'disabled',
	error: 'error',
	required: 'required',
	root: 'root',
}));

vi.mock('../Typography/Typography', () => ({
	Typography: ({
		color: _color,
		component: Component = 'span',
		display: _display,
		variant: _variant,
		...props
	}: ComponentProps<'span'> & {
		color?: string;
		component?: 'span';
		display?: string;
		variant?: string;
	}) => <Component {...props} />,
}));

import { FormControl } from './FormControl';

describe('FormControl', () => {
	it('associates its label and renders an accessible error', () => {
		render(
			<FormControl
				error="Name is required"
				htmlFor="name"
				label="Name"
				required
			>
				<input id="name" />
			</FormControl>,
		);

		expect(screen.getByLabelText('Name')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
		expect(
			screen.getByText('Name').closest('[data-slot="form-control"]'),
		).toHaveAttribute('data-invalid');
	});

	it('exposes its inline orientation for checkbox layouts', () => {
		render(
			<FormControl htmlFor="active" label="Active" orientation="inline">
				<input id="active" type="checkbox" />
			</FormControl>,
		);

		expect(
			screen.getByText('Active').closest('[data-slot="form-control"]'),
		).toHaveAttribute('data-orientation', 'inline');
	});
});
