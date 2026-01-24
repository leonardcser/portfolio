import type { PageLoad } from './$types';

interface PostMetadata {
  title: string;
  description: string;
  date: string;
}

interface MdsvexFile {
  metadata: PostMetadata;
}

export const load: PageLoad = async () => {
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  const posts = Object.entries(paths)
    .map(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace(/\.md$/, '');
      const { title, description, date } = (file as MdsvexFile).metadata;
      return { title, description, date, slug };
    })
    .filter((post): post is PostMetadata & { slug: string } => !!post.slug && !!post.title);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
};
