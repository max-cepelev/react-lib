import { Button } from '../../Button';
import { DropdownMenu } from '../../DropdownMenu';
import { Tooltip, type TooltipProps } from '../../Tooltip';
import type { ActionCellHandler, MainActionKind } from '../types';

import { MainIconButton } from './MainIconButton';

type MainActionProps<TAction> = {
	/**
	 *  Основные действия
	 */
	action: MainActionKind<TAction>;

	/**
	 *  Обработчик клика на действие
	 */
	onActionClick: ActionCellHandler<TAction>;

	/**
	 *  Если true, action не доступен
	 */
	isDisabled?: boolean;

	/**
	 *  Положение тултипа
	 */
	tooltipPlacement?: TooltipProps['side'];
};

export const MainAction = <TAction,>({
	action,
	onActionClick,
	isDisabled,
	tooltipPlacement,
}: MainActionProps<TAction>) => {
	if ('actions' in action) {
		const { disabled, icon, name, disabledReason, actions, isLoading } = action;

		return (
			<DropdownMenu>
				<Tooltip
					key={name}
					text={disabledReason || name}
					side={tooltipPlacement}
					arrow
				>
					<DropdownMenu.Trigger
						render={
							<Button
								variant="ghost"
								size="icon"
								isLoading={isLoading}
								disabled={isDisabled || disabled}
							>
								{icon}
							</Button>
						}
					/>
				</Tooltip>
				<DropdownMenu.Content>
					{actions.map(
						({ name: nestedActionName, onClick: onClickNested, ...props }) => (
							<DropdownMenu.Item
								{...props}
								key={nestedActionName}
								render={
									<Button size="small" onClick={onActionClick(onClickNested)}>
										{nestedActionName}
									</Button>
								}
							/>
						),
					)}
				</DropdownMenu.Content>
			</DropdownMenu>
		);
	}

	return (
		<MainIconButton
			action={action}
			onActionClick={onActionClick}
			isDisabled={isDisabled}
			tooltipPlacement={tooltipPlacement}
		/>
	);
};
