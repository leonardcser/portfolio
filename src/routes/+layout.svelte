<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { ModeWatcher } from 'mode-watcher';

  let { children } = $props();
</script>

<svelte:head>
  <title>Leonard Cseres - Personal Portfolio</title>
  <meta
    name="description"
    content="Explore my personal portfolio, showcasing projects, skills, and achievements in software engineering, development, design, and technology."
  />
  <link rel="icon" href={favicon} />
  <script
    defer
    src="https://cloud.umami.is/script.js"
    data-website-id="2ba65529-9b41-416a-9983-6697888e6b50"
  ></script>
</svelte:head>

<ModeWatcher />
{@render children?.()}
