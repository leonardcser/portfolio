<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.ts';

  const { class: className, ...rest }: SVGAttributes<SVGSVGElement> = $props();
</script>

<a
  href="https://omp.sh"
  target="_blank"
  rel="noopener noreferrer"
  class="inline-block"
  aria-label="omp"
>
  <span
    class={cn(
      'mb-1 inline-flex items-center gap-1 px-1 align-middle font-sans font-semibold text-primary',
      className
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="10 13 44 44"
      class="inline-block h-3.5"
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id="omp-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f84fcc" />
          <stop offset=".5" stop-color="#9362f4" />
          <stop offset="1" stop-color="#00dbe4" />
        </linearGradient>
      </defs>
      <path fill="url(#omp-gradient)" d="M10 14h44v9H43v33h-9V23h-9v22h-9V23H10z" />
    </svg>
    omp
  </span>
</a>
