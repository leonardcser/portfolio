import type { PageLoad } from './$types';
import type { PostMeta } from '$lib/types';

interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

interface MdsvexFile {
  metadata: PostMetadata;
}

export const load: PageLoad = async () => {
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  const posts = Object.entries(paths)
    .map(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace(/\.md$/, '');
      const { title, description, date, tags } = (file as MdsvexFile).metadata;
      return { title, description, date, slug, tags: tags || [] } as PostMeta;
    })
    .filter((post): post is PostMeta => !!post.slug && !!post.title);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
};
