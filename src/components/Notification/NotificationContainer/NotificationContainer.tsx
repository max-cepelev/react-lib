import { CircleCheck, Info, OctagonAlert, TriangleAlert } from 'lucide-react';
import { Toaster } from 'sonner';
import { theme } from '~/theme';
import { NOTIFICATION_POSITIONS } from '../constants';

type NotificationsProps = {
	position?: keyof typeof NOTIFICATION_POSITIONS;
	className?: string;
	style?: React.CSSProperties;
};

export const NotificationContainer = ({
	position = 'bottomRight',
	...props
}: NotificationsProps) => (
	<Toaster
		duration={3000}
		// closeButton
		icons={{
			error: <OctagonAlert size={20} color={theme.colors.error} />,
			success: <CircleCheck size={20} color={theme.colors.success} />,
			warning: <TriangleAlert size={20} color={theme.colors.warning} />,
			info: <Info size={20} color={theme.colors.info} />,
		}}
		position={NOTIFICATION_POSITIONS[position]}
		{...props}
	/>
);
