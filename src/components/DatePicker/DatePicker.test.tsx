import { fireEvent, render, screen } from '@testing-library/react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

type MockCalendarProps = {
	className?: string;
	style?: CSSProperties;
	selected?: Date;
	disabled?: unknown;
	onSelect?: (
		date: Date | undefined,
		triggerDate: Date,
		modifiers: Record<string, boolean>,
		event: ReactMouseEvent,
	) => void;
};

const audit = vi.hoisted(() => ({ calendarProps: vi.fn() }));

vi.mock('./styles.css', () => ({
	control: 'date-picker-control',
	fullWidth: 'date-picker-full-width',
	helperText: 'date-picker-helper-text',
	root: 'date-picker-root',
	trigger: 'date-picker-trigger',
}));

vi.mock('../InputGroup/styles.css', () => ({
	addon: 'input-group-addon',
	addonAlign: {
		'block-end': '',
		'block-start': '',
		'inline-end': '',
		'inline-start': '',
	},
	button: 'input-group-button',
	buttonSize: {
		extraSmall: '',
		iconExtraSmall: '',
		iconSmall: '',
		small: '',
	},
	control: 'input-group-control',
	input: 'input-group-input',
	root: 'input-group-root',
	text: 'input-group-text',
	textarea: 'input-group-textarea',
}));

vi.mock('../Button/button.css', () => ({
	buttonBase: 'button',
	buttonSizes: {
		icon: '',
		iconSmall: '',
		large: '',
		medium: '',
		small: '',
	},
	buttonVariants: {
		default: '',
		destructive: '',
		ghost: '',
		link: '',
		outline: '',
	},
	endAdornment: '',
	fullWidthStyle: '',
	loading: '',
	startAdornment: '',
}));

vi.mock('../Label/label.css', () => ({
	disabled: 'label-disabled',
	error: 'label-error',
	required: 'label-required',
	root: 'label-root',
}));

