import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://newstelagualbertodoceria.pages.dev',
  base: '/',
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  build: {
    format: 'directory',
    inlineStylesheets: 'never'
  },
  vite: {
    build: {
      sourcemap: false,
      cssCodeSplit: false
    }
  }
});
