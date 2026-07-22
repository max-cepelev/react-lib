import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import { pluginDts } from 'rsbuild-plugin-dts';

export default defineConfig({
	lib: [
		{
			dts: true,
			bundle: true,
			format: 'esm',
			source: {
				entry: {
					form: './src/form/index.ts',
					index: './src/index.ts',
				},
			},
			output: {
				filename: {
					css: 'styles.css',
				},
			},
		},
	],
	tools: {
		rspack: {
			plugins: [
				new VanillaExtractPlugin({
					identifiers: ({ debugId, hash }) => `${debugId ?? 'style'}__${hash}`, // или 'debug' для разработки
				}),
			],
		},
	},
	output: {
		cleanDistPath: true,
		target: 'web',
		externals: [
			'@fontsource-variable/roboto',
			'@formisch/react',
			'@max-ts/kit',
			'react',
			'react-dom',
		],
		// Устанавливаем пути для CSS файлов
		distPath: {
			root: './lib',
		},
	},
	plugins: [
		pluginReact({
			swcReactOptions: {
				runtime: 'automatic',
			},
		}),
		pluginDts(),
	],
});
