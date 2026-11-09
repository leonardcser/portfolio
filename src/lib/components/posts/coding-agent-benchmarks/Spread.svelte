<script lang="ts">
  import type { Stat } from '#lib/data/harness-bench.ts';

  interface Props {
    stat: Stat;
    fmt: (v: number) => string;
  }

  let { stat, fmt }: Props = $props();
</script>

<div class="mt-1 text-muted">
  Range of 3 runs: <span class="font-mono">{fmt(stat.min)} to {fmt(stat.max)}</span>
</div>
