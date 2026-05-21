import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	plugins: [
		sveltekit(),
		ViteImageOptimizer({
			jpg: {
				quality: 82,
			},
			jpeg: {
				quality: 82,
			},
			png: {
				compressionLevel: 9,
				palette: true,
			}
		})
	]
});
