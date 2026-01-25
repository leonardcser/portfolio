<script lang="ts">
  import { mediaPreviewState, closeMediaPreview } from '$lib/state.svelte';

  $effect(() => {
    if (mediaPreviewState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && mediaPreviewState.isOpen) {
      closeMediaPreview();
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeMediaPreview();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if mediaPreviewState.isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-label={mediaPreviewState.description ?? 'Media preview'}
    tabindex="-1"
  >
    <button
      class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      onclick={closeMediaPreview}
      aria-label="Close preview"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <figure class="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4">
      {#if mediaPreviewState.type === 'image' && mediaPreviewState.src}
        <img
          src={mediaPreviewState.src}
          alt={mediaPreviewState.description ?? ''}
          class="max-h-[calc(90vh-3rem)] object-contain"
        />
      {:else if mediaPreviewState.type === 'video' && mediaPreviewState.src}
        <video
          src="{mediaPreviewState.src}.mp4"
          autoplay
          loop
          muted
          playsinline
          class="max-h-[calc(90vh-3rem)] object-contain"
        >
          <source src="{mediaPreviewState.src}.mp4" type="video/mp4" />
          <source src="{mediaPreviewState.src}.ogg" type="video/ogg" />
          <source src="{mediaPreviewState.src}.webm" type="video/webm" />
        </video>
      {/if}
      {#if mediaPreviewState.description && mediaPreviewState.figureNumber}
        <figcaption class="text-center text-sm text-white/80">
          <span class="font-semibold">Figure {mediaPreviewState.figureNumber}:</span>
          {mediaPreviewState.description}
        </figcaption>
      {/if}
    </figure>
  </div>
{/if}
