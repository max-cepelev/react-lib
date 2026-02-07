import { Typography } from '../../Typography';

import { END_OF_SCROLL_MESSAGE } from './constants';
import { item } from './styles.css';

type Props = {
	endOfScrollMsg?: string;
};

export const EndData = ({ endOfScrollMsg = END_OF_SCROLL_MESSAGE }: Props) => (
	<li className={item}>
		<Typography>{endOfScrollMsg}</Typography>
	</li>
);
