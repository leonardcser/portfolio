<script lang="ts">
  import type { AgentId } from '#lib/data/harness-bench.ts';
  import { agents } from '#lib/data/harness-bench.ts';
  import { marks } from './marks.ts';

  let { id }: { id: AgentId } = $props();
  const mark = $derived(marks[id]);
</script>

<span class="inline-flex items-center gap-2 whitespace-nowrap">
  <svg viewBox={mark.viewBox} class="size-4 shrink-0 text-primary" aria-hidden="true">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html mark.body}
  </svg>
  {agents[id].name}
</span>
