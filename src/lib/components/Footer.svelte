<script lang="ts">
  import { frontmatterData } from './FrontMatter.svelte';
  import LinkTag from './LinkTag.svelte';

  const links = frontmatterData.links.value;
</script>

<footer class="flex flex-nowrap justify-center gap-2">
  {#each links as link}
    <LinkTag
      href={link.url}
      label={link.label}
      icon={link.icon}
      umamiEventPrefix={'footer-' + link.label}
    />
  {/each}
</footer>
