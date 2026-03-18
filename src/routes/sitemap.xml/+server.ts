import type { RequestHandler } from './$types';

const SITE_URL = 'https://devleo.ch';

export const prerender = true;

interface MdsvexFile {
  metadata: { date: string };
}

export const GET: RequestHandler = async () => {
  const staticPages = ['', '/blog', '/projects'];

  const posts = import.meta.glob('/src/posts/*.md', { eager: true });
  const postPages = Object.entries(posts).map(([path, file]) => {
    const slug = path.split('/').at(-1)?.replace(/\.md$/, '');
    const date = (file as MdsvexFile).metadata.date;
    return { url: `/blog/${slug}`, date };
  });

  const urls = [
    ...staticPages.map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`),
    ...postPages.map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${p.url}</loc>\n    <lastmod>${new Date(p.date).toISOString().split('T')[0]}</lastmod>\n  </url>`
    ),
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
