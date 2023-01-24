import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import preprocessor from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), preprocessor()],

	kit: {
		adapter: adapter()
	}
}

export default config
