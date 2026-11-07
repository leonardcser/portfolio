import { generateOgImage } from '#lib/og.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
  generateOgImage({
    title: 'Hello.',
    subtitle: 'Leonard Cseres · devleo.ch',
  });
