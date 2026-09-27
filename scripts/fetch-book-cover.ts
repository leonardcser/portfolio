import sharp from 'sharp';
import { join } from 'node:path';
import { books } from '../src/lib/data/books';
import { generateBookColors, generateBookSpine } from './generate-book-spines';
import { updateBookPages } from './fetch-book-pages';

const slug = Bun.argv[2];
const isbn = Bun.argv[3];
const book = books.find((item) => item.slug === slug);
if (!book) throw new Error('Usage: bun scripts/fetch-book-cover.ts <book-slug> [isbn]');

const sources: string[] = [];
if (isbn) {
  sources.push(`https://images-na.ssl-images-amazon.com/images/P/${isbn}.01.LZZZZZZZ.jpg`);
  sources.push(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`);
}

const author = book.author.split(/,| and /)[0];
const query = new URLSearchParams({
  title: book.title,
  author,
  fields: 'title,cover_i',
  limit: '20',
});
const result = await fetch(`https://openlibrary.org/search.json?${query}`);
if (result.ok) {
  const { docs } = (await result.json()) as { docs: { title: string; cover_i?: number }[] };
  const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const doc of docs) {
    if (doc.cover_i && normalize(doc.title) === normalize(book.title)) {
      sources.push(`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`);
    }
  }
}

for (const url of sources) {
  try {
    const response = await fetch(url);
    if (!response.ok) continue;
    const image = Buffer.from(await response.arrayBuffer());
    const { width, height } = await sharp(image).metadata();
    if (!width || !height || width < 250 || height < 350 || width / height > 0.85) continue;

    await sharp(image)
      .jpeg({ quality: 90 })
      .toFile(join(import.meta.dir, `../static${book.cover}`));
    if (isbn || book.pages === undefined) {
      try {
        book.pages = await updateBookPages(book, isbn);
      } catch (error) {
        console.warn(`Could not update page count for ${book.title}:`, error);
      }
    }
    await generateBookSpine(book);
    await generateBookColors();
    console.log(`Saved cover and spine for ${book.title}`);
    process.exit(0);
  } catch {
    continue;
  }
}

throw new Error(`No suitable cover found for ${book.title}; try an ISBN`);
