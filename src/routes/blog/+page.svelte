<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import BlogItem from '$lib/components/BlogItem.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Blog - Leonard Cseres</title>
  <meta name="description" content="Thoughts on software engineering, design, and technology." />
</svelte:head>

<Layout>
  <Block class="pb-16!">
    <h1>Blog</h1>
    <p class="text-xl text-muted">
      Writing about things I learn, build, and find interesting in the world of technology and
      research.
    </p>
  </Block>

  <Block>
    {#if data.posts.length > 0}
      <div class="flex flex-col gap-4 border-l border-border pl-6 sm:border-l-0 sm:pl-0">
        {#each data.posts as post (post.slug)}
          <BlogItem {...post} />
        {/each}
      </div>
    {:else}
      <p class="text-muted italic">Coming soon...</p>
    {/if}
  </Block>
</Layout>
