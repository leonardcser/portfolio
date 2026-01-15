import { mdsvex, escapeSvelte } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import rehypeSlug from 'rehype-slug';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

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

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [rehypeSlug],
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const html = escapeSvelte(
            highlighter.codeToHtml(code, {
              lang,
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
  kit: {
    adapter: adapter(),
    prerender: {
      handleUnseenRoutes: 'ignore',
    },
  },
};

export default config;
