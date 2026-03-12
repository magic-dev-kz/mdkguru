import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const allPosts = await getCollection('blog');
  const posts = allPosts.filter(p => {
    const ident = (p as any).id || (p as any).slug || '';
    return ident.startsWith('ru/') || ident.startsWith('ru\\');
  });

  return rss({
    title: 'MDK.GURU',
    description: 'Один человек. Пять ИИ-агентов. Практика, кейсы, инструменты.',
    site: context.site,
    items: posts.map((post) => {
      const ident = (post as any).id || (post as any).slug || '';
      const slug = ident.replace(/^ru[/\\]/, '').replace(/\.md$/, '');
      return {
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.description,
        link: `/ru/blog/${slug}/`,
      };
    }),
    customData: '<language>ru-RU</language>',
  });
}
