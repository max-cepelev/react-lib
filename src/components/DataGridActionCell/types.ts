import type { MouseEventHandler, ReactNode } from 'react';

import type { ConfirmActionProps } from '../ConfirmAction';

export type NestedAction<TAction> = {
	/**
	 * Название действия
	 */
	name: string;

	/**
	 * Обработчик действия
	 */
	onClick?: (row: TAction) => void;
};

export type SingleAction<TAction> = {
	/**
	 * Название действия
	 */
	name: string;

	/**
	 * Иконка действия
	 */
	icon?: ReactNode;

	/**
	 * Флаг показа выпадающего списка при клике
	 */
	nested?: false;

	/**
	 * Если `true`, при клике на кнопку будет вызываться подтверждение действия
	 */
	needConfirm?: boolean;

	/**
	 * Поясняющий текст для подтверждения действия
	 */
	confirmText?: ConfirmActionProps['text'];

	/**
	 * Параметры кнопки подтверждения действия
	 */
	confirmButtonProps?: ConfirmActionProps['confirmButtonProps'];

	/**
	 * Если true, блокирует взаимодействие с actions
	 */
	isBlockingOperation?: boolean;

	/**
	 * Причина блокировки действия
	 */
	disabledReason?: string;

	/**
	 * Причина блокировки строки во время загрузки
	 */
	loadingNote?: string;

	isLoading?: boolean;

	/**
	 * Обработчик действия
	 */
	onClick?: (row: TAction) => void;
};

export type MultipleAction<TAction> = {
	/**
	 * Иконка действия
	 */
	icon: ReactNode;
	/**
	 * Список действий для выпадающего списка
	 */
	actions: Array<NestedAction<TAction>>;
	/**
	 * Флаг показа выпадающего списка при клике
	 */
	nested: true;
	/**
	 * Название действия
	 */
	name: string;
	/**
	 * Причина блокировки строки во время загрузки
	 */
	loadingNote?: string;
	/**
	 * Если true, блокирует взаимодействие с actions
	 */
	isBlockingOperation?: boolean;
	/**
	 * Если true, происходит загрузка
	 */
	isLoading?: boolean;
};

export type ActionCellHandler<TAction> = (
	onClick: SingleAction<TAction>['onClick'] | NestedAction<TAction>['onClick'],
) =>
	| MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLLIElement>
	| undefined;

export type MainActionKind<TAction> =
	| SingleAction<TAction>
	| (MultipleAction<TAction> & {
			disabled?: boolean;
			disabledReason?: string;
	  });

export type SecondaryActionKind<TAction> = SingleAction<TAction> & {
	/**
	 * Причина блокировки действия
	 */
	disabledReason?: string;

	/**
	 * Если true, происходит загрузка
	 */
	isLoading?: boolean;
};
