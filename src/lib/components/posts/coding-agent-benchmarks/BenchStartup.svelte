<script lang="ts">
  import { agents, byValue, startupMs, type AgentId } from '#lib/data/harness-bench.ts';
  import AgentLabel from './AgentLabel.svelte';
  import Figure from '#lib/components/charts/Figure.svelte';
  import Spread from './Spread.svelte';
  import Tip from '#lib/components/charts/Tip.svelte';
  import Whisker from '#lib/components/charts/Whisker.svelte';
  import { log, pointer, span } from '#lib/components/charts/chart.ts';
  import { ms } from '#lib/components/charts/format.ts';

  const order = byValue((id) => startupMs[id].median);
  const top = Math.max(...order.map((id) => startupMs[id].max));
  // Fraction of the scaled part of the track; the last zone runs to its end.
  const x = log(5, top, 0, 1);
  const zones = [
    { from: 5, label: 'feels instant' },
    { from: 100, label: 'noticeable' },
    { from: 1000, label: 'waiting' },
  ];

  let box: HTMLDivElement;
  let hover = $state<{ id: AgentId; x: number; y: number } | null>(null);
</script>

<Figure
  caption="Time from launch until a typed key shows up. Log scale. Whiskers show the lowest and highest of 3 runs."
>
  <div bind:this={box} class="relative grid grid-cols-[8.5rem_1fr_4.5rem] gap-x-3 text-sm">
    <div></div>
    <div class="relative h-5 text-[11px] text-muted">
      {#each zones as z (z.label)}
        <span class="absolute pl-1.5 whitespace-nowrap" style:left={span(x(z.from))}>{z.label}</span
        >
      {/each}
    </div>
    <div></div>
    {#each order as id (id)}
      {@const s = startupMs[id]}
      <div
        class="col-span-3 grid grid-cols-subgrid transition-opacity"
        class:opacity-40={hover && hover.id !== id}
        role="img"
        aria-label="{agents[id].name}: {ms(s.median)}"
        onpointermove={(e) => (hover = { id, ...pointer(box, e) })}
        onpointerleave={() => (hover = null)}
      >
        <div class="flex h-7 items-center"><AgentLabel {id} /></div>
        <div class="relative flex h-7 items-center">
          {#each zones as z, i (z.label)}
            <div
              class="absolute inset-y-0 border-l border-border {i === 1
                ? 'bg-primary/[0.07]'
                : ''} {i === 2 ? 'bg-primary/[0.14]' : ''}"
              style:left={span(x(z.from))}
              style:right={i < zones.length - 1
                ? `calc(100% - ${span(x(zones[i + 1].from))})`
                : '0'}
            ></div>
          {/each}
          <div
            class="relative h-5 shrink-0 {id === 'opencode' || id === 'omp'
              ? 'bg-accent'
              : 'bg-muted'}"
            style:width={span(x(s.median))}
          ></div>
          <Whisker from={span(x(s.min))} to={span(x(s.max))} />
        </div>
        <div class="flex h-7 items-center justify-end font-mono text-xs tabular-nums">
          {ms(s.median)}
        </div>
      </div>
    {/each}
    <div></div>
    <div class="relative mt-1 h-4 text-[11px] text-muted">
      {#each [10, 100, 1000] as t (t)}
        <span class="absolute -translate-x-1/2" style:left={span(x(t))}>{ms(t)}</span>
      {/each}
    </div>
    <div></div>
    {#if hover}
      {@const s = startupMs[hover.id]}
      <Tip x={hover.x} y={hover.y}>
        <div class="mb-1 text-muted">{agents[hover.id].name}</div>
        <div class="flex justify-between gap-4">
          <span>startup</span>
          <span class="font-mono">{ms(s.median)}</span>
        </div>
        <Spread stat={s} fmt={ms} />
      </Tip>
    {/if}
  </div>
</Figure>
