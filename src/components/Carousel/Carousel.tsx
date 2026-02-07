'use client';
import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { Buttons } from './Buttons';
import { CarouselContext } from './CarouselContext';
import { Content } from './Content';
import { Dots } from './Dots';
import { Item } from './Item';
import { rootClass } from './styles.css';
import type { CarouselApi, CarouselOptions, CarouselPlugin } from './types';
import { useLogic } from './useLogic';

export type CarouselProps<TData> = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: 'horizontal' | 'vertical';
	setApi?: (api: CarouselApi) => void;
	className?: string;
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
	data: TData[];
	keyId: keyof TData;
	showDots?: boolean;
	showArrows?: boolean;
	renderItem: (item: TData) => React.ReactNode;
};

export function Carousel<TData>({
	width = '100%',
	height = '100%',
	...props
}: CarouselProps<TData>) {
	const {
		canScrollNext,
		canScrollPrev,
		scrollNext,
		scrollPrev,
		api,
		opts,
		orientation,
		carouselRef,
		handleKeyDown,
		data,
		isShowButtons,
		isShowDots,
	} = useLogic(props);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api,
				opts,
				orientation:
					orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={clsx(rootClass, props.className)}
				data-slot="carousel"
				style={{
					width,
					height,
				}}
			>
				<Content
					style={{
						width,
						height,
					}}
				>
					{data.map((item) => (
						<Item key={`${item[props.keyId]}`}>{props.renderItem(item)}</Item>
					))}
				</Content>
				{isShowButtons && <Buttons />}
				{isShowDots && <Dots api={api} orientation={orientation} />}
			</div>
		</CarouselContext.Provider>
	);
}
