<script lang="ts">
  import { fade } from 'svelte/transition';
  import { headerState } from '$lib/state.svelte';
  import { frontmatterData } from './FrontMatter.svelte';
  import LinkTag from './LinkTag.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  const links = frontmatterData.links.value;
  const linksCount = links.length;
</script>

<noscript>
  <style>
    .noscript-nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .noscript-nav-item {
      display: none;
    }
    @media (min-width: 768px) {
      .noscript-nav-item {
        display: block;
      }
    }
  </style>
</noscript>

<nav class="flex items-center gap-2">
  <noscript>
    <div class="noscript-nav">
      {#each links as link}
        <div class="noscript-nav-item">
          <LinkTag
            href={link.url}
            label={link.label}
            icon={link.icon}
            umamiEventPrefix={'navigation-' + link.label}
          />
        </div>
      {/each}
    </div>
  </noscript>
  {#if headerState.isCollapsed}
    {#each links as link, index}
      <div
        class="max-md:hidden"
        in:fade|global={{ duration: 200, delay: index * 50 }}
        out:fade|global={{ duration: 200, delay: (linksCount - index - 1) * 50 }}
      >
        <LinkTag
          href={link.url}
          label={link.label}
          icon={link.icon}
          umamiEventPrefix={'navigation-' + link.label}
        />
      </div>
    {/each}
  {/if}
  <ThemeToggle />
</nav>
