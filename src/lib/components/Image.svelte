<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    src: string;
    alt: string;
    class?: string;
  }

  const { src, alt, class: className = '' }: Props = $props();
</script>

<enhanced:img
  loading="lazy"
  fetchpriority="low"
  {src}
  {alt}
  class={cn('m-0', className)}
  itemprop="image"
/>
