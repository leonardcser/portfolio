<script lang="ts">
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';

  interface Props {
    src: string;
    class?: string;
  }

  const { src, class: className = '' }: Props = $props();
  let videoElement: HTMLVideoElement;
  let isPlaying = $state(false);

  onMount(() => {
    // Add event listeners for progressive enhancement
    const handleCanPlay = () => {
      isPlaying = true;
    };

    videoElement.addEventListener('canplay', handleCanPlay);

    // Check if video is already ready to play
    if (videoElement.readyState >= 3) {
      isPlaying = true;
    }
  });
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

<div class="relative">
  <!-- Skeleton loader -->
  {#if !isPlaying}
    <div
      class="autoplay-skeleton-fallback absolute top-0 left-0 h-full w-full animate-pulse bg-background"
    ></div>
  {/if}

  <!-- Video element -->
  <video
    bind:this={videoElement}
    autoplay
    loop
    playsinline
    muted
    class={cn('autoplay-video-fallback m-0! scale-[1.01] border-none', className)}
    style="opacity: {isPlaying ? '1' : '0'}"
    itemprop="video"
  >
    <source src="{src}.mp4" type="video/mp4" />
    <source src="{src}.ogg" type="video/ogg" />
    <source src="{src}.webm" type="video/webm" />
  </video>
</div>
