<script lang="ts" module>
  export const headerCompactHeight = 68;
  export const headerHeight = headerCompactHeight + 24 + frontmatterHeight;
</script>

<script lang="ts">
  import FrontMatter, { frontmatterHeight } from './FrontMatter.svelte';
  import Navigation from './Navigation.svelte';
</script>

<div class="fixed top-0 right-0 left-0 flex justify-center" style={`height:${headerHeight}px`}>
  <div class="w-full max-w-screen-lg border-x border-border p-6 pt-0">
    <div class="flex items-center justify-between py-4" style={`height${headerCompactHeight}px`}>
      <h1 class="mb-0 whitespace-nowrap">Leonard Cseres</h1>
      <Navigation />
    </div>
    <FrontMatter />
  </div>
</div>
