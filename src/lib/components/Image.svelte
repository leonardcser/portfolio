<script lang="ts">
  import { cn } from '$lib/utils';
  import { openMediaPreview } from '$lib/state.svelte';

  interface Props {
    src: string;
    description: string;
    figureNumber: number;
    class?: string;
  }

  const { src, description, figureNumber, class: className = '' }: Props = $props();

  function handleClick() {
    openMediaPreview('image', src, description, figureNumber);
  }
</script>

<button
  type="button"
  onclick={handleClick}
  class="block h-full w-full cursor-zoom-in border-none bg-transparent p-0"
  aria-label="Open image in preview"
>
  <enhanced:img
    loading="lazy"
    fetchpriority="low"
    {src}
    alt={description}
    class={cn('m-0 h-full w-full', className)}
    itemprop="image"
  />
</button>
