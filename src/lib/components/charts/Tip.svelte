<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    x: number;
    y: number;
    children: Snippet;
  }

  // x and y are percentages of the chart box.
  let { x, y, children }: Props = $props();
</script>

<div
  class="pointer-events-none absolute z-10 min-w-36 border border-border bg-card px-2.5 py-2 text-xs shadow-sm"
  style:left="{x}%"
  style:top="{y}%"
  style:transform="translate({x > 60 ? 'calc(-100% - 10px)' : '10px'}, {y > 60
    ? 'calc(-100% - 6px)'
    : '6px'})"
  role="status"
>
  {@render children()}
</div>
