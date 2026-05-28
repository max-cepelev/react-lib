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
					index: './src/index.ts',
				},
				exclude: ['.src/stories/**'],
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
		minify: true,
		target: 'web',
		externals: ['react', 'react-dom', '@fontsource-variable/roboto'],
		// Устанавливаем пути для CSS файлов
		distPath: {
			root: './lib',
		},
		filename: {
			css: 'styles.css', // Имя CSS файла
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
