<script module lang="ts">
  interface Props {
    href: string;
    label: string;
    class?: string;
    icon?: IconType;
    target?: string;
    rel?: string;
    umamiEventPrefix: string;
  }

  export type LinkTagProps = Props;
</script>

<script lang="ts">
  import { cn } from '$lib/utils';
  import { Icon, type IconType } from 'svelte-icons-pack';
  import { FiArrowUpRight } from 'svelte-icons-pack/fi';

  let {
    href,
    label,
    class: className,
    icon,
    target = '_blank',
    rel = 'noopener noreferrer',
    umamiEventPrefix,
  }: LinkTagProps = $props();
</script>

<a
  {href}
  {target}
  {rel}
  data-umami-event={umamiEventPrefix}
  class={cn(
    'not-prose inline-flex items-center gap-1 bg-muted/25 px-2 text-sm text-muted',
    className
  )}
>
  {#if icon}
    <Icon src={icon} className="me-1" />
  {/if}
  <span class="font-mono tracking-tight text-nowrap text-primary/75">
    {label}
  </span>
  <Icon src={FiArrowUpRight} />
</a>
