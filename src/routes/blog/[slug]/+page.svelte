<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import PostNavigation from '$lib/components/PostNavigation.svelte';

  let { data } = $props();

  const title = $derived(data.meta?.title || 'Blog Post');
  const description = $derived(data.meta?.description || '');
  const tocItems = $derived(data.tocItems || []);

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
  <title>{title} - Leonard Cseres</title>
  <meta name="description" content={description} />
</svelte:head>

<Layout {tocItems}>
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

      <div class="prose max-w-none dark:prose-invert">
        {#if data.content}
          <data.content />
        {/if}
      </div>

      <PostNavigation prev={data.prev} next={data.next} />
    </article>
  </Block>
</Layout>
