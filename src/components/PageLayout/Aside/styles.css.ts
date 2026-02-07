import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const rootClass = style(
	{
		gridArea: 'aside',
		scrollbarGutter: 'stable',
		overflow: 'auto',
		width: 320,
		padding: theme.spacing[4],
		borderLeft: `1px solid ${theme.colors.border}`,
	},
	'PageLayoutAside',
);
