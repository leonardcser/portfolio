import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { format } from 'prettier';
import { books } from '../src/lib/data/books';
import { generateBookSpine } from './generate-book-spines';

const output = join(import.meta.dir, '../src/lib/data/book-pages.json');
type Book = (typeof books)[number];
type PageRecord = { pages: number; source: string };

const normalize = (text: string) =>
  text
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

export async function fetchBookPages(book: Book, edition?: string): Promise<PageRecord> {
  const saved = (JSON.parse(await readFile(output, 'utf8')) as Record<string, PageRecord>)[
    book.slug
  ];
  const editionId = edition?.match(/^OL\d+M$/i)?.[0];
  const source = editionId
    ? `https://openlibrary.org/books/${editionId.toUpperCase()}`
    : edition
      ? `https://openlibrary.org/isbn/${edition.replace(/[-\s]/g, '')}`
      : saved?.source.startsWith('https://openlibrary.org/books/')
        ? saved.source
        : undefined;

  if (source) {
    const response = await fetch(`${source}.json`);
    if (!response.ok) throw new Error(`Open Library returned ${response.status} for ${source}`);
    const data = (await response.json()) as { key: string; number_of_pages?: number };
    if (
      !Number.isInteger(data.number_of_pages) ||
      !data.number_of_pages ||
      data.number_of_pages < 20
    )
      throw new Error(`No usable page count for ${book.title} in ${source}`);
    return { pages: data.number_of_pages, source: `https://openlibrary.org${data.key}` };
  }

  if (saved && !saved.source.startsWith('https://openlibrary.org/works/')) {
    throw new Error(
      `Pass an ISBN or Open Library edition ID to replace the verified count for ${book.title}`
    );
  }

  const query = new URLSearchParams({
    title: book.title,
    author: book.author.split(/,| and /)[0],
    fields: 'key,title,author_name,number_of_pages_median,edition_count',
    limit: '50',
  });
  const response = await fetch(`https://openlibrary.org/search.json?${query}`);
  if (!response.ok) throw new Error(`Open Library search returned ${response.status}`);
  const { docs } = (await response.json()) as {
    docs: {
      key: string;
      title: string;
      author_name?: string[];
      number_of_pages_median?: number;
      edition_count: number;
    }[];
  };
  const surname = normalize(
    book.author
      .split(/,| and /)[0]
      .split(' ')
      .at(-1) ?? ''
  );
  const match = docs
    .filter(
      (doc) =>
        normalize(doc.title) === normalize(book.title) &&
        doc.author_name?.[0] &&
        normalize(doc.author_name[0]).includes(surname) &&
        Number.isInteger(doc.number_of_pages_median) &&
        (doc.number_of_pages_median ?? 0) >= 20
    )
    .sort((a, b) => b.edition_count - a.edition_count)[0];
  if (!match?.number_of_pages_median) {
    throw new Error(`No matching page count for ${book.title}; supply an ISBN or edition ID`);
  }
  return { pages: match.number_of_pages_median, source: `https://openlibrary.org${match.key}` };
}

export async function updateBookPages(book: Book, edition?: string) {
  const record = await fetchBookPages(book, edition);
  const saved = JSON.parse(await readFile(output, 'utf8')) as Record<string, PageRecord>;
  saved[book.slug] = record;
  await writeFile(output, await format(JSON.stringify(saved), { parser: 'json', printWidth: 100 }));
  console.log(`${book.title}: ${record.pages} pages (${record.source})`);
  return record.pages;
}

if (import.meta.main) {
  const slug = Bun.argv[2];
  const book = books.find((item) => item.slug === slug);
  if (!book)
    throw new Error('Usage: bun scripts/fetch-book-pages.ts <book-slug> [isbn-or-OL-edition-id]');
  book.pages = await updateBookPages(book, Bun.argv[3]);
  await generateBookSpine(book);
}
