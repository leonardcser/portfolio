import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';
import type { TOCItem, PostMeta } from '$lib/types';
import type { Component } from 'svelte';

interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

interface MdsvexModule {
  default: Component;
  metadata: PostMetadata;
}

const posts = import.meta.glob('/src/posts/*.md', { eager: true }) as Record<string, MdsvexModule>;
const rawPosts = import.meta.glob('/src/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function getAllPostsMeta(): PostMeta[] {
  return Object.entries(posts)
    .map(([, file]) => {
      const slug =
        Object.keys(posts)
          .find((p) => posts[p] === file)
          ?.split('/')
          .at(-1)
          ?.replace(/\.md$/, '') || '';
      const { title, description, date, tags } = file.metadata;
      return { title, description, date, slug, tags: tags || [] };
    })
    .filter((p) => p.slug && p.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const load: PageLoad = async ({ params }) => {
  const postPath = `/src/posts/${params.slug}.md`;
  const post = posts[postPath];
  const rawContent = rawPosts[postPath];

  if (!post || !rawContent) {
    throw error(404, `Could not find ${params.slug}`);
  }

  const allPosts = getAllPostsMeta();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const tocItems: TOCItem[] = [];
  const lines = rawContent.split('\n');
  let isInsideFrontmatter = false;
  let currentMainItem: TOCItem | null = null;

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  for (const line of lines) {
    if (line.trim() === '---') {
      isInsideFrontmatter = !isInsideFrontmatter;
      continue;
    }

    if (isInsideFrontmatter) continue;

    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const label = h2Match[1].trim();
      const id = slugify(label);
      currentMainItem = { id, label, subsections: [] };
      tocItems.push(currentMainItem);
    } else if (h3Match && currentMainItem) {
      const label = h3Match[1].trim();
      const id = slugify(label);
      currentMainItem.subsections?.push({ id, label });
    }
  }

  return {
    content: post.default,
    meta: { ...post.metadata, tags: post.metadata.tags || [] },
    slug: params.slug,
    tocItems,
    prev,
    next,
  };
};

export const entries: EntryGenerator = async () => {
  const paths = import.meta.glob('/src/posts/*.md');
  const slugs = Object.keys(paths).map((path) => path.split('/').at(-1)?.replace('.md', ''));
  return slugs.filter((slug): slug is string => !!slug).map((slug) => ({ slug }));
};
