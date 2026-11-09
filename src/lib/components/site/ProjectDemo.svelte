<script lang="ts">
  import type { ProjectDemo } from '#lib/data/projects.ts';
  import Image from '#lib/components/ui/Image.svelte';
  import AutoplayVideo from '#lib/components/ui/AutoplayVideo.svelte';

  interface Props {
    demo: ProjectDemo;
    figureNumber: number;
  }

  const { demo, figureNumber }: Props = $props();
</script>

{#if demo.type === 'image'}
  <Image src={demo.src} description={demo.description} {figureNumber} class={demo.class} />
{:else}
  <AutoplayVideo src={demo.src} description={demo.description} {figureNumber} class={demo.class} />
{/if}
