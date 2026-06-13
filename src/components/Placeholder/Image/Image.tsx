import clsx from 'clsx';
import type { AllHTMLAttributes } from 'react';
import type { PlaceholderSize } from '../types';
import { sizes, wrapper } from './styles.css';

export type ImageProps = Pick<
	AllHTMLAttributes<HTMLImageElement>,
	'src' | 'alt' | 'width' | 'height' | 'className'
> & {
	size?: PlaceholderSize;
};

export const Image = (props: ImageProps) => (
	<img
		alt={props.alt}
		src={props.src}
		className={clsx(wrapper, sizes[props.size || 'medium'], props.className)}
		width={props.width}
		height={props.height}
	/>
);
