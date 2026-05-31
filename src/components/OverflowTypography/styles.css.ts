import {
	type ComplexStyleRule,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import type { TypographyAlign } from '../Typography/types';

export const truncate = style({
	overflow: 'hidden',
	maxWidth: '100%',
	minWidth: 0,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const multipleRows = style({
	display: '-webkit-box',
	whiteSpace: 'initial',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 'var(--rows-count)',
});

export const wrapper = style({
	display: 'flex',
	minWidth: 0,
	width: '100%',
	whiteSpace: 'nowrap',
});

export const wrapperAlignments = styleVariants<
	Record<TypographyAlign, ComplexStyleRule>
>({
	left: { justifyContent: 'flex-start' },
	center: { justifyContent: 'center' },
	right: { justifyContent: 'flex-end' },
	justify: { justifyContent: 'space-between' },
});
