import {
	createGlobalTheme,
	createGlobalThemeContract,
} from '@vanilla-extract/css';

export const theme = createGlobalThemeContract({
	colors: {
		primary: 'colors-primary',
		secondary: 'colors-secondary',
		warning: 'colors-warning',
		error: 'colors-error',
		success: 'colors-success',
		border: 'colors-border',
		info: 'colors-info',
		background: {
			tooltip: 'colors-background-tooltip',
			paper: 'colors-background-paper',
			element: 'colors-background-element',
			elementHover: 'colors-background-elementHover',
			sidebar: 'colors-background-sidebar',
		},
		foreground: {
			primary: 'colors-foreground-primary',
			secondary: 'colors-foreground-secondary',
		},
		text: {
			primary: 'colors-text-primary',
			secondary: 'colors-text-secondary',
			disabled: 'colors-text-disabled',
			hint: 'colors-text-hint',
		},
	},
	spacing: {
		1: 'spacing-1',
		2: 'spacing-2',
		3: 'spacing-3',
		4: 'spacing-4',
		5: 'spacing-5',
		6: 'spacing-6',
		8: 'spacing-8',
		10: 'spacing-10',
		12: 'spacing-12',
		16: 'spacing-16',
		20: 'spacing-20',
	},
	elevation: {
		1: 'elevation-1',
		2: 'elevation-2',
		3: 'elevation-3',
		4: 'elevation-4',
		6: 'elevation-5',
	},
	fontSize: {
		xs: 'fontSize-xs',
		sm: 'fontSize-sm',
		base: 'fontSize-base',
		lg: 'fontSize-lg',
		xl: 'fontSize-xl',
		'2xl': 'fontSize-2xl',
		'3xl': 'fontSize-3xl',
		'4xl': 'fontSize-4xl',
	},
	fontWeight: {
		normal: 'fontWeight-normal',
		medium: 'fontWeight-medium',
		semibold: 'fontWeight-semibold',
		bold: 'fontWeight-bold',
	},
	lineHeight: {
		none: 'lineHeight-none',
		tight: 'lineHeight-tight',
		snug: 'lineHeight-snug',
		normal: 'lineHeight-normal',
		relaxed: 'lineHeight-relaxed',
		loose: 'lineHeight-loose',
	},
	borderRadius: {
		sm: 'borderRadius-sm',
		md: 'borderRadius-md',
		lg: 'borderRadius-lg',
	},
});

createGlobalTheme(':root', theme, {
	colors: {
		primary: 'oklch(0.27 0.00 0)',
		secondary: 'oklch(0.45 0.03 257)',
		border: 'oklch(0.92 0.00 0)',
		error: 'oklch(0.64 0.21 25)',
		success: 'oklch(0.63 0.17 149)',
		warning: 'oklch(0.80 0.16 86)',
		info: 'oklch(0.6 0.19 250)',
		background: {
			tooltip: 'oklch(0.37 0.00 0)',
			paper: '#FFFFFF',
			element: 'oklch(0.97 0.00 265)',
			elementHover: 'oklch(0.96 0 0)',
			sidebar: 'oklch(0.9851 0 0)',
		},
		foreground: {
			primary: 'oklch(0.98 0.003 264)',
			secondary: 'oklch(0.18 0.02 264)',
		},
		text: {
			primary: 'oklch(0.21 0.03 265)',
			secondary: 'oklch(0.37 0.03 260)',
			disabled: 'oklch(0.55 0.02 264)',
			hint: 'oklch(0.71 0.02 261)',
		},
	},
	spacing: {
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		12: '3rem',
		16: '4rem',
		20: '5rem',
	},
	elevation: {
		1: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba #00000024 (0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
		2: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);',
		3: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
		4: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		6: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);',
	},
	fontSize: {
		xs: '0.75rem',
		sm: '0.875rem',
		base: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
	},
	fontWeight: {
		normal: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
	lineHeight: {
		none: '1',
		tight: '1.25',
		snug: '1.375',
		normal: '1.5',
		relaxed: '1.625',
		loose: '2',
	},
	borderRadius: {
		sm: '0.375rem',
		md: '0.5rem',
		lg: '1rem',
	},
});

export type Theme = typeof theme;

export type SpacingKey = keyof Theme['spacing'];
