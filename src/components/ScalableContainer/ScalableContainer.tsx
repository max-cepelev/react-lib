import { clsx } from 'clsx';
import { RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import * as styles from './styles.css';
import type { ScalableContainerProps } from './types';
import { useLogic } from './useLogic';

function ScalableContainer({
	initialScale = 1,
	minScale = 0.1,
	maxScale = 4,
	showToolbar = false,
	onScaleChanged,
	onPositionChanged,
	onWheel,
	className,
	children,
	style,
	...props
}: ScalableContainerProps) {
	const {
		contentStyle,
		cursor,
		handlePointerDown,
		handlePointerEnd,
		handlePointerMove,
		handleTouchEnd,
		handleTouchMove,
		handleTouchStart,
		modifierKey,
		reset,
		showOverlay,
		viewportRef,
		zoomIn,
		zoomOut,
	} = useLogic({
		initialScale,
		minScale,
		maxScale,
		onScaleChanged,
		onPositionChanged,
	});

	return (
		<div
			ref={viewportRef}
			data-slot="scalable-container"
			className={clsx(styles.viewport, className)}
			style={{ ...style, cursor }}
			onWheel={onWheel}
			{...props}
		>
			{showToolbar && (
				<ButtonGroup
					orientation="vertical"
					className={styles.toolbar}
					aria-label="Управление масштабом"
				>
					<Button
						type="button"
						onClick={zoomIn}
						size="iconSmall"
						title="Увеличить"
						aria-label="Увеличить"
						variant="outline"
					>
						<ZoomInIcon size={16} />
					</Button>
					<Button
						type="button"
						onClick={zoomOut}
						size="iconSmall"
						title="Уменьшить"
						aria-label="Уменьшить"
						variant="outline"
					>
						<ZoomOutIcon size={16} />
					</Button>
					<Button
						type="button"
						onClick={reset}
						size="iconSmall"
						title="Сбросить"
						aria-label="Сбросить"
						variant="outline"
					>
						<RotateCcwIcon size={16} />
					</Button>
				</ButtonGroup>
			)}

			<div
				data-slot="scalable-container-overlay"
				className={styles.overlay}
				data-visible={showOverlay}
				aria-hidden={!showOverlay}
			>
				Используйте {modifierKey} + колесо для масштабирования.
			</div>

			<div
				data-slot="scalable-container-content"
				className={styles.content}
				style={contentStyle}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerEnd}
				onPointerCancel={handlePointerEnd}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{children}
			</div>
		</div>
	);
}

export { ScalableContainer };
