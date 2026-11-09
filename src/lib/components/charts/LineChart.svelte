<script lang="ts">
  import Tip from './Tip.svelte';
  import { linear, log, spread, thin, type Mark } from './chart.ts';

  export interface Series {
    label: string;
    values: (number | null)[];
    mark?: Mark;
    highlight?: boolean;
  }

  interface Props {
    xs: number[];
    series: Series[];
    xScale?: 'linear' | 'log';
    xTicks: number[];
    yTicks: number[];
    yMax: number;
    fmtX: (v: number) => string;
    fmtY: (v: number) => string;
    tipTitle: (x: number) => string;
    reference?: { y: number; label: string };
    height?: number;
    label: string;
  }

  let {
    xs,
    series,
    xScale = 'linear',
    xTicks,
    yTicks,
    yMax,
    fmtX,
    fmtY,
    tipTitle,
    reference,
    height = 280,
    label,
  }: Props = $props();

  let w = $state(640);
  const pad = { l: 48, r: 156, t: 12, b: 30 };
  const x = $derived((xScale === 'log' ? log : linear)(xs[0], xs.at(-1)!, pad.l, w - pad.r));
  const y = $derived(linear(0, yMax, height - pad.b, pad.t));

  const last = (s: Series) => {
    for (let i = s.values.length - 1; i >= 0; i--) if (s.values[i] !== null) return i;
    return -1;
  };
  const path = (s: Series) =>
    s.values
      .map((v, i) => (v === null ? '' : `${x(xs[i])},${y(v)}`))
      .filter(Boolean)
      .map((p, i) => `${i ? 'L' : 'M'}${p}`)
      .join(' ');

  const ends = $derived(
    spread(
      series.map((s) => y(s.values[last(s)] ?? 0)),
      16,
      pad.t,
      height - pad.b
    )
  );
  // Draw muted series first so the highlighted one sits on top.
  const drawOrder = $derived(
    series
      .map((s, i) => ({ s, i }))
      .sort((a, b) => Number(!!a.s.highlight) - Number(!!b.s.highlight))
  );

  let at = $state<number | null>(null);

  function move(e: PointerEvent) {
    const box = (e.currentTarget as SVGElement).getBoundingClientRect();
    const px = e.clientX - box.left;
    let best = 0;
    xs.forEach((v, i) => {
      if (Math.abs(x(v) - px) < Math.abs(x(xs[best]) - px)) best = i;
    });
    at = best;
  }
</script>

<div bind:clientWidth={w} class="relative">
  <svg
    width={w}
    {height}
    class="block touch-pan-y overflow-visible text-[11px]"
    role="img"
    aria-label={label}
    onpointermove={move}
    onpointerleave={() => (at = null)}
  >
    {#each yTicks as t (t)}
      <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} class="stroke-border" />
      <text x={pad.l - 8} y={y(t)} dy="0.32em" text-anchor="end" class="fill-muted">{fmtY(t)}</text>
    {/each}
    {#each thin(xTicks, x, w < 480 ? 64 : 56) as t (t)}
      <text x={x(t)} y={height - pad.b + 18} text-anchor="middle" class="fill-muted">{fmtX(t)}</text
      >
    {/each}
    {#if reference}
      <line
        x1={pad.l}
        x2={w - pad.r}
        y1={y(reference.y)}
        y2={y(reference.y)}
        class="stroke-accent/60"
      />
      <text x={pad.l + 4} y={y(reference.y) - 5} class="fill-accent">{reference.label}</text>
    {/if}
    {#each drawOrder as { s, i } (s.label)}
      {@const end = last(s)}
      <path
        d={path(s)}
        fill="none"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        class={s.highlight ? 'stroke-accent' : 'stroke-muted/70'}
      />
      {#if end >= 0}
        {@const ex = x(xs[end])}
        {@const ey = y(s.values[end]!)}
        <circle
          cx={ex}
          cy={ey}
          r="4"
          class="stroke-card {s.highlight ? 'fill-accent' : 'fill-muted'}"
          stroke-width="2"
        />
        <!-- A label pushed off its line's end gets a leader back to it. -->
        {#if Math.abs(ends[i] - ey) > 1}
          <line x1={ex + 6} y1={ey} x2={ex + 12} y2={ends[i]} class="stroke-border" />
        {/if}
        {#if s.mark}
          <svg
            x={ex + 14}
            y={ends[i] - 6.5}
            width="13"
            height="13"
            viewBox={s.mark.viewBox}
            class="text-primary"
            aria-hidden="true"
          >
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html s.mark.body}
          </svg>
        {/if}
        <text x={ex + (s.mark ? 34 : 14)} y={ends[i]} dy="0.32em" class="fill-primary">
          {s.label}
          <tspan class="fill-muted font-mono">{fmtY(s.values[end]!)}</tspan>
        </text>
      {/if}
    {/each}
    {#if at !== null}
      <line
        x1={x(xs[at])}
        x2={x(xs[at])}
        y1={pad.t}
        y2={height - pad.b}
        class="stroke-primary/30"
      />
      {#each series as s (s.label)}
        {#if s.values[at] !== null}
          <circle
            cx={x(xs[at])}
            cy={y(s.values[at]!)}
            r="3.5"
            class="stroke-card {s.highlight ? 'fill-accent' : 'fill-muted'}"
            stroke-width="2"
          />
        {/if}
      {/each}
    {/if}
  </svg>
  {#if at !== null}
    <Tip x={(x(xs[at]) / w) * 100} y={20}>
      <div class="mb-1 text-muted">{tipTitle(xs[at])}</div>
      {#each [...series]
        .filter((s) => s.values[at!] !== null)
        .sort((a, b) => b.values[at!]! - a.values[at!]!) as s (s.label)}
        <div class="flex items-center justify-between gap-4">
          <span class="inline-flex items-center gap-1.5">
            <i class="inline-block h-0.5 w-3 {s.highlight ? 'bg-accent' : 'bg-muted'}"></i>
            {s.label}
          </span>
          <span class="font-mono">{fmtY(s.values[at!]!)}</span>
        </div>
      {/each}
    </Tip>
  {/if}
</div>
