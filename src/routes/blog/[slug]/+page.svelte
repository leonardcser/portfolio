<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';

  let { data } = $props();

  const title = $derived(data.meta?.title || 'Blog Post');
  const description = $derived(data.meta?.description || '');
  const tocItems = $derived(data.tocItems || []);
</script>

<svelte:head>
  <title>{title} - Leonard Cseres</title>
  <meta name="description" content={description} />
</svelte:head>

<Layout {tocItems}>
  <Block>
    <div class="prose max-w-none dark:prose-invert">
      {#if data.content}
        <data.content />
      {/if}
    </div>
  </Block>
</Layout>
