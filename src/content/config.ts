import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const apps = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    platform: z.string().optional(),
    status: z.enum(['live', 'beta', 'development']).default('development'),
    url: z.string().optional(),
    github: z.string().optional(),
  }),
});

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string().optional(),
    downloadUrl: z.string().optional(),
    free: z.boolean().default(true),
  }),
});

export const collections = { blog, apps, skills };
