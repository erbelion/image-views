import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';
import { purge } from '@erbelion/vite-plugin-sveltekit-purgecss';

const config: UserConfig = {
	plugins: [sveltekit(), purge()],
	resolve: {
		alias: {
			'@': path.resolve('./')
		}
	}
};

export default config;
