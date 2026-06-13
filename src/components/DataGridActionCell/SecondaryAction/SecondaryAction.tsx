import { EllipsisVertical } from 'lucide-react';
import { Button } from '../../Button';
import { DropdownMenu } from '../../DropdownMenu';
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
			<DropdownMenu.Trigger
				render={
					<Button disabled={isDisabled} variant="ghost" size="icon">
						<EllipsisVertical />
					</Button>
				}
			/>
			<DropdownMenu.Content>
				{actions.map((action) => {
					const { onClick, name, disabledReason, isLoading } = action;

					return (
						<Tooltip
							key={name}
							arrow
							side={tooltipPlacement}
							text={disabledReason}
						>
							<DropdownMenu.Item
								render={
									<Button
										onClick={onActionClick(onClick)}
										isLoading={isLoading}
										variant="ghost"
										size="small"
										fullWidth
									>
										{name}
									</Button>
								}
							/>
						</Tooltip>
					);
				})}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
