<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.ts';

  const { class: className, ...rest }: SVGAttributes<SVGSVGElement> = $props();
</script>

<a
  href="https://pi.dev"
  target="_blank"
  rel="noopener noreferrer"
  class="inline-block"
  aria-label="pi"
>
  <span
    class={cn(
      'mb-1 inline-flex items-center gap-1 px-1 align-middle font-sans font-semibold text-primary',
      className
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="165 165 470 470"
      class="inline-block h-3.5"
      aria-hidden="true"
      {...rest}
    >
      <path fill="#F09082" d="M165.29 165.29H517.36V400H400V282.65H165.29Z" />
      <path fill="#4D9ABF" d="M165.29 282.65H282.65V400H400V517.36H282.65V634.72H165.29Z" />
      <path fill="#F1BE58" d="M517.36 400H634.72V634.72H517.36Z" />
    </svg>
    pi
  </span>
</a>
