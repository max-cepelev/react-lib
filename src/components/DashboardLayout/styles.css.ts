import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const containerClass = style(
	{
		width: '100%',
		height: '100%',
		display: 'grid',
		position: 'relative',
		gridTemplateColumns: 'auto 1fr',
		gridTemplateAreas: `
    'sidebar main'
  `,
		backgroundColor: theme.colors.background.paper,
	},
	'DashboardLayout',
);
