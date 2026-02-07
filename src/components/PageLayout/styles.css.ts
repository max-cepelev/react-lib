import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { PAGE_ASIDE_CLASSNAME, PAGE_HEADER_CLASSNAME } from './constants';

export const rootClass = style({
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	gridTemplateRows: 'auto 1fr auto',
	backgroundColor: theme.colors.background.paper,
	gridTemplateAreas: '"header header" "content aside" "footer footer"',
	flexGrow: 1,
	height: '100%',
	minHeight: 0,
	'@container': {
		'(min-width: 600px)': {
			scrollBehavior: 'smooth',
			overflowY: 'auto',
			display: 'flex',
			flexDirection: 'column',
			marginBottom: 0,
			paddingTop: 0,
			paddingBottom: '80px',
		},
	},
});

globalStyle(
	`${rootClass}:has(.${PAGE_ASIDE_CLASSNAME}) .${PAGE_HEADER_CLASSNAME}`,
	{
		borderBottom: `1px solid ${theme.colors.border}`,
		paddingBottom: theme.spacing[4],
	},
);
