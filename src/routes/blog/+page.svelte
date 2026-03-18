<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { FiRss } from 'svelte-icons-pack/fi';

  let { data } = $props();

  import type { PostMeta } from '$lib/types';

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

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
  <title>Blog - Leonard Cseres</title>
  <meta name="description" content="Thoughts on software engineering, design, and technology." />
  <link rel="alternate" type="application/rss+xml" title="Leonard Cseres' Blog" href="/rss.xml" />
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
                <a
                  href="/blog/{post.slug}"
                  class="group -mx-3 grid grid-cols-[auto_1fr] gap-x-4 rounded-lg p-3 transition-colors hover:bg-border/20 sm:gap-x-6"
                >
                  <time
                    datetime={post.date}
                    class="shrink-0 text-sm leading-snug text-muted tabular-nums"
                  >
                    {formatDate(post.date)}
                  </time>
                  <div
                    class="text-sm leading-snug font-semibold text-primary transition-colors group-hover:text-accent"
                  >
                    {post.title}
                  </div>
                  <div></div>
                  <div>
                    <div class="mt-1 text-sm text-muted">
                      {post.description}
                    </div>
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      {#each post.tags as tag (tag)}
                        <span
                          class="rounded-full border border-border bg-card px-2 py-0.5 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </div>
                </a>
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
