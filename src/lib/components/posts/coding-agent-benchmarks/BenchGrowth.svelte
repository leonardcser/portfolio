<script lang="ts">
  import { agentOrder, agents, sessionMemory, sessionTurns } from '#lib/data/harness-bench.ts';
  import Figure from '#lib/components/charts/Figure.svelte';
  import LineChart from '#lib/components/charts/LineChart.svelte';
  import { marks } from './marks.ts';
  import { mib } from '#lib/components/charts/format.ts';

  const series = agentOrder.map((id) => ({
    label: agents[id].name,
    mark: marks[id],
    values: sessionMemory[id],
    highlight: id === 'fx',
  }));
</script>

<Figure
  caption="Memory over one 64-turn session, after 4, 16, 32 and 64 turns. Turns on a log scale."
>
  <LineChart
    label="Memory over a 64-turn session"
    xs={sessionTurns}
    xScale="log"
    xTicks={sessionTurns}
    yTicks={[0, 200, 400, 600]}
    yMax={800}
    {series}
    fmtX={(t) => `turn ${t}`}
    fmtY={mib}
    tipTitle={(t) => `after ${t} turns`}
  />
</Figure>
