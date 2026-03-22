<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  const { class: className, ...rest }: SVGAttributes<SVGSVGElement> = $props();
</script>

<a
  href="https://opencode.ai"
  target="_blank"
  rel="noopener noreferrer"
  class="inline-block"
  aria-label="Opencode"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 234 42"
    fill="none"
    class={cn('mb-1 inline-block h-4.5 px-0.5', className)}
    {...rest}
  >
    <!-- "open" -->
    <path d="M18 30H6V18H18V30Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M18 12H6V30H18V12ZM24 36H0V6H24V36Z"
      class="fill-[#656363] dark:fill-[#B7B1B1]"
    />
    <path d="M48 30H36V18H48V30Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M36 30H48V12H36V30ZM54 36H36V42H30V6H54V36Z"
      class="fill-[#656363] dark:fill-[#B7B1B1]"
    />
    <path d="M84 24V30H66V24H84Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M84 24H66V30H84V36H60V6H84V24ZM66 18H78V12H66V18Z"
      class="fill-[#656363] dark:fill-[#B7B1B1]"
    />
    <path d="M108 36H96V18H108V36Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M108 12H96V36H90V6H108V12ZM114 36H108V12H114V36Z"
      class="fill-[#656363] dark:fill-[#B7B1B1]"
    />
    <!-- "code" -->
    <path d="M144 30H126V18H144V30Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M144 12H126V30H144V36H120V6H144V12Z"
      class="fill-[#211E1E] dark:fill-[#F1ECEC]"
    />
    <path d="M168 30H156V18H168V30Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M168 12H156V30H168V12ZM174 36H150V6H174V36Z"
      class="fill-[#211E1E] dark:fill-[#F1ECEC]"
    />
    <path d="M198 30H186V18H198V30Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M198 12H186V30H198V12ZM204 36H180V6H198V0H204V36Z"
      class="fill-[#211E1E] dark:fill-[#F1ECEC]"
    />
    <path d="M234 24V30H216V24H234Z" class="fill-[#CFCECD] dark:fill-[#4B4646]" />
    <path
      d="M216 12V18H228V12H216ZM234 24H216V30H234V36H210V6H234V24Z"
      class="fill-[#211E1E] dark:fill-[#F1ECEC]"
    />
  </svg>
</a>
