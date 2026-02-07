import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const startAdornment = style({
	marginRight: theme.spacing[1],
});

const endAdornment = style({
	marginLeft: theme.spacing[1],
});

export default {
	startAdornment,
	endAdornment,
};
