import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { useCarousel } from '../CarouselContext';
import * as styles from './styles.css';
import { useLogic } from './useLogic';

export const Dots = ({ className, ...props }: ComponentProps<'div'>) => {
	const { api, orientation } = useCarousel();
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useLogic(api);
	return (
		<div className={clsx(styles.wrapper[orientation], className)} {...props}>
			{scrollSnaps.map((number, index) => (
				<button
					type="button"
					key={number}
					aria-label="Carousel Dots"
					data-selected={index === selectedIndex}
					className={clsx(styles.dotButton[orientation])}
					onClick={() => onDotButtonClick(index)}
				/>
			))}
		</div>
	);
};
