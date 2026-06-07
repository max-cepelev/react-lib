import { type SpacingKey, theme } from '.';

export type Spacing = {
	(value: SpacingKey): string;
	(topBottom: SpacingKey, rightLeft: SpacingKey): string;
	(top: SpacingKey, rightLeft: SpacingKey, bottom: SpacingKey): string;
	(
		top: SpacingKey,
		right: SpacingKey,
		bottom: SpacingKey,
		left: SpacingKey,
	): string;
};

export const negativeSpacing: Spacing = (...keys: SpacingKey[]) =>
	keys.map((key) => `calc(-1 * ${theme.spacing[key]})`).join(' ');

export const spacing: Spacing = (...keys: SpacingKey[]) => {
	return keys.map((key) => theme.spacing[key]).join(' ');
};

export const calculateSize = (value?: string | number) =>
	typeof value === 'number' ? `${value}px` : value;
