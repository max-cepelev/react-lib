import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { ScalableContainer } from '~/components';
import { theme } from '~/theme';

export default {
	title: 'ScalableContainer',
	component: ScalableContainer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ScalableContainer>;

const content = (
	<div
		style={{
			display: 'grid',
			width: 320,
			height: 220,
			placeItems: 'center',
			border: `1px solid ${theme.colors.border}`,
			borderRadius: theme.borderRadius.lg,
			backgroundColor: theme.colors.background.element,
			color: theme.colors.text.primary,
			fontSize: theme.fontSize['2xl'],
			fontWeight: theme.fontWeight.semibold,
		}}
	>
		Перетащите меня
	</div>
);

export function Basic() {
	return (
		<div
			style={{
				width: 640,
				height: 420,
				border: `1px solid ${theme.colors.border}`,
			}}
		>
			<ScalableContainer>{content}</ScalableContainer>
		</div>
	);
}

export function WithToolbar() {
	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	return (
		<div>
			<div
				style={{
					width: 640,
					height: 420,
					border: `1px solid ${theme.colors.border}`,
				}}
			>
				<ScalableContainer
					showToolbar
					onScaleChanged={setScale}
					onPositionChanged={setPosition}
				>
					{content}
				</ScalableContainer>
			</div>
			<div style={{ marginTop: theme.spacing[3], fontFamily: 'monospace' }}>
				scale: {scale.toFixed(2)}; position: {Math.round(position.x)},{' '}
				{Math.round(position.y)}
			</div>
		</div>
	);
}

export function InsideScrollablePage() {
	return (
		<div
			style={{
				display: 'flex',
				minHeight: 1400,
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: 640,
					height: 420,
					border: `1px solid ${theme.colors.border}`,
				}}
			>
				<ScalableContainer showToolbar>{content}</ScalableContainer>
			</div>
		</div>
	);
}

export function InteractiveContent() {
	const [clicks, setClicks] = useState(0);

	return (
		<div>
			<div
				style={{
					width: 640,
					height: 420,
					border: `1px solid ${theme.colors.border}`,
				}}
			>
				<ScalableContainer showToolbar>
					{/** biome-ignore lint/a11y/useKeyWithClickEvents: verifies pointer interaction inside ScalableContainer */}
					<svg
						aria-label="Interactive map"
						onClick={() => setClicks((value) => value + 1)}
						role="img"
						style={{ width: 320, height: 220 }}
						viewBox="0 0 320 220"
					>
						<rect
							width="320"
							height="220"
							fill={theme.colors.background.element}
						/>
						{/** biome-ignore lint/a11y/noStaticElementInteractions: verifies clickable SVG geometry */}
						<path
							d="M 80 60 L 240 60 L 240 160 L 80 160 Z"
							fill={theme.colors.info}
							onClick={(event) => {
								event.stopPropagation();
								setClicks((value) => value + 1);
							}}
						/>
					</svg>
				</ScalableContainer>
			</div>
			<div style={{ marginTop: theme.spacing[3] }}>clicks: {clicks}</div>
		</div>
	);
}
