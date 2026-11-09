<script lang="ts">
  import { agents, byValue, memory, type AgentId } from '#lib/data/harness-bench.ts';
  import AgentLabel from './AgentLabel.svelte';
  import Figure from '#lib/components/charts/Figure.svelte';
  import Spread from './Spread.svelte';
  import Tip from '#lib/components/charts/Tip.svelte';
  import Whisker from '#lib/components/charts/Whisker.svelte';
  import { pointer, span } from '#lib/components/charts/chart.ts';
  import { mib } from '#lib/components/charts/format.ts';

  const order = byValue((id) => memory[id].median);
  const max = Math.max(...order.map((id) => memory[id].max));

  let box: HTMLDivElement;
  let hover = $state<{ id: AgentId; x: number; y: number } | null>(null);
</script>

<Figure
  caption="Memory after launch, while waiting for the first reply. Whiskers show the lowest and highest of 3 runs."
>
  <div bind:this={box} class="relative">
    {#each order as id (id)}
      {@const m = memory[id]}
      <div
        class="grid h-7 grid-cols-[8.5rem_2.5rem_1fr_4.5rem] items-center gap-3 text-sm transition-opacity"
        class:opacity-40={hover && hover.id !== id}
        role="img"
        aria-label="{agents[id].name}, {agents[id].language}: {mib(m.median)}"
        onpointermove={(e) => (hover = { id, ...pointer(box, e) })}
        onpointerleave={() => (hover = null)}
      >
        <AgentLabel {id} />
        <div class="font-mono text-[11px] text-muted">{agents[id].language}</div>
        <div class="relative flex h-5 items-center">
          <div
            class="h-full shrink-0 {id === 'opencode' ? 'bg-accent' : 'bg-muted'}"
            style:width={span(m.median / max)}
          ></div>
          <Whisker from={span(m.min / max)} to={span(m.max / max)} />
        </div>
        <div class="text-right font-mono text-xs tabular-nums">{mib(m.median)}</div>
      </div>
    {/each}
    {#if hover}
      {@const m = memory[hover.id]}
      <Tip x={hover.x} y={hover.y}>
        <div class="mb-1 text-muted">{agents[hover.id].name}, {agents[hover.id].language}</div>
        <div class="flex justify-between gap-4">
          <span>memory</span>
          <span class="font-mono">{mib(m.median)}</span>
        </div>
        <Spread stat={m} fmt={mib} />
      </Tip>
    {/if}
  </div>
</Figure>
