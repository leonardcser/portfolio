<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    style?: string;
    children: Snippet;
  }

  let { class: className, style, children }: Props = $props();
</script>

<div
  class={cn(
    'prose w-full max-w-5xl! min-w-0 border-border py-3 sm:py-4 lg:py-6 dark:prose-invert',
    className
  )}
  style="border-bottom-style: dashed; {style}"
>
  {@render children()}
</div>
