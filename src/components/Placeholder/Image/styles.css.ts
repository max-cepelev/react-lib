import {
	type ComplexStyleRule,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { PlaceholderSize } from '../types';

export const wrapper = style({
	display: 'block',
	maxWidth: '100%',
	objectFit: 'contain',
	color: theme.colors.text.secondary,
	'@media': {
		'(max-width: 600px)': {
			margin: `auto auto ${theme.spacing[4]}`,
		},
	},
});

export const sizes = styleVariants<Record<PlaceholderSize, ComplexStyleRule>>({
	sm: {
		margin: `auto auto ${theme.spacing[4]}`,
	},
	md: {
		margin: `auto auto ${theme.spacing[8]}`,
	},
	lg: {
		margin: `auto auto ${theme.spacing[10]}`,
	},
});
