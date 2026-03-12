import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rehypeMdkEmoji from './src/plugins/rehype-mdk-emoji.mjs';

export default defineConfig({
  site: 'https://mdk.guru',
  markdown: {
    rehypePlugins: [rehypeMdkEmoji],
  },
  integrations: [
    tailwind(),
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
