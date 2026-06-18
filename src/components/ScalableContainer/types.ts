export type ScalableContainerPosition = {
	x: number;
	y: number;
};

export type ScalableContainerProps = React.ComponentPropsWithoutRef<'div'> & {
	initialScale?: number;
	minScale?: number;
	maxScale?: number;
	showToolbar?: boolean;
	onScaleChanged?: (scale: number) => void;
	onPositionChanged?: (position: ScalableContainerPosition) => void;
};
