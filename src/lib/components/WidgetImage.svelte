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

  let loadedLight = $state(false);
  let loadedDark = $state(false);
  let loaded = $derived(
    (mode.current == 'dark' && loadedDark) || (mode.current == 'light' && loadedLight)
  );
</script>

{#snippet widgetImage(props: HTMLImgAttributes)}
  <img
    src={imgSrc}
    alt={imgAlt}
    style="height: {height}px;"
    {...props}
    class={cn(
      'transition-opacity duration-100',
      loadedLight ? 'opacity-100' : 'opacity-0',
      mode.current === 'light' ? '' : 'hidden',
      props.class
    )}
    onload={() => (loadedLight = true)}
  />
  <img
    src={imgSrc + '&dark'}
    alt={imgAlt}
    style="height: {height}px;"
    {...props}
    class={cn(
      'transition-opacity duration-100',
      loadedDark ? 'opacity-100' : 'opacity-0',
      mode.current === 'dark' ? '' : 'hidden',
      props.class
    )}
    onload={() => (loadedDark = true)}
  />
{/snippet}

<div
  style:height="{height}px"
  style:width={width ? width + 'px' : '33%'}
  class={cn(loaded ? 'w-fit' : 'animate-pulse bg-border/50')}
>
  {#if url || href}
    <a href={trueHref} {...rest}>
      {@render widgetImage({})}
    </a>
  {:else}
    {@render widgetImage(rest)}
  {/if}
</div>
