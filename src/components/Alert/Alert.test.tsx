import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./styles.css', () => ({
	actions: 'actions',
	closeButton: 'close-button',
	content: 'content',
	icon: 'icon',
	iconVariants: {
		error: 'icon-error',
		info: 'icon-info',
		success: 'icon-success',
		warning: 'icon-warning',
	},
	message: 'message',
	root: 'root',
	severityVariants: {
		error: 'severity-error',
		info: 'severity-info',
		success: 'severity-success',
		warning: 'severity-warning',
	},
	title: 'title',
}));

vi.mock('../Button/button.css', () => ({
	buttonBase: 'button',
	buttonSizes: {
		icon: 'button-icon',
		iconSmall: 'button-icon-small',
		large: 'button-large',
		medium: 'button-medium',
		small: 'button-small',
	},
	buttonVariants: {
		default: 'button-default',
		destructive: 'button-destructive',
		ghost: 'button-ghost',
		link: 'button-link',
		outline: 'button-outline',
	},
	endAdornment: 'end-adornment',
	fullWidthStyle: 'button-full-width',
	loading: 'button-loading',
	startAdornment: 'start-adornment',
}));

vi.mock('../Typography/styles.css', () => ({
	alignments: { center: '', justify: '', left: '', right: '' },
	colors: {
		disabled: '',
		error: '',
		info: '',
		muted: '',
		primary: '',
		secondary: '',
		success: '',
		warning: '',
	},
	decorations: { lineThrough: '', none: '', underline: '' },
	displays: { block: '', inline: '' },
	gutterBottomClass: '',
	transforms: { capitalize: '', lowercase: '', uppercase: '' },
	variants: {
		body1: '',
		body2: '',
		caption: '',
		h1: '',
		h2: '',
		h3: '',
		h4: '',
		h5: '',
		h6: '',
		overline: '',
		subtitle1: '',
		subtitle2: '',
	},
	weights: { bold: '', medium: '', normal: '', semibold: '' },
}));

import { Alert } from './Alert';

describe('Alert', () => {
	it('renders its severity, title, message and actions', () => {
		render(
			<Alert
				severity="warning"
				title="Check the details"
				actions={<button type="button">Review</button>}
			>
				The invoice is almost due.
			</Alert>,
		);

		const alert = screen.getByRole('alert');

		expect(alert).toHaveAttribute('data-severity', 'warning');
		expect(alert).toHaveAttribute('data-has-title');
		expect(alert).toHaveAttribute('data-has-actions');
		expect(screen.getByText('Check the details')).toBeInTheDocument();
		expect(screen.getByText('The invoice is almost due.').tagName).toBe('P');
		expect(screen.getByRole('button', { name: 'Review' })).toBeInTheDocument();
	});

	it('calls onClose from an accessible close button', () => {
		const onClose = vi.fn();

		render(
			<Alert closeText="Dismiss alert" onClose={onClose}>
				Saved.
			</Alert>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('can remain hidden in the DOM or unmount completely', () => {
		const { container, rerender } = render(
			<Alert display={false}>Hidden alert</Alert>,
		);

		expect(container.querySelector('[data-slot="alert"]')).toHaveAttribute(
			'hidden',
		);

		rerender(
			<Alert display={false} unmountOnExit>
				Hidden alert
			</Alert>,
		);

		expect(container.querySelector('[data-slot="alert"]')).toBeNull();
	});

	it('forwards its ref to the alert element', () => {
		const ref = createRef<HTMLDivElement>();

		render(<Alert ref={ref}>Message</Alert>);

		expect(ref.current).toBe(screen.getByRole('alert'));
	});
});
