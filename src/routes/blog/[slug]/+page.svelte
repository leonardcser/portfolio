<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import PostNavigation from '$lib/components/PostNavigation.svelte';
  import { SITE_URL, SITE_NAME } from '$lib/constants';

  let { data } = $props();

  const title = $derived(data.meta?.title || 'Blog Post');
  const description = $derived(data.meta?.description || '');
  // const tocItems = $derived(data.tocItems || []);
  const canonicalUrl = $derived(`${SITE_URL}/blog/${data.slug}`);
  const isoDate = $derived(data.meta?.date ? new Date(data.meta.date).toISOString() : '');
  const fullTitle = $derived(`${title} - ${SITE_NAME}`);

  const formattedDate = $derived(
    data.meta?.date
      ? new Date(data.meta.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : ''
  );
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:site_name" content={SITE_NAME} />
  {#if isoDate}
    <meta property="article:published_time" content={isoDate} />
  {/if}
  {#if data.meta?.tags?.length}
    {#each data.meta.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}
  <meta property="og:image" content="{SITE_URL}/og/blog/{data.slug}.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{SITE_URL}/og/blog/{data.slug}.png" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: isoDate,
        author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
        url: canonicalUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
        ],
      },
    ],
  })}</script>`}
</svelte:head>

<Layout>
  <Block>
    <article>
      <header class="mb-8">
        <h1 class="mb-3">{title}</h1>
        <div class="not-prose flex flex-wrap items-center gap-1.5">
          {#if formattedDate}
            <time datetime={data.meta?.date} class="mr-1.5 text-sm text-muted">{formattedDate}</time
            >
          {/if}
          {#if data.meta?.tags?.length}
            {#each data.meta.tags as tag (tag)}
              <span
                class="rounded-full border border-border bg-card px-2 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            {/each}
          {/if}
        </div>
      </header>

      <div class="prose dark:prose-invert">
        {#if data.content}
          <data.content />
        {/if}
      </div>

      <div class="not-prose mt-12 max-w-prose border-t border-border pt-8">
        <p class="text-sm text-muted">
          <strong>A note:</strong> I put real thought into these posts. Every word here comes from the
          human me. Thanks for reading.
        </p>
      </div>

      <PostNavigation prev={data.prev} next={data.next} />
    </article>
  </Block>
</Layout>
