<script lang="ts">
  import type { ProjectDemo } from '$lib/data/projects';
  import Image from './Image.svelte';
  import AutoplayVideo from './AutoplayVideo.svelte';

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
