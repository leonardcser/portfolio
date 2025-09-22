<script lang="ts">
  import { cn } from '$lib/utils';
  import { Icon, type IconType } from 'svelte-icons-pack';

  interface Props {
    tag: string;
    icon?: IconType;
    class?: string;
  }

  const { tag, icon, class: className }: Props = $props();
</script>

<span
  class={cn(
    'inline-flex items-center bg-accent/20 px-1.5 font-mono text-sm font-medium tracking-tight text-nowrap text-accent',
    className
  )}
>
  {#if icon}
    <Icon src={icon} className="me-1.5" />
  {/if}
  {tag}
</span>
