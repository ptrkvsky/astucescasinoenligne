
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import { VitePWA } from 'vite-plugin-pwa';
import sitemap from '@astrojs/sitemap';
import compress from "astro-compress"
import { manifest, seoConfig } from "./src/utils/seoConfig"

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,

  integrations: [image(), sitemap(), compress()],
  vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
				  globDirectory: 'dist',
				  globPatterns: [
				    '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}',
				  ],
				  // Don't fallback on document based (e.g. `/some-page`) requests
				  // This removes an errant console.log message from showing up.
				  navigateFallback: null,
				},
			})
		]
	},

});