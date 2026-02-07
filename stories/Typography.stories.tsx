import type { Meta } from 'storybook-react-rsbuild';
import { Typography } from '~/components';

export default {
	title: 'Typography',
	component: Typography,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Typography>;

export const H1 = () => (
	<Typography
		variant="h1"
		color="primary"
		align="center"
		weight="bold"
		transform="capitalize"
	>
		Главный заголовок
	</Typography>
);

export const H2 = () => (
	<Typography variant="h2">Второстепенный заголовок</Typography>
);

export const H3 = () => (
	<Typography variant="h3">Второстепенный заголовок</Typography>
);

export const H4 = () => (
	<Typography variant="h4">Второстепенный заголовок</Typography>
);

export const H5 = () => (
	<Typography variant="h5">Второстепенный заголовок</Typography>
);

export const H6 = () => (
	<Typography variant="h6">Второстепенный заголовок</Typography>
);

export const Subtitle1 = () => (
	<Typography variant="subtitle1" color="info">
		Второстепенный заголовок
	</Typography>
);

export const Subtitle2 = () => (
	<Typography variant="subtitle2" color="success">
		Второстепенный заголовок
	</Typography>
);

export const Body1 = () => (
	<Typography variant="body1" gutterBottom>
		Обычный текст с отступом снизу
	</Typography>
);

export const Body2 = () => (
	<Typography variant="body2">Обычный текст</Typography>
);

export const Overline = () => (
	<Typography variant="overline" weight="bold">
		Подпись
	</Typography>
);

export const Caption = () => (
	<Typography
		variant="caption"
		color="error"
		display="inline"
		decoration="underline"
	>
		Подпись с ошибкой
	</Typography>
);
