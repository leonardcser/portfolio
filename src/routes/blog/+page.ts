import type { PageLoad } from './$types';

interface MdsvexFile {
  metadata: Record<string, unknown>;
}

export const load: PageLoad = async () => {
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  const posts = Object.entries(paths)
    .map(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace(/\.md$/, '');
      const metadata = (file as MdsvexFile).metadata;
      return { ...metadata, slug };
    })
    .filter((post) => post.slug && post.title);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
};
