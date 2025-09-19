<script lang="ts">
  import { fade } from 'svelte/transition';
  import { sheetState } from '$lib/state.svelte';
  import { frontmatterData } from './FrontMatter.svelte';
  import LinkTag from './LinkTag.svelte';

  const links = frontmatterData.links.value;
  const linksCount = links.length;
</script>

{#if sheetState.isLocked}
  <nav class="mt-2 flex items-center gap-2">
    {#each links as link, index}
      <div
        in:fade|global={{ duration: 200, delay: index * 50 }}
        out:fade|global={{ duration: 200, delay: (linksCount - index - 1) * 50 }}
      >
        <LinkTag href={link.url} label={link.label} icon={link.icon} />
      </div>
    {/each}
  </nav>
{/if}
