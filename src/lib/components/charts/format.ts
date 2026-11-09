// Number formatters for chart values.

export function mib(v: number): string {
  if (v === 0) return '0';
  if (v < 1) return `${Math.round(v * 1024)} KiB`;
  return `${v < 10 ? v.toFixed(1).replace(/\.0$/, '') : Math.round(v)} MiB`;
}

export function ms(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(v >= 10000 ? 0 : 1).replace(/\.0$/, '')} s`;
  if (v < 10) return `${v.toFixed(1).replace(/\.0$/, '')} ms`;
  return `${Math.round(v)} ms`;
}

export function seconds(v: number): string {
  return v < 1 ? ms(v * 1000) : `${v.toFixed(v < 10 ? 1 : 0)} s`;
}
