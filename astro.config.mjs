import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mdk.guru',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          ru: 'ru-RU',
          en: 'en-US',
          es: 'es-ES',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
