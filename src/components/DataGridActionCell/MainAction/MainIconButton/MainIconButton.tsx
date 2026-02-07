import { Button } from '../../../Button';
import {
	type ActionComponentParams,
	ConfirmAction,
	type ConfirmActionProps,
} from '../../../ConfirmAction';
import { Tooltip, type TooltipProps } from '../../../Tooltip';
import type { ActionCellHandler, SingleAction } from '../../types';
import { useLogic } from './useLogic';

export type MainIconButtonProps<TAction> = {
	action: SingleAction<TAction> & {
		disabled?: boolean;
		isLoading?: boolean;
	};
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

export const MainIconButton = <TAction,>(
	props: MainIconButtonProps<TAction>,
) => {
	const { tooltipProps } = useLogic(props);
	const { action, onActionClick, isDisabled, tooltipPlacement } = props;

	const {
		name,
		icon,
		needConfirm,
		confirmText,
		confirmButtonProps,
		disabled,
		isLoading,
		onClick,
	} = action;

	const renderButton = (
		renderProps: ActionComponentParams | ActionCellHandler<TAction>,
	) => {
		return (
			<Tooltip arrow key={name} side={tooltipPlacement} {...tooltipProps}>
				<Button
					disabled={isDisabled || disabled}
					isLoading={isLoading}
					variant="ghost"
					size="icon"
					{...renderProps}
				>
					{icon}
				</Button>
			</Tooltip>
		);
	};

	return (
		<>
			{needConfirm ? (
				<ConfirmAction
					text={confirmText}
					confirmButtonProps={confirmButtonProps}
					actionComponent={(renderProps) => renderButton(renderProps)}
					onConfirm={onActionClick(onClick) as ConfirmActionProps['onConfirm']}
				/>
			) : (
				renderButton({
					onClick: onActionClick(onClick) as ConfirmActionProps['onConfirm'],
				})
			)}
		</>
	);
};
