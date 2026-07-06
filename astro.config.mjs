import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://cloudplanner.org',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  // Sitemap added back in Phase 4 (SEO checks) once pages are built
});
