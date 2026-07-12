export type CarouselAlign = 'start' | 'center' | 'end';
export type CarouselOrientation = 'horizontal' | 'vertical';

export type CarouselEventName = 'reInit' | 'select';
export type CarouselEventCallback = (api: CarouselApi) => void;

export type CarouselApi = {
	scrollPrev: () => void;
	scrollNext: () => void;
	scrollTo: (index: number, jump?: boolean) => void;
	scrollToSnap: (index: number, jump?: boolean) => void;
	canScrollNext: () => boolean;
	canScrollPrev: () => boolean;
	selectedScrollSnap: () => number;
	scrollSnapList: () => number[];
	on: (
		event: CarouselEventName,
		callback: CarouselEventCallback,
	) => CarouselApi;
	off: (
		event: CarouselEventName,
		callback: CarouselEventCallback,
	) => CarouselApi;
	reInit: () => void;
};
