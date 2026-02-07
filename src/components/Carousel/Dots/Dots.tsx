import { clsx } from 'clsx';
import type { CarouselApi } from '../types';
import * as styles from './styles.css';
import { useLogic } from './useLogic';

export const Dots = ({
	api,
	orientation,
}: {
	api: CarouselApi;
	orientation: 'horizontal' | 'vertical';
}) => {
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useLogic(api);
	return (
		<div className={styles.wrapper[orientation]}>
			{scrollSnaps.map((number, index) => (
				<button
					type="button"
					key={number}
					className={clsx(styles.dotButton[orientation], {
						[styles.selected]: index === selectedIndex,
					})}
					onClick={() => onDotButtonClick(index)}
				/>
			))}
		</div>
	);
};
