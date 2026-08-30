import clsx from 'clsx';
import {
	DayPicker,
	type PropsBase,
	type PropsMulti,
	type PropsMultiRequired,
	type PropsRange,
	type PropsRangeRequired,
	type PropsSingle,
	type PropsSingleRequired,
} from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { DayButton } from './DayButton';
import { Dropdown } from './Dropdown';
import * as styles from './styles.css';

export type {
	PropsBase,
	PropsMulti,
	PropsMultiRequired,
	PropsRange,
	PropsRangeRequired,
	PropsSingle,
	PropsSingleRequired,
};

export type CalendarProps = PropsBase &
	(
		| PropsSingle
		| PropsSingleRequired
		| PropsMulti
		| PropsMultiRequired
		| PropsRange
		| PropsRangeRequired
		| {
				mode?: undefined;
				required?: undefined;
		  }
	);

export const Calendar = ({
	className,
	classNames,
	components,
	locale = ru,
	showOutsideDays = true,
	...props
}: CalendarProps) => {
	return (
		<DayPicker
			{...props}
			className={className}
			locale={locale}
			showOutsideDays={showOutsideDays}
			classNames={{
				...classNames,
				month: clsx(styles.month, classNames?.month),
				months: clsx(styles.months, classNames?.months),
				nav: clsx(styles.nav, classNames?.nav),
				month_caption: clsx(styles.monthCaption, classNames?.month_caption),
				dropdown: clsx(styles.dropdownNav, classNames?.dropdown),
				dropdowns: clsx(styles.dropdowns, classNames?.dropdowns),
			}}
			components={{
				DayButton,
				Dropdown,
				PreviousMonthButton: ({ className, color, ...props }) => (
					<Button
						className={clsx(styles.monthButton, className)}
						variant="ghost"
						{...props}
					/>
				),
				NextMonthButton: ({ className, color, ...props }) => (
					<Button
						className={clsx(styles.monthButton, className)}
						variant="ghost"
						{...props}
					/>
				),
				CaptionLabel: ({ className, color, ...props }) => (
					<Typography transform="capitalize" className={className} {...props} />
				),
				...components,
			}}
		/>
	);
};
