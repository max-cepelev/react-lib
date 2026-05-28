import { clsx } from 'clsx';
import { OTPInput } from 'input-otp';

import type { ComponentProps } from 'react';
import { Separator } from './Separator';
import { Slot } from './Slot';
import * as styles from './styles.css';

export type InputOTPProps = Omit<
	ComponentProps<typeof OTPInput>,
	'render' | 'children'
> & {
	containerClassName?: string;
};

export const InputOTP = ({
	className,
	containerClassName,
	disabled,
	...props
}: InputOTPProps) => (
	<OTPInput
		containerClassName={clsx(
			styles.container,
			{
				[styles.disabled]: disabled,
			},
			containerClassName,
		)}
		className={clsx(styles.input, className)}
		render={({ slots }) => {
			if (slots.length % 2 !== 0) {
				return (
					<div className={styles.group}>
						{slots.map((slot, index) => (
							<Slot key={`${index.toString()}-${slot.char}`} {...slot} />
						))}
					</div>
				);
			}

			return (
				<>
					<div className={styles.group}>
						{slots.slice(0, slots.length / 2).map((slot, idx) => (
							<Slot key={`${idx.toString()}-${slot.char}`} {...slot} />
						))}
					</div>
					<Separator />
					<div className={styles.group}>
						{slots.slice(slots.length / 2).map((slot, idx) => (
							<Slot key={`${idx.toString()}-${slot.char}`} {...slot} />
						))}
					</div>
				</>
			);
		}}
		{...props}
	/>
);
