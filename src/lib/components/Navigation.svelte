<script lang="ts">
  import { fade } from 'svelte/transition';
  import { headerState } from '$lib/state.svelte';
  import { frontmatterData } from './FrontMatter.svelte';
  import LinkTag from './LinkTag.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  const links = frontmatterData.links.value;
  const linksCount = links.length;
</script>

<nav class="flex items-center gap-2">
  {#if headerState.isCollapsed}
    {#each links as link, index}
      <div
        in:fade|global={{ duration: 200, delay: index * 50 }}
        out:fade|global={{ duration: 200, delay: (linksCount - index - 1) * 50 }}
      >
        <LinkTag href={link.url} label={link.label} icon={link.icon} />
      </div>
    {/each}
  {/if}
  <ThemeToggle />
</nav>
