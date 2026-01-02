<script lang="ts">
  import { mode, toggleMode } from 'mode-watcher';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { slide } from 'svelte/transition';
  import { Icon } from 'svelte-icons-pack';
  import { IoMoon, IoSunny } from 'svelte-icons-pack/io';

  import { cn } from '$lib/utils';

  const { ...props }: HTMLButtonAttributes = $props();
</script>

<noscript>
  <style>
    .theme-toggle-wrapper {
      display: none !important;
    }
  </style>
</noscript>

<button
  {...props}
  onclick={(e) => {
    e.preventDefault();
    toggleMode();
  }}
  class={cn(props.class, 'theme-toggle-wrapper relative mb-1 flex w-fit min-w-8 items-center p-2')}
  aria-label="Toggle theme"
>
  {#if mode.current === 'dark'}
    <div in:slide={{ duration: 200 }} out:slide={{ duration: 200 }} class="absolute left-2">
      <Icon src={IoMoon} size={16} />
    </div>
  {:else}
    <div in:slide={{ duration: 200 }} out:slide={{ duration: 200 }} class="absolute left-2">
      <Icon src={IoSunny} size={16} />
    </div>
  {/if}
</button>
