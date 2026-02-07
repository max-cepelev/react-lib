import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const nav = style(
	{
		position: 'absolute',
		display: 'flex',
		justifyContent: 'space-between',
		top: theme.spacing[1],
		left: 0,
		width: '100%',
	},
	'nav',
);

export const monthButton = style(
	{
		width: theme.spacing[8],
		height: theme.spacing[8],
		padding: theme.spacing[2],
	},
	'monthButton',
);

export const months = style(
	{
		position: 'relative',
		display: 'flex',
		gap: theme.spacing[4],
		paddingTop: theme.spacing[1],
	},
	'months',
);

export const month = style(
	{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	'month',
);

export const monthCaption = style(
	{
		height: theme.spacing[8],
		display: 'grid',
		placeItems: 'center',
	},
	'monthCaption',
);

export const dropdowns = style(
	{
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	'dropdowns',
);

export const dropdownNav = style(
	{
		display: 'flex',
		columnGap: theme.spacing[4],
		alignItems: 'center',
		fontSize: theme.fontSize.lg,
	},
	'dropdownNav',
);

globalStyle(`${dropdownNav} button`, {
	textTransform: 'capitalize',
	fontSize: theme.fontSize.lg,
});