vi.mock('../Popover/styles.css', () => ({
	content: 'popover-content',
	positioner: 'popover-positioner',
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

vi.mock('../Calendar/Calendar', () => ({
	Calendar: (props: MockCalendarProps) => {
		audit.calendarProps(props);

		return (
			<div
				data-testid="calendar"
				className={props.className}
				style={props.style}
			>
				<button
					type="button"
					onClick={(event) => {
						const date = new Date(2026, 0, 15);
						props.onSelect?.(date, date, {}, event);
					}}
				>
					15 января 2026
				</button>
			</div>
		);
	},
}));

import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
	it('routes root, input, popup and calendar styles to their slots', () => {
		render(
			<DatePicker
				data-testid="date-picker"
				label="Дата"
				defaultOpen
				style={{ width: 360 }}
				inputProps={{
					className: 'custom-input',
					style: { fontWeight: 600 },
				}}
				calendarProps={{
					className: 'custom-calendar',
					style: { minWidth: 280 },
				}}
				contentProps={{ style: { padding: 12 } }}
			/>,
		);

		const root = screen.getByTestId('date-picker');
		const input = screen.getByLabelText('Дата');
		const popup = document.querySelector<HTMLElement>(
			'[data-slot="date-picker-content"]',
		);

		expect(root).toHaveStyle({ width: '360px' });
		expect(input).toHaveClass('custom-input');
		expect(input).toHaveStyle({ fontWeight: '600' });
		expect(popup).toHaveStyle({ padding: '12px' });
		expect(screen.getByTestId('calendar')).toHaveClass('custom-calendar');
		expect(screen.getByTestId('calendar')).toHaveStyle({ minWidth: '280px' });
	});

	it('connects the label and helper text to the input', () => {
		render(
			<DatePicker
				label="Дата рождения"
				helperText="В формате ДД.ММ.ГГГГ"
				required
			/>,
		);

		const input = screen.getByLabelText('Дата рождения');
		const helperText = screen.getByText('В формате ДД.ММ.ГГГГ');

		expect(input).toBeRequired();
		expect(input).toHaveAttribute('aria-describedby', helperText.id);
		expect(
			screen.getByRole('button', { name: 'Открыть календарь' }),
		).toBeEnabled();
	});

	it('disables both the input and calendar trigger', () => {
		render(<DatePicker disabled />);

		const input = screen.getByPlaceholderText('дд.мм.гггг');
		const trigger = screen.getByRole('button', { name: 'Открыть календарь' });

		expect(input).toBeDisabled();
		expect(trigger).toBeDisabled();
		fireEvent.click(trigger);
		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
	});

	it('rejects impossible dates and accepts leap-year dates on blur', () => {
		const onValueChange = vi.fn();
		render(<DatePicker onValueChange={onValueChange} />);
		const input = screen.getByPlaceholderText('дд.мм.гггг');

		fireEvent.change(input, { target: { value: '31.02.2025' } });
		fireEvent.blur(input);
		expect(screen.getByRole('alert')).toHaveTextContent('Некорректная дата');
		expect(onValueChange).not.toHaveBeenCalled();

		fireEvent.change(input, { target: { value: '29.02.2024' } });
		fireEvent.blur(input);
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		expect(onValueChange).toHaveBeenCalledWith(new Date(2024, 1, 29), {
			event: expect.anything(),
			source: 'input',
		});
	});

	it('keeps the committed value controlled by the parent', () => {
		const onValueChange = vi.fn();
		const { rerender } = render(
			<DatePicker
				value={new Date(2025, 0, 10)}
				onValueChange={onValueChange}
			/>,
		);
		const input = screen.getByPlaceholderText('дд.мм.гггг');

		fireEvent.change(input, { target: { value: '15.01.2025' } });
		fireEvent.blur(input);
		expect(input).toHaveValue('10.01.2025');

		rerender(
			<DatePicker
				value={new Date(2025, 0, 15)}
				onValueChange={onValueChange}
			/>,
		);
		expect(input).toHaveValue('15.01.2025');
	});

	it('clears an uncontrolled value through the input', () => {
		const onValueChange = vi.fn();
		render(
			<DatePicker
				defaultValue={new Date(2025, 0, 10)}
				onValueChange={onValueChange}
			/>,
		);
		const input = screen.getByPlaceholderText('дд.мм.гггг');

		fireEvent.change(input, { target: { value: '' } });
		fireEvent.blur(input);

		expect(input).toHaveValue('');
		expect(onValueChange).toHaveBeenCalledWith(null, {
			event: expect.anything(),
			source: 'clear',
		});
	});

	it('uses the same restrictions for typed and calendar dates', () => {
		const onValueChange = vi.fn();
		render(
			<DatePicker
				defaultOpen
				min={new Date(2026, 7, 1)}
				max={new Date(2026, 7, 31)}
				calendarProps={{ disabled: { dayOfWeek: [0, 6] } }}
				onValueChange={onValueChange}
			/>,
		);
		const input = screen.getByPlaceholderText('дд.мм.гггг');

		fireEvent.change(input, { target: { value: '01.08.2026' } });
		fireEvent.blur(input);
		expect(screen.getByRole('alert')).toHaveTextContent(
			'Дата недоступна для выбора',
		);
		expect(onValueChange).not.toHaveBeenCalled();
		expect(audit.calendarProps).toHaveBeenLastCalledWith(
			expect.objectContaining({ disabled: expect.any(Array) }),
		);
	});

	it('clears an input error, emits the source and closes after calendar selection', () => {
		const onValueChange = vi.fn();
		render(<DatePicker defaultOpen onValueChange={onValueChange} />);
		const input = screen.getByPlaceholderText('дд.мм.гггг');

		fireEvent.change(input, { target: { value: '32.01.2026' } });
		fireEvent.blur(input);
		expect(screen.getByRole('alert')).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: '15 января 2026' }));
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 0, 15), {
			event: expect.anything(),
			source: 'calendar',
		});
		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
	});
});
