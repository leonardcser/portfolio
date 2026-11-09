<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    caption: string;
    legend?: Snippet;
    children: Snippet;
  }

  let { caption, legend, children }: Props = $props();
</script>

<figure class="not-prose my-8 font-sans text-primary">
  {#if legend}
    <div class="mb-3 flex flex-wrap justify-end gap-x-4 gap-y-1 text-xs text-muted">
      {@render legend()}
    </div>
  {/if}
  <div class="relative">{@render children()}</div>
  <figcaption class="mt-3 text-xs leading-relaxed text-muted">{caption}</figcaption>
</figure>
