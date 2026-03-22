import { generateOgImage } from '$lib/og';
import type { RequestHandler, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const posts = import.meta.glob('/src/posts/*.md', { eager: true });
  return Object.keys(posts).map((path) => ({
    slug: path.replace('/src/posts/', '').replace('.md', ''),
  }));
};

export const GET: RequestHandler = async ({ params }) => {
  const posts = import.meta.glob('/src/posts/*.md', { eager: true });
  const match = Object.entries(posts).find(([path]) => path.includes(params.slug));

  if (!match) {
    return new Response('Not found', { status: 404 });
  }

  const post = match[1] as { metadata: { title: string } };

  return generateOgImage({
    prefix: '## blog',
    title: post.metadata.title,
  });
};
