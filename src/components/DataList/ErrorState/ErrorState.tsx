import { Button } from '../../Button';
import { Typography } from '../../Typography';

import { ERROR_MESSAGE } from './constants';
import { item } from './styles.css';

type Props = {
	onRetry: () => void;
};

export const ErrorState = ({ onRetry }: Props) => (
	<li className={item}>
		<Typography align="center">{ERROR_MESSAGE}</Typography>
		<Button size="small" onClick={onRetry}>
			Попробовать снова
		</Button>
	</li>
);
