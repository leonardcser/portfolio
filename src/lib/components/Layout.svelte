<script lang="ts" module>
  export interface TOCSubItem {
    id: string;
    label: string;
  }

  export interface TOCItem {
    id: string;
    label: string;
    subsections?: TOCSubItem[];
  }

  export type LayoutProps = Props;
</script>

<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  import TableOfContents from './TableOfContents.svelte';

  interface Props {
    tocItems?: TOCItem[];
    class?: string;
    children: Snippet;
  }

  let { tocItems, class: className, children }: Props = $props();

  const showToc = $derived(tocItems !== undefined && tocItems.length > 0);
</script>

<div class={cn('flex', className)}>
  {#if showToc}
    <aside
      class="hidden w-66.5 shrink-0 border-s border-border/50 bg-card lg:ms-12 lg:block lg:ps-12 lg:pe-4 lg:pt-34"
    >
      <TableOfContents items={tocItems} />
    </aside>
  {/if}
  <main
    class={cn(
      'relative mx-0 flex min-h-screen flex-1 flex-col items-start overflow-x-hidden border-b border-border/50 bg-card px-6 py-8 sm:mx-12 sm:px-10 sm:py-10 lg:py-26',
      showToc
        ? 'border-x lg:ms-0 lg:me-12 lg:border-s-0 lg:px-20 lg:ps-6'
        : 'border-x lg:mx-12 lg:px-20'
    )}
  >
    {@render children()}
  </main>
</div>
