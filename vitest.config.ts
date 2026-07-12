import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'~/components': path.resolve(__dirname, 'src/components/index.ts'),
			'~/hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
			'~/theme': path.resolve(__dirname, 'src/theme/index.ts'),
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
	},
});
