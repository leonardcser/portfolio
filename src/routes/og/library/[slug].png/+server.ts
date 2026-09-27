import { books } from '$lib/data/books';
import { generateOgImage } from '$lib/og';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => books.map((book) => ({ slug: book.slug }));

export const GET: RequestHandler = ({ params }) => {
  const book = books.find((book) => book.slug === params.slug);
  if (!book) return new Response('Not found', { status: 404 });

  return generateOgImage({
    prefix: '## library',
    title: book.title,
    book: { author: book.author, cover: book.cover, coverColor: book.coverColor },
  });
};
