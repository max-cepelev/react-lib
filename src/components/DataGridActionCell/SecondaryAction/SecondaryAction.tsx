import { EllipsisVertical } from 'lucide-react';
import { Button } from '../../Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../DropdownMenu';
import { Tooltip, type TooltipProps } from '../../Tooltip';
import type { ActionCellHandler, SecondaryActionKind } from '../types';

type SecondaryActionProps<TAction> = {
	/**
	 *  Вторичные действия
	 */
	actions: SecondaryActionKind<TAction>[];
	/**
	 *  Обработчик нажатия на действие
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

export const SecondaryActions = <TAction,>({
	actions,
	onActionClick,
	tooltipPlacement,
	isDisabled,
}: SecondaryActionProps<TAction>) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button disabled={isDisabled} variant="ghost" size="icon">
					<EllipsisVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{actions.map((action) => {
					const { onClick, name, disabledReason, isLoading } = action;

					return (
						<DropdownMenuItem key={name} asChild>
							<Tooltip arrow side={tooltipPlacement} text={disabledReason}>
								<Button
									onClick={onActionClick(onClick)}
									isLoading={isLoading}
									variant="ghost"
									size="sm"
									fullWidth
								>
									{name}
								</Button>
							</Tooltip>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
