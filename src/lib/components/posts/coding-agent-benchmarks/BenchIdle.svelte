<script lang="ts">
  import { agentOrder, agents, idleCpu, idleSeconds } from '#lib/data/harness-bench.ts';
  import Figure from '#lib/components/charts/Figure.svelte';
  import LineChart from '#lib/components/charts/LineChart.svelte';
  import { marks } from './marks.ts';
  import { ms } from '#lib/components/charts/format.ts';

  const series = agentOrder.map((id) => ({
    label: agents[id].name,
    mark: marks[id],
    values: idleCpu[id],
    highlight: id === 'fx' || id === 'opencode' || id === 'omp',
  }));
</script>

<Figure
  caption="Total CPU used by an open session in the 5 minutes after a task, with nothing on screen changing."
>
  <LineChart
    label="Cumulative idle CPU over 5 minutes"
    xs={idleSeconds}
    xTicks={idleSeconds}
    yTicks={[0, 500, 1000, 1500]}
    yMax={1800}
    {series}
    fmtX={(v) => `${v} s`}
    fmtY={ms}
    tipTitle={(v) => `after ${v} s idle`}
  />
</Figure>
