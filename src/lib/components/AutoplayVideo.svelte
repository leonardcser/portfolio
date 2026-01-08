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
  let videoElement: HTMLVideoElement;
  let isPlaying = $state(false);

  onMount(() => {
    const handleCanPlay = () => {
      isPlaying = true;
    };

    videoElement.addEventListener('canplay', handleCanPlay);

    if (videoElement.readyState >= 3) {
      isPlaying = true;
    }
  });

  function handleClick() {
    openMediaPreview('video', src, description, figureNumber);
  }
</script>

<noscript>
  <style>
    .autoplay-video-fallback {
      opacity: 1 !important;
    }
    .autoplay-skeleton-fallback {
      display: none !important;
    }
  </style>
</noscript>

<button
  type="button"
  onclick={handleClick}
  class="relative w-full cursor-zoom-in border-none bg-transparent p-0"
  aria-label="Open video in preview"
>
  {#if !isPlaying}
    <div
      class="autoplay-skeleton-fallback absolute top-0 left-0 h-full w-full animate-pulse bg-background"
    ></div>
  {/if}

  <video
    bind:this={videoElement}
    autoplay
    loop
    playsinline
    muted
    class={cn('autoplay-video-fallback m-0! w-full scale-[1.01] border-none', className)}
    style="opacity: {isPlaying ? '1' : '0'}"
    itemprop="video"
    aria-label={description}
  >
    <source src="{src}.mp4" type="video/mp4" />
    <source src="{src}.ogg" type="video/ogg" />
    <source src="{src}.webm" type="video/webm" />
  </video>
</button>
