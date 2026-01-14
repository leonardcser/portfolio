<script module lang="ts">
  import type { IconType } from 'svelte-icons-pack';

  interface Props {
    href: string;
    label: string;
    class?: string;
    icon?: IconType;
    target?: string;
    rel?: string;
    umamiEventPrefix?: string;
    active?: boolean;
    onclick?: () => void;
  }

  export type NavItemProps = Props;
</script>

<script lang="ts">
  import { cn } from '$lib/utils';
  import { Icon } from 'svelte-icons-pack';

  let {
    href,
    label,
    class: className,
    icon,
    target,
    rel,
    umamiEventPrefix,
    active = false,
    onclick,
  }: NavItemProps = $props();

  // Only use _blank for external links
  const isExternal = $derived(href.startsWith('http'));
  const finalTarget = $derived(target ?? (isExternal ? '_blank' : undefined));
  const finalRel = $derived(rel ?? (isExternal ? 'noopener noreferrer' : undefined));
</script>

<a
  {href}
  target={finalTarget}
  rel={finalRel}
  data-umami-event={umamiEventPrefix}
  {onclick}
  class={cn(
    'not-prose flex items-center gap-1.5 text-sm font-semibold transition-colors',
    active ? 'text-primary' : 'text-muted hover:text-primary',
    className
  )}
>
  {#if icon}
    <span class="md:hidden">
      <Icon src={icon} size={20} />
    </span>
    <span class="max-md:hidden">
      {label}
    </span>
  {:else}
    {label}
  {/if}
</a>
