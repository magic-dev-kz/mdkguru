import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('blog', ({ id }) => id.startsWith('ru/'));

  return rss({
    title: 'MDK.GURU',
    description: 'Один человек. Пять ИИ-агентов. Практика, кейсы, инструменты.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/ru/blog/${post.id.replace('ru/', '').replace('.md', '')}/`,
    })),
    customData: '<language>ru-RU</language>',
  });
}
