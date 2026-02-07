import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

// Анимации
const rotate = keyframes({
	to: {
		transform: 'rotate(360deg)',
	},
});

const dash = keyframes({
	'0%': {
		strokeDasharray: '1, 200',
		strokeDashoffset: '0',
	},
	'50%': {
		strokeDasharray: '100, 200',
		strokeDashoffset: '-15px',
	},
	'100%': {
		strokeDasharray: '100, 200',
		strokeDashoffset: '-125px',
	},
});

// Корневой контейнер
export const root = style({
	display: 'inline-block',
	position: 'relative',
});

// SVG-элемент
export const svg = style({
	display: 'block',
	width: '100%',
	height: '100%',
	transformOrigin: 'center',
});

// Круг
export const circle = style({
	stroke: 'currentColor',
	strokeLinecap: 'round',
	transition: 'stroke-dashoffset 0.35s',
});

// Модификаторы состояния

export const variants = styleVariants({
	determinate: {
		[`${svg}`]: {
			transform: 'rotate(-90deg)',
		},
		[`${circle}`]: {
			transition: 'stroke-dashoffset 0.35s',
		},
	},
	indeterminate: {
		animation: `${rotate} 1.4s linear infinite`,
		[`${circle}`]: {
			animation: `${dash} 1.4s ease-in-out infinite`,
		},
	},
});

// Цветовые варианты
export const colors = styleVariants({
	primary: {
		color: theme.colors.primary,
	},
	secondary: {
		color: theme.colors.secondary,
	},
	inherit: {
		color: 'inherit',
	},
});
