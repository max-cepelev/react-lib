import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from 'storybook-react-rsbuild';

const getAbsolutePath = (value: string) => {
	return path.resolve(
		fileURLToPath(
			new URL(import.meta.resolve(`${value}/package.json`, import.meta.url)),
		),
		'..',
	);
};

const config: StorybookConfig = {
	stories: [
		'../src/stories/**/*.mdx',
		'../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-docs',
		'@chromatic-com/storybook',
		{
			name: getAbsolutePath('storybook-addon-rslib'),
			options: {
				rslib: {
					include: ['**/stories/**'],
				},
			},
		},
	],
	framework: {
		name: getAbsolutePath('storybook-react-rsbuild') as any,
		options: {},
	},
	typescript: {
		reactDocgen: 'react-docgen',
		check: true,
	},
};

export default config;
