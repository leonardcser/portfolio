<script lang="ts">
  import { agentOrder, agents, streamCpu, streamRates } from '#lib/data/harness-bench.ts';
  import Figure from '#lib/components/charts/Figure.svelte';
  import LineChart from '#lib/components/charts/LineChart.svelte';
  import { marks } from './marks.ts';

  const series = agentOrder.map((id) => ({
    label: agents[id].name,
    mark: marks[id],
    values: streamCpu[id],
    highlight: id === 'opencode' || id === 'claude',
  }));
  const pct = (v: number) => `${v < 10 ? v.toFixed(1).replace(/\.0$/, '') : Math.round(v)}%`;
</script>

<Figure
  caption="CPU while the same task streams in the TUI, as a share of one core, by model speed."
>
  <LineChart
    label="CPU share of one core by model streaming speed"
    xs={streamRates}
    xScale="log"
    xTicks={streamRates}
    yTicks={[0, 10, 20, 30, 40, 50]}
    yMax={50}
    {series}
    fmtX={(v) => `${v} tok/s`}
    fmtY={pct}
    tipTitle={(v) => `${v} tokens/s`}
  />
</Figure>
