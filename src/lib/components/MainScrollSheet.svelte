<script lang="ts">
  import { sheetState } from '$lib/state.svelte';
  import { headerCompactHeight, headerHeight } from '$lib/components/Header.svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  // Constants
  const peekPx = headerCompactHeight;
  const maxShift = headerHeight - peekPx;

  // Element reference
  let innerScrollEl: HTMLElement;

  // Scroll handler
  function handleWheel(e: WheelEvent) {
    e.preventDefault();

    if (!sheetState.isLocked) {
      // Sheet is not locked - move it up/down
      if (e.deltaY > 0) {
        // Scrolling down - move sheet up
        sheetState.sheetShift += e.deltaY;
        if (sheetState.sheetShift >= maxShift) {
          sheetState.sheetShift = maxShift;
          sheetState.isLocked = true;
        }
      } else {
        // Scrolling up - move sheet down
        sheetState.sheetShift += e.deltaY; // deltaY is negative
        if (sheetState.sheetShift <= 0) {
          sheetState.sheetShift = 0;
        }
      }
    } else {
      // Sheet is locked - handle inner content scrolling
      if (!innerScrollEl) return;

      const atTop = innerScrollEl.scrollTop === 0 && e.deltaY < 0;

      if (atTop) {
        // At top and scrolling up - unlock and move sheet down
        sheetState.isLocked = false;
        sheetState.sheetShift += e.deltaY;
        if (sheetState.sheetShift < 0) sheetState.sheetShift = 0;
      } else {
        // Normal inner scrolling
        innerScrollEl.scrollTop += e.deltaY;
      }
    }
  }

  function handleResize() {
    sheetState.viewportPx = window.innerHeight;
    // Keep shift within bounds on resize
    if (sheetState.sheetShift > maxShift) sheetState.sheetShift = maxShift;
  }

  $effect(() => {
    handleResize();

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  });

  const sheetTop = headerHeight;
  const sheetHeight = $derived(Math.max(sheetState.viewportPx - peekPx, 0));
  const sheetTransform = $derived(`translateY(-${sheetState.sheetShift}px)`);
  const innerHeight = $derived(Math.max(sheetState.viewportPx - peekPx, 0));
</script>

<!-- Sliding sheet that covers header until peek amount remains visible -->
<main class="fixed inset-x-0 z-10 w-full" style:top="{sheetTop}px" style:height="{sheetHeight}px">
  <div
    class={cn(
      'w-full border-t border-border',
      sheetState.isLocked ? 'overflow-y-auto' : 'overflow-hidden'
    )}
    style:transform={sheetTransform}
    style:height={innerHeight !== 0 ? innerHeight + 'px' : 'auto'}
    bind:this={innerScrollEl}
  >
    {@render children()}
  </div>
</main>