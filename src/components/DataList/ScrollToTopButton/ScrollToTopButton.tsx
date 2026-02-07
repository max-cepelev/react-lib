import { clsx } from 'clsx';
import { ChevronUp } from 'lucide-react';
import { Button } from '~/components';
import { buttonClass, visible } from './styles.css';

export type ScrollToTopButtonProps = {
	onClick: () => void;
	isVisible?: boolean;
};

export const ScrollToTopButton = ({
	onClick,
	isVisible,
}: ScrollToTopButtonProps) => {
	return (
		<Button
			onClick={onClick}
			size="icon"
			variant="outline"
			className={clsx(buttonClass, { [visible]: isVisible })}
		>
			<ChevronUp />
		</Button>
	);
};
