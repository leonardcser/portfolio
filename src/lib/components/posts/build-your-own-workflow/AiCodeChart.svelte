<script lang="ts">
  const data = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 8, y: 7 },
    { x: 12, y: 22 },
    { x: 14, y: 60 },
  ];

  const annotations = [
    { x: 2, y: 0, label: 'Start using Cursor' },
    { x: 8, y: 7, label: 'Start using Claude Code' },
    { x: 12, y: 22, label: 'Opus 4.5' },
  ];

  const xMin = 0;
  const xMax = 14.5;
  const yMin = 0;
  const yMax = 45;

  const padding = { top: 20, right: 0, bottom: 28, left: 1 };
  const width = 700;
  const height = 250;

  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  function sx(x: number) {
    return padding.left + ((x - xMin) / (xMax - xMin)) * plotW;
  }

  function sy(y: number) {
    return padding.top + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
  }

  function buildPath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return '';
    const points = pts.map((p) => ({ x: sx(p.x), y: sy(p.y) }));
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x},${points[i].y}`;
    }
    return d;
  }

  const linePath = buildPath(data);
  const lastPt = data[data.length - 1];
  const areaPath = linePath + ` L ${sx(lastPt.x)},${sy(0)} L ${sx(data[0].x)},${sy(0)} Z`;

  const yearTicks = [
    { x: 0, label: '2025' },
    { x: 12, label: '2026' },
  ];

  // Place "Written by AI" label inside the filled area, near the bottom-right
  const labelX = sx(11.5);
  const labelY = sy(10);
</script>

<svg viewBox="0 0 {width} {height}" class="w-full">
  <!-- Clip to plot area so line/fill don't overflow into text above -->
  <defs>
    <clipPath id="plot-clip">
      <rect x={0} y={padding.top} width={width * 2} height={plotH} />
    </clipPath>
  </defs>

  <!-- Vertical grid lines at year marks -->
  {#each yearTicks as tick (tick.label)}
    <line
      x1={sx(tick.x)}
      y1={padding.top}
      x2={sx(tick.x)}
      y2={sy(yMin)}
      class="stroke-border"
      stroke-width="1"
    />
  {/each}

  <!-- Axes: bottom and left -->
  <line
    x1={sx(xMin)}
    y1={sy(yMin)}
    x2={sx(lastPt.x)}
    y2={sy(yMin)}
    class="stroke-primary/30"
    stroke-width="0.5"
  />
  <line
    x1={sx(xMin)}
    y1={sy(yMin)}
    x2={sx(xMin)}
    y2={padding.top}
    class="stroke-primary/30"
    stroke-width="0.5"
  />

  <!-- Clipped plot content -->
  <g clip-path="url(#plot-clip)">
    <!-- Filled area -->
    <path d={areaPath} fill="var(--color-accent)" opacity="0.12" />

    <!-- Line -->
    <path d={linePath} fill="none" stroke="var(--color-accent)" stroke-width="2.5" />
  </g>

  <!-- Annotation markers: dashed line from top to dot, label at top with gap -->
  {#each annotations as a (a.label)}
    <line
      x1={sx(a.x)}
      y1={padding.top + 16}
      x2={sx(a.x)}
      y2={sy(a.y)}
      stroke="var(--color-accent)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0.4"
    />
    <circle cx={sx(a.x)} cy={sy(a.y)} r="3.5" fill="var(--color-accent)" />
    <text
      x={sx(a.x)}
      y={padding.top + 10}
      text-anchor="middle"
      class="fill-muted"
      font-size="11"
      font-style="italic"
    >
      {a.label}
    </text>
  {/each}

  <!-- "Written by AI" label inside the filled area -->
  <text
    x={labelX}
    y={labelY}
    text-anchor="middle"
    fill="var(--color-accent)"
    font-size="13"
    font-weight="bold"
    opacity="1"
  >
    Written by AI
  </text>

  <!-- Year labels -->
  {#each yearTicks as tick (tick.label)}
    <text x={sx(tick.x)} y={sy(yMin) + 18} text-anchor="start" class="fill-primary" font-size="12">
      {tick.label}
    </text>
  {/each}
</svg>
