import { error } from '@sveltejs/kit';
import { books } from '$lib/data/books';
import type { PageLoad } from './$types';

export const entries = () => books.map((book) => ({ slug: book.slug }));

export const load: PageLoad = ({ params }) => {
  const book = books.find((book) => book.slug === params.slug);
  if (!book) error(404, 'Book not found');

  return { book };
};
