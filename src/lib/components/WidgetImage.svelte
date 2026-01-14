<script lang="ts">
  import { mode } from 'mode-watcher';

  import { cn } from '$lib/utils';
  import type { HTMLAnchorAttributes, HTMLImgAttributes } from 'svelte/elements';

  type ExtendProps = Omit<HTMLAnchorAttributes, 'href'> & Omit<HTMLImgAttributes, 'src'>;

  interface Props extends ExtendProps {
    widget: {
      id: string;
      title: string;
      subtitle: string;
    };
    width?: number;
    height?: number;
    url?: boolean;
    href?: string;
  }

  const { widget, width, height = 75, url = false, href, ...rest }: Props = $props();

  const origin = 'https://memsched.com';
  const trueHref = $derived(href || `${origin}/widgets/${widget.id}`);
  const imgSrc = $derived(`${origin}/api/widgets/${widget.id}?f=svg`);
  const imgAlt = $derived(`${widget.title} - ${widget.subtitle}`);

  let loadedStatus = $state({ light: false, dark: false });
  let currentImgSrc = $derived(mode.current === 'dark' ? imgSrc + '&dark' : imgSrc);
  let isLoaded = $derived(mode.current === 'dark' ? loadedStatus.dark : loadedStatus.light);
</script>

<noscript>
  <style>
    /* Default to light theme when JS is disabled */
    .widget-image-fallback {
      opacity: 1 !important;
      display: block !important;
    }
    .widget-container-fallback {
      width: fit-content !important;
      animation: none !important;
      background: transparent !important;
    }
  </style>
</noscript>

{#snippet widgetImage(props: HTMLImgAttributes)}
  <img
    src={currentImgSrc}
    alt={imgAlt}
    style="height: {height}px;"
    {...props}
    class={cn(
      'transition-opacity duration-100',
      isLoaded ? 'opacity-100' : 'opacity-0',
      props.class
    )}
    onload={() => {
      if (mode.current === 'dark') loadedStatus.dark = true;
      else loadedStatus.light = true;
    }}
  />
{/snippet}

<div
  style:height="{height}px"
  style:width={width ? width + 'px' : '33%'}
  class={cn('widget-container-fallback', isLoaded ? 'w-fit' : 'animate-pulse bg-border/50')}
>
  {#if url || href}
    <a href={trueHref} {...rest}>
      {@render widgetImage({})}
    </a>
  {:else}
    {@render widgetImage(rest)}
  {/if}
</div>
