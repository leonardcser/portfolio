import { mdsvex, escapeSvelte, type MdsvexOptions } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import rehypeSlug from 'rehype-slug';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !href.startsWith('http')) return;

      node.properties.target = '_blank';
      node.properties.rel = ['noopener', 'noreferrer'];
      node.children.push({
        type: 'element',
        tagName: 'span',
        properties: { className: ['external-arrow'], ariaHidden: 'true' },
        children: [{ type: 'text', value: '↗' }],
      });
    });
  };
}

const highlighter = await createHighlighterCore({
  themes: [import('@shikijs/themes/github-light'), import('@shikijs/themes/github-dark')],
  langs: [
    import('@shikijs/langs/http'),
    import('@shikijs/langs/json'),
    import('@shikijs/langs/bash'),
    import('@shikijs/langs/yaml'),
    import('@shikijs/langs/python'),
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/svelte'),
    import('@shikijs/langs/css'),
    import('@shikijs/langs/html'),
    import('@shikijs/langs/markdown'),
  ],
  engine: createJavaScriptRegexEngine({
    forgiving: true,
  }),
});

export default defineConfig({
  plugins: [
    tailwindcss(),
    enhancedImages(),
    sveltekit({
      preprocess: [
        vitePreprocess(),
        mdsvex({
          extensions: ['.md'],

          rehypePlugins: [
            rehypeSlug,
            rehypeExternalLinks,
          ] as unknown as MdsvexOptions['rehypePlugins'],
          highlight: {
            highlighter: async (code, lang) => {
              const html = escapeSvelte(
                highlighter.codeToHtml(code, {
                  lang: lang ?? 'text',
                  themes: {
                    light: 'github-light',
                    dark: 'github-dark',
                  },
                })
              );
              return `{@html \`${html}\` }`;
            },
          },
        }),
      ],

      extensions: ['.svelte', '.md'],
      adapter: adapter(),
      prerender: {
        handleUnseenRoutes: 'ignore',
      },
    }),
  ],
});
