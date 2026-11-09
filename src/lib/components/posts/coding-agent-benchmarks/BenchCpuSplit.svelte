<script lang="ts">
  import { agents, byValue, taskCpu, type AgentId } from '#lib/data/harness-bench.ts';
  import AgentLabel from './AgentLabel.svelte';
  import Figure from '#lib/components/charts/Figure.svelte';
  import Key from '#lib/components/charts/Key.svelte';
  import Spread from './Spread.svelte';
  import Tip from '#lib/components/charts/Tip.svelte';
  import Whisker from '#lib/components/charts/Whisker.svelte';
  import { pointer, span } from '#lib/components/charts/chart.ts';
  import { seconds } from '#lib/components/charts/format.ts';

  const order = byValue((id) => taskCpu[id].tui.median);
  const max = Math.max(...order.map((id) => taskCpu[id].tui.max));

  let box: HTMLDivElement;
  let hover = $state<{ id: AgentId; x: number; y: number } | null>(null);
</script>

<Figure caption="CPU time for one task with 24 tool calls and a model at 120 tokens/s.">
  {#snippet legend()}
    <Key tone="gray" label="headless" />
    <Key tone="accent" label="TUI" />
  {/snippet}
  <div bind:this={box} class="relative">
    {#each order as id (id)}
      {@const v = taskCpu[id]}
      <div
        class="grid h-7 grid-cols-[8.5rem_1fr_3.5rem] items-center gap-3 text-sm transition-opacity"
        class:opacity-40={hover && hover.id !== id}
        role="img"
        aria-label="{agents[id].name}: {seconds(v.headless.median)} headless, {seconds(
          v.tui.median - v.headless.median
        )} TUI"
        onpointermove={(e) => (hover = { id, ...pointer(box, e) })}
        onpointerleave={() => (hover = null)}
      >
        <AgentLabel {id} />
        <div class="relative flex h-5 items-center gap-0.5">
          <div class="h-full shrink-0 bg-muted" style:width={span(v.headless.median / max)}></div>
          <div
            class="h-full shrink-0 bg-accent"
            style:width={span((v.tui.median - v.headless.median) / max)}
          ></div>
          <Whisker from={span(v.tui.min / max, '2px')} to={span(v.tui.max / max, '2px')} />
        </div>
        <div class="text-right font-mono text-xs tabular-nums">{seconds(v.tui.median)}</div>
      </div>
    {/each}
    {#if hover}
      {@const v = taskCpu[hover.id]}
      <Tip x={hover.x} y={hover.y}>
        <div class="mb-1 text-muted">{agents[hover.id].name}</div>
        {#each [{ tone: 'bg-muted', label: 'headless', value: v.headless.median }, { tone: 'bg-accent', label: 'TUI', value: v.tui.median - v.headless.median }] as part (part.label)}
          <div class="flex items-center justify-between gap-4">
            <span class="inline-flex items-center gap-1.5">
              <i class="inline-block size-2.5 {part.tone}"></i>
              {part.label}
            </span>
            <span class="font-mono">{seconds(part.value)}</span>
          </div>
        {/each}
        <div class="mt-1 flex justify-between gap-4 border-t border-border pt-1">
          <span>total</span>
          <span class="font-mono">{seconds(v.tui.median)}</span>
        </div>
        <Spread stat={v.tui} fmt={seconds} />
      </Tip>
    {/if}
  </div>
</Figure>
