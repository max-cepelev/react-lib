import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const separatorClass = style({
	padding: 0,
	margin: 0,
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	borderWidth: 0,
	color: theme.colors.border,
});
