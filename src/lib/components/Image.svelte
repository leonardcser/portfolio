<script lang="ts">
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';
  import { openMediaPreview } from '$lib/state.svelte';

  interface Props {
    src: string;
    description: string;
    figureNumber: number;
    class?: string;
  }

  const { src, description, figureNumber, class: className = '' }: Props = $props();
  let imgElement: HTMLImageElement;
  let isLoaded = $state(false);

  onMount(() => {
    const handleLoad = () => {
      isLoaded = true;
    };

    imgElement.addEventListener('load', handleLoad);

    // Handle case where image is already cached
    if (imgElement.complete && imgElement.naturalHeight !== 0) {
      isLoaded = true;
    }

    return () => {
      imgElement.removeEventListener('load', handleLoad);
    };
  });

  function handleClick() {
    openMediaPreview('image', src, description, figureNumber);
  }
</script>

<noscript>
  <style>
    .image-fallback {
      opacity: 1 !important;
    }
    .image-skeleton-fallback {
      display: none !important;
    }
  </style>
</noscript>

<button
  type="button"
  onclick={handleClick}
  class="relative block h-full w-full cursor-zoom-in border-none bg-transparent p-0"
  aria-label="Open image in preview"
>
  {#if !isLoaded}
    <div
      class="image-skeleton-fallback absolute top-0 left-0 h-full w-full animate-pulse bg-background"
    ></div>
  {/if}

  <enhanced:img
    bind:this={imgElement}
    loading="lazy"
    fetchpriority="low"
    {src}
    alt={description}
    class={cn('image-fallback m-0 h-full w-full', className)}
    style="opacity: {isLoaded ? '1' : '0'}"
    itemprop="image"
  />
</button>
