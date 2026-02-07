import { CircularProgress } from '../../CircularProgress';
import { item } from './styles.css';

export const Loader = () => (
	<li className={item}>
		<CircularProgress color="primary" />
	</li>
);
