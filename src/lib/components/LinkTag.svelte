<script lang="ts">
  import { cn } from '$lib/utils';
  import { Icon, type IconType } from 'svelte-icons-pack';
  import { FiArrowUpRight } from 'svelte-icons-pack/fi';

  interface Props {
    href: string;
    label: string;
    class?: string;
    icon?: IconType;
    target?: string;
    rel?: string;
  }

  let {
    href,
    label,
    class: className,
    icon,
    target = '_blank',
    rel = 'noopener noreferrer',
  }: Props = $props();
</script>

<a
  {href}
  {target}
  {rel}
  class={cn('inline-flex items-center gap-1 bg-muted/25 px-2 text-sm text-muted', className)}
>
  {#if icon}
    <Icon src={icon} className="me-1" />
  {/if}
  <span class="text-primary">
    {label}
  </span>
  <Icon src={FiArrowUpRight} />
</a>

