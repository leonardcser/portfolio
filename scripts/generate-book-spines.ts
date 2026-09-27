import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { bookSpineWidth, books } from '../src/lib/data/books';

const root = join(import.meta.dir, '../static/images/library');
const output = join(root, 'spines');
export async function generateBookSpine(book: (typeof books)[number]) {
  await mkdir(output, { recursive: true });
  const { dominant } = await sharp(join(root, `${book.slug}.jpg`)).stats();
  const { r, g, b } = dominant;
  const light = (r * 299 + g * 587 + b * 114) / 1000 > 140;
  const ink = light ? '#211f1b' : '#f7f1e4';
  const trim = light ? '#756e62' : '#d3c3a4';
  const title = book.title.length > 40 ? `${book.title.slice(0, 37).trimEnd()}…` : book.title;
  const label = title.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  const size = title.length > 32 ? 21 : title.length > 23 ? 25 : 29;
  const width = bookSpineWidth(book.pages) * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="520">
    <rect width="${width}" height="520" fill="rgb(${r},${g},${b})"/>
    <path d="M7 0v520M${width - 7} 0v520M11 11h${width - 22}M11 509h${width - 22}" stroke="${trim}" stroke-width="1.5"/>
    <text transform="translate(${width / 2} 260) rotate(-90)" text-anchor="middle"
      dominant-baseline="central" fill="${ink}" font-family="Georgia,serif"
      font-size="${size}" font-weight="bold">${label}</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(output, `${book.slug}.png`));
}

export async function generateBookColors() {
  const colors = await Promise.all(
    books.map(async (book) => {
      const { dominant } = await sharp(join(root, `${book.slug}.jpg`)).stats();
      const color = `#${[dominant.r, dominant.g, dominant.b]
        .map((channel) => channel.toString(16).padStart(2, '0'))
        .join('')}`;
      return [book.slug, color];
    })
  );
  await writeFile(
    join(import.meta.dir, '../src/lib/data/book-colors.json'),
    `${JSON.stringify(Object.fromEntries(colors), null, 2)}\n`
  );
}

if (import.meta.main) {
  for (const book of books) await generateBookSpine(book);
  await generateBookColors();
  console.log(`Generated ${books.length} spines and cover colors`);
}
