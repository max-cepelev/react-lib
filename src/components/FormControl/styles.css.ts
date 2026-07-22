import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const root = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[1],
	selectors: {
		'&[data-orientation="inline"]': {
			alignItems: 'center',
			columnGap: theme.spacing[1],
			display: 'grid',
			gridTemplateAreas: '"control label"',
			gridTemplateColumns: 'auto minmax(0, 1fr)',
			gridTemplateRows: 'auto',
			rowGap: 0,
		},
		'&[data-orientation="inline"][data-invalid]': {
			gridTemplateAreas: `
				"control label"
				"error error"
			`,
			gridTemplateRows: 'auto auto',
			rowGap: theme.spacing[1],
		},
	},
});

export const label = style({
	gridArea: 'label',
	selectors: {
		'&[data-orientation="inline"]': {
			cursor: 'pointer',
			userSelect: 'none',
		},
	},
});

export const control = style({
	gridArea: 'control',
	minWidth: 0,
});

export const error = style({
	gridArea: 'error',
	minWidth: 0,
});
