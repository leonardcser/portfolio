import type { RequestHandler } from './$types';

interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

interface MdsvexFile {
  metadata: PostMetadata;
}

const SITE_URL = 'https://devleo.ch';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  const posts = Object.entries(paths)
    .map(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace(/\.md$/, '');
      const { title, description, date } = (file as MdsvexFile).metadata;
      return { title, description, date, slug };
    })
    .filter((post) => post.slug && post.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leonard Cseres' Blog</title>
    <description>Thoughts on software engineering, design, and technology.</description>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
