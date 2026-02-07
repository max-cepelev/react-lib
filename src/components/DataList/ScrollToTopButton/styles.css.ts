import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const buttonClass = style({
	position: 'absolute',
	right: theme.spacing[3],
	bottom: theme.spacing[8],
	zIndex: 1,
	visibility: 'hidden',
	transition: 'visibility 0.2s ease',
	'@container': {
		'(min-width: 600px)': {
			right: theme.spacing[8],
		},
	},
});

export const visible = style({
	visibility: 'visible',
});
