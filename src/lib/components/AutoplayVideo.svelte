<script lang="ts">
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';

  interface Props {
    src: string;
    class?: string;
  }

  const { src, class: className = '' }: Props = $props();
  let videoElement: HTMLVideoElement;
  let isLoaded = $state(false);
  let isPlaying = $state(false);

  onMount(() => {
    if (isLoaded) {
      return;
    }
    // Create source elements programmatically
    const formats = [
      { type: 'video/mp4', ext: 'mp4' },
      { type: 'video/ogg', ext: 'ogg' },
      { type: 'video/webm', ext: 'webm' },
    ];

    formats.forEach((format) => {
      const source = document.createElement('source');
      source.src = `${src}.${format.ext}`;
      source.type = format.type;
      // eslint-disable-next-line svelte/no-dom-manipulating
      videoElement.appendChild(source);
    });

    // Add event listeners before loading
    videoElement.addEventListener('canplay', () => {
      isPlaying = true;
    });

    // Load the video
    videoElement.load();
    isLoaded = true;
  });
</script>

<div class="relative">
  <!-- Skeleton loader -->
  {#if !isPlaying}
    <div class="absolute top-0 left-0 h-full w-full animate-pulse bg-background"></div>
  {/if}

  <!-- Video element -->
  <video
    bind:this={videoElement}
    autoplay
    loop
    playsinline
    muted
    class={cn('m-0! scale-[1.01] border-none', className)}
    style="opacity: {isPlaying ? '1' : '0'}"
    itemprop="video"
  ></video>
</div>
