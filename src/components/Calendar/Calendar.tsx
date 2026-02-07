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
	showOutsideDays = true,
	...props
}: CalendarProps) => {
	return (
		<DayPicker
			locale={ru}
			showOutsideDays={showOutsideDays}
			classNames={{
				month: styles.month,
				months: styles.months,
				nav: styles.nav,
				month_caption: styles.monthCaption,
				dropdown: styles.dropdownNav,
				dropdowns: styles.dropdowns,
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
			}}
			{...props}
		/>
	);
};
