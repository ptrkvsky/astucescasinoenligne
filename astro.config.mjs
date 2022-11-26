import { defineConfig } from 'astro/config';
// import image from '@astrojs/image';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // integrations: [image(), sitemap()],
  integrations: [sitemap()],
  trailingSlash: 'never',
  site: 'https://astucescasinoenligne.com',
});
