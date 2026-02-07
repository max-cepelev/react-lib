import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	gap: theme.spacing[2],
});

export const months = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridTemplateRows: 'repeat(3, 1fr)',
	gap: theme.spacing[2],
});

export const quarters = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, 1fr)',
	gap: theme.spacing[2],
});
