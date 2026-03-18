<script lang="ts">
  import type { PostMeta } from '$lib/types';

  interface Props {
    prev: PostMeta | null;
    next: PostMeta | null;
  }

  const { prev, next }: Props = $props();
</script>

{#if prev || next}
  <nav class="mt-12 flex items-stretch gap-4 border-t border-border pt-8">
    {#if prev}
      <a href="/blog/{prev.slug}" class="group flex flex-1 flex-col items-start no-underline">
        <span class="text-xs font-medium tracking-wide text-muted uppercase">Previous</span>
        <span class="mt-1 text-sm font-semibold transition-colors group-hover:text-accent">
          {prev.title}
        </span>
      </a>
    {:else}
      <div class="flex-1"></div>
    {/if}

    {#if next}
      <a
        href="/blog/{next.slug}"
        class="group flex flex-1 flex-col items-end text-right no-underline"
      >
        <span class="text-xs font-medium tracking-wide text-muted uppercase">Next</span>
        <span class="mt-1 text-sm font-semibold transition-colors group-hover:text-accent">
          {next.title}
        </span>
      </a>
    {/if}
  </nav>
{/if}
