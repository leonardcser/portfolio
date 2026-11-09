// Scales, label layout and pointer helpers shared by the charts.

export interface Mark {
  viewBox: string;
  body: string;
}

export const linear =
  (d0: number, d1: number, r0: number, r1: number) =>
  (v: number): number =>
    r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

export const log =
  (d0: number, d1: number, r0: number, r1: number) =>
  (v: number): number =>
    r0 + (Math.log(v / d0) / Math.log(d1 / d0)) * (r1 - r0);

// Spread end labels so none sit closer than `gap`, keeping each near its target.
export function spread(targets: number[], gap: number, min: number, max: number): number[] {
  const order = targets.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  const ys = order.map((o) => o.y);
  for (let pass = 0; pass < 50; pass++) {
    let moved = false;
    for (let k = 1; k < ys.length; k++) {
      const overlap = gap - (ys[k] - ys[k - 1]);
      if (overlap > 0.01) {
        ys[k - 1] -= overlap / 2;
        ys[k] += overlap / 2;
        moved = true;
      }
    }
    for (let k = 0; k < ys.length; k++) ys[k] = Math.min(max, Math.max(min, ys[k]));
    if (!moved) break;
  }
  const out = new Array<number>(targets.length);
  order.forEach((o, k) => (out[o.i] = ys[k]));
  return out;
}

// Drop ticks that would sit closer than `gap` pixels to the previous kept one,
// always keeping the last.
export function thin(ticks: number[], pos: (v: number) => number, gap: number): number[] {
  const kept: number[] = [];
  for (const t of ticks) {
    if (!kept.length || pos(t) - pos(kept.at(-1)!) >= gap) kept.push(t);
  }
  const last = ticks.at(-1)!;
  if (kept.at(-1) !== last) {
    if (kept.length > 1 && pos(last) - pos(kept.at(-1)!) < gap) kept.pop();
    kept.push(last);
  }
  return kept;
}

// Length along a bar track for a fraction of the largest value. The last 4rem
// of the track stay free for the value label.
export const span = (fraction: number, extra = '0px'): string =>
  `calc((100% - 4rem) * ${fraction} + ${extra})`;

// Pointer position as percentages of `box`, for placing a Tip.
export function pointer(box: HTMLElement, e: PointerEvent): { x: number; y: number } {
  const r = box.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
}
