import { globalStyle } from '@vanilla-extract/css';
import { theme } from './theme.css';

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	'@media': {
		'(prefers-reduced-motion: reduce)': {
			animationDuration: '0.01ms !important',
			animationIterationCount: '1 !important',
			transitionDuration: '0.01ms !important',
			scrollBehavior: 'auto',
		},
	},
});

globalStyle('body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd', {
	margin: 0,
});

globalStyle('ul[role="list"], ol[role="list"]', {
	padding: 0,
});

globalStyle('ul, ol', {
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

globalStyle('li', {
	padding: 0,
	margin: 0,
	listStyleType: 'none',
});

globalStyle('body', {
	lineHeight: 1.5,
	fontFamily:
		'Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	WebkitFontSmoothing: 'antialiased',
	color: theme.colors.text.primary,
	backgroundColor: theme.colors.background.paper,
});

globalStyle('h1, h2, h3, h4, h5, h6', {
	fontSize: 'inherit',
	fontWeight: 'inherit',
});

globalStyle('button, input, textarea, select', {
	font: 'inherit',
	color: 'inherit',
	background: 'none',
	border: 'none',
	padding: 0,
	margin: 0,
	outline: 'none',
});

globalStyle('button', {
	cursor: 'pointer',
});

globalStyle('a', {
	textDecoration: 'none',
	color: 'inherit',
});

globalStyle('img, picture, video, canvas, svg', {
	display: 'block',
	maxWidth: '100%',
	height: 'auto',
});

globalStyle('*::-webkit-scrollbar', {
	width: 6,
	height: 6,
});

globalStyle('*::-webkit-scrollbar-track', {
	backgroundColor: 'transparent',
});

globalStyle('*::-webkit-scrollbar-thumb', {
	backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 60%, transparent)`,
	borderRadius: theme.borderRadius.sm,
	width: 6,
	height: 6,
});
