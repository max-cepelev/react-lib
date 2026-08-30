import { clsx } from 'clsx';
import { type ButtonHTMLAttributes, useEffect, useRef } from 'react';
import type { CalendarDay, Modifiers } from 'react-day-picker';
import { Button } from '../../Button';
import * as styles from './styles.css';

export const DayButton = (
	props: {
		day: CalendarDay;
		modifiers: Modifiers;
	} & ButtonHTMLAttributes<HTMLButtonElement>,
) => {
	const { modifiers, className, ...buttonProps } = props;

	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (modifiers.focused) {
			ref.current?.focus();
		}
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			className={clsx(
				styles.button,
				{
					[styles.outside]: modifiers.outside,
					[styles.today]: modifiers.today,
				},
				className,
			)}
			variant={modifiers.selected ? 'default' : 'ghost'}
			{...buttonProps}
		/>
	);
};
