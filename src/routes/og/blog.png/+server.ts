import { generateOgImage } from '#lib/og.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
  generateOgImage({
    prefix: '## blog',
    title: 'Blog',
  });
