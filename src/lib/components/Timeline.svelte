<script lang="ts">
  import TimelineItem, { type TimelineItemProps } from './TimelineItem.svelte';

  interface Props {
    items: TimelineItemProps[];
  }

  let { items }: Props = $props();

  let container: HTMLElement;
  let line: HTMLElement;

  $effect(() => {
    if (!container || !line) return;

    const topOffsetPx = line.offsetTop + 100; // matches top-16 (64px) plus custom offset

    const updateLine = () => {
      const rect = container.getBoundingClientRect();

      // Where the line starts within the container relative to the viewport
      const startY = rect.top + topOffsetPx;
      // How far down we can draw: not past the viewport bottom nor the container bottom
      const viewportBottom = Math.min(window.innerHeight, rect.bottom);
      // Raw height is what is currently visible since the line's start
      const rawHeight = viewportBottom - startY;

      const maxHeight = Math.max(0, rect.height - topOffsetPx);
      const clampedHeight = Math.max(0, Math.min(rawHeight, maxHeight));

      line.style.height = `${clampedHeight}px`;
    };

    window.addEventListener('scroll', updateLine, { passive: true });
    window.addEventListener('resize', updateLine);
    updateLine();
    return () => {
      window.removeEventListener('scroll', updateLine);
      window.removeEventListener('resize', updateLine);
    };
  });
</script>

<div bind:this={container} class="not-prose relative mx-auto max-w-4xl py-8">
  <div
    bind:this={line}
    class="absolute top-16 left-8 z-0 w-0.5 bg-primary/15 mask-b-from-80%"
    style="height: 0px;"
  ></div>
  <div class="space-y-12">
    {#each items as item (item.title)}
      <TimelineItem {...item} />
    {/each}
  </div>
</div>
