import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';
import type { TOCItem } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../posts/${params.slug}.md`);
    const rawContent = await import(`../../../posts/${params.slug}.md?raw`);

    const tocItems: TOCItem[] = [];
    const lines = rawContent.default.split('\n');
    let isInsideFrontmatter = false;
    let currentMainItem: TOCItem | null = null;

    const slugify = (text: string) =>
      text
        .toLowerCase()
        .replace(/<[^>]*>/g, '') // remove html tags
        .replace(/[^\w\s-]/g, '') // remove special characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-') // replace multiple hyphens with single hyphen
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
      meta: post.metadata,
      tocItems,
    };
  } catch (e) {
    console.error(e);
    throw error(404, `Could not find ${params.slug}`);
  }
};

export const entries: EntryGenerator = async () => {
  const paths = import.meta.glob('/src/posts/*.md');
  const slugs = Object.keys(paths).map((path) => path.split('/').at(-1)?.replace('.md', ''));
  return slugs.filter((slug): slug is string => !!slug).map((slug) => ({ slug }));
};
