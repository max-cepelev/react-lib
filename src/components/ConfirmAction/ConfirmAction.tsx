import { clsx } from 'clsx';
import type { ReactElement, SyntheticEvent } from 'react';
import { Button } from '../Button';
import { Popover, type PopoverProps } from '../Popover';
import { Typography } from '../Typography';
import {
	actionsClass,
	hasTextClass,
	popoverClass,
	wrapperClass,
} from './styles.css';
import { useLogic } from './useLogic';

export type ActionComponentParams = {
	onClick: (event: SyntheticEvent) => void;
};

export type ConfirmActionProps = {
	/**
	 * Поясняющий текст
	 */
	text?: string;

	/**
	 * Параметры кнопки подтверждения действия
	 */
	confirmButtonProps?: {
		/**
		 * Текст кнопки
		 */
		text?: string;

		/**
		 * Если `true`, кнопка будет иметь акцент на критичность действия. Стоит использовать для важных действий, например при удалении.
		 * @default 'false'
		 */
		isAccented?: boolean;
	};

	skipConfirm?: boolean;

	popoverProps?: {
		side: PopoverProps.Content['side'];
		align: PopoverProps.Content['align'];
	};

	/**
	 * Кнопка, действие которой необходимо подтвердить
	 */
	actionComponent: (params: ActionComponentParams) => ReactElement;

	/**
	 * Целевое действие, которое должно произойти после подтверждения
	 */
	onConfirm: () => void;
};

export const ConfirmAction = (props: ConfirmActionProps) => {
	const {
		open,
		onActionComponentClick,
		onCancel,
		confirmButtonProps,
		onOpenChange,
	} = useLogic(props);

	const {
		text,
		confirmButtonProps: externalConfirmButtonProps,
		popoverProps: externalPopoverProps,
		actionComponent,
	} = props;
	const { text: confirmButtonText = 'Подтвердить' } =
		externalConfirmButtonProps || {};

	const { side = 'bottom', align = 'center' } = externalPopoverProps || {};

	return (
		<Popover open={open} onOpenChange={onOpenChange}>
			<Popover.Trigger
				render={actionComponent({
					onClick: onActionComponentClick,
				})}
			/>
			<Popover.Content
				side={side}
				align={align}
				className={clsx(popoverClass, { [hasTextClass]: Boolean(text) })}
			>
				<div className={wrapperClass}>
					{text && <Typography>{text}</Typography>}
					<div className={actionsClass}>
						<Button size="small" variant="ghost" onClick={onCancel}>
							Отмена
						</Button>

						<Button {...confirmButtonProps}>{confirmButtonText}</Button>
					</div>
				</div>
			</Popover.Content>
		</Popover>
	);
};
