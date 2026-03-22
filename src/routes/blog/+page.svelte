<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import BlogItem from '$lib/components/BlogItem.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { FiRss } from 'svelte-icons-pack/fi';
  import { SITE_URL, SITE_NAME } from '$lib/constants';

  let { data } = $props();

  import type { PostMeta } from '$lib/types';

  const groupedByYear = $derived.by(() => {
    const groups: { year: number; posts: PostMeta[] }[] = [];
    for (const post of data.posts) {
      const year = new Date(post.date).getFullYear();
      const existing = groups.find((g) => g.year === year);
      if (existing) {
        existing.posts.push(post);
      } else {
        groups.push({ year, posts: [post] });
      }
    }
    return groups;
  });
</script>

<svelte:head>
  <title>Blog - {SITE_NAME}</title>
  <meta name="description" content="Thoughts on software engineering, design, and technology." />
  <link rel="canonical" href="{SITE_URL}/blog" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Blog - {SITE_NAME}" />
  <meta
    property="og:description"
    content="Thoughts on software engineering, design, and technology."
  />
  <meta property="og:url" content="{SITE_URL}/blog" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content="{SITE_URL}/og/blog.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Blog - {SITE_NAME}" />
  <meta
    name="twitter:description"
    content="Thoughts on software engineering, design, and technology."
  />
  <meta name="twitter:image" content="{SITE_URL}/og/blog.png" />
</svelte:head>

<Layout>
  <Block class="pb-4!">
    <div class="flex items-center justify-between">
      <h1 class="!mb-0">Blog</h1>
      <a
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        class="not-prose inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted transition-colors hover:border-muted hover:text-primary"
      >
        <Icon src={FiRss} size="12" />
        RSS
      </a>
    </div>
  </Block>

  <Block>
    {#if data.posts.length > 0}
      <div class="not-prose space-y-8">
        {#each groupedByYear as { year, posts } (year)}
          <section>
            <div class="mb-3 text-sm font-semibold text-muted tabular-nums">{year}</div>
            <div class="space-y-1">
              {#each posts as post (post.slug)}
                <BlogItem {post} />
              {/each}
            </div>
          </section>
        {/each}
      </div>
    {:else}
      <p class="text-sm text-muted">No posts yet</p>
    {/if}
  </Block>
</Layout>
