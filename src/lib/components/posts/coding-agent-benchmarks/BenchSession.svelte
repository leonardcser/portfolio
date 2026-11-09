<script lang="ts">
  import { agentOrder, agents, sessionCpu, sessionTurns } from '#lib/data/harness-bench.ts';
  import Figure from '#lib/components/charts/Figure.svelte';
  import LineChart from '#lib/components/charts/LineChart.svelte';
  import { marks } from './marks.ts';
  import { ms } from '#lib/components/charts/format.ts';

  const series = agentOrder.map((id) => ({
    label: agents[id].name,
    mark: marks[id],
    values: sessionCpu[id],
    highlight: id === 'fx' || id === 'opencode',
  }));
</script>

<Figure
  caption="CPU time per turn over one 64-turn session, averaged over turns 1-4, 4-16, 16-32 and 32-64. Turns on a log scale."
>
  <LineChart
    label="CPU per turn over a 64-turn session"
    xs={sessionTurns}
    xScale="log"
    xTicks={sessionTurns}
    yTicks={[0, 2000, 4000, 6000, 8000]}
    yMax={9000}
    {series}
    fmtX={(t) => `turn ${t}`}
    fmtY={ms}
    tipTitle={(t) => `up to turn ${t}`}
  />
</Figure>
