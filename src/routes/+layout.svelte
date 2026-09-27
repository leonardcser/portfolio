<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import MediaPreview from '$lib/components/MediaPreview.svelte';
  import Header, { headerHeight } from '$lib/components/Header.svelte';
  import { onNavigate } from '$app/navigation';

  let { children } = $props();

  onNavigate((navigation) => {
    if (
      !document.startViewTransition ||
      !navigation.from?.url.pathname.startsWith('/library') ||
      !navigation.to?.url.pathname.startsWith('/library')
    )
      return;

    return new Promise<void>((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />

  <!-- RSS autodiscovery -->
  <link rel="alternate" type="application/rss+xml" title="Leonard Cseres' Blog" href="/rss.xml" />

  <!-- Umami Web Analytics -->
  {#if import.meta.env.PROD}
    <script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="2ba65529-9b41-416a-9983-6697888e6b50"
    ></script>
  {/if}
</svelte:head>

<ModeWatcher />
<MediaPreview />
<Header />
<div style:padding-top="{headerHeight}px">
  {@render children?.()}
</div>
