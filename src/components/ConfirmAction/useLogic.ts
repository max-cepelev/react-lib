import { useState } from 'react';
import type { ButtonProps } from '../Button';
import type { ConfirmActionProps } from './ConfirmAction';

export const useLogic = ({
	skipConfirm,
	onConfirm,
	confirmButtonProps: externalConfirmButtonProps,
}: ConfirmActionProps) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = () => {
		setOpen(false);
		onConfirm();
	};

	const confirmButtonProps: Partial<ButtonProps> = {
		variant: externalConfirmButtonProps?.isAccented ? 'destructive' : 'default',
		size: 'sm',
		onClick: handleConfirm,
	};

	const onActionComponentClick = () => {
		if (skipConfirm) {
			onConfirm();
		} else {
			setOpen(true);
		}
	};

	const onOpenChange = (open: boolean) => {
		setOpen(open);
	};

	const onCancel = () => {
		setOpen(false);
	};
	return {
		open,
		onActionComponentClick,
		confirmButtonProps,
		onCancel,
		onOpenChange,
	};
};
