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

<div class="flex justify-center last:h-full">
  <section
    class={cn(
      'prose-sm w-full max-w-screen-lg border-x border-border bg-background p-6 dark:prose-invert',
      className
    )}
    {style}
  >
    {@render children()}
  </section>
</div>
