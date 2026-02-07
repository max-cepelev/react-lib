import {
	Range,
	Root,
	type SliderProps as SliderPrimitiveProps,
	Thumb,
	Track,
} from '@radix-ui/react-slider';
import { clsx } from 'clsx';
import * as styles from './styles.css';

export type SliderProps = SliderPrimitiveProps;

export const Slider = ({ className, ...props }: SliderProps) => (
	<Root className={clsx(styles.root, className)} {...props}>
		<Track className={styles.track}>
			<Range className={styles.range} />
		</Track>
		<Thumb className={styles.thumb} />
		{props.value?.length === 2 && <Thumb className={styles.thumb} />}
	</Root>
);
