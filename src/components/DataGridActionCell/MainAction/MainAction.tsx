import { Button } from '../../Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../DropdownMenu';
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
				<DropdownMenuTrigger asChild>
					<Tooltip
						key={name}
						text={disabledReason || name}
						side={tooltipPlacement}
						arrow
					>
						<Button
							variant="ghost"
							size="icon"
							isLoading={isLoading}
							disabled={isDisabled || disabled}
						>
							{icon}
						</Button>
					</Tooltip>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{actions.map(
						({ name: nestedActionName, onClick: onClickNested, ...props }) => (
							<DropdownMenuItem {...props} key={nestedActionName} asChild>
								<Button size="sm" onClick={onActionClick(onClickNested)}>
									{nestedActionName}
								</Button>
							</DropdownMenuItem>
						),
					)}
				</DropdownMenuContent>
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
