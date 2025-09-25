<script lang="ts" module>
  export const headerCollapsedHeight = 68;
  export const headerHeight = headerCollapsedHeight + 24 + frontmatterHeight;
</script>

<script lang="ts">
  import FrontMatter, { frontmatterHeight } from './FrontMatter.svelte';
  import Navigation from './Navigation.svelte';
  import { headerState } from '$lib/state.svelte';
  import { scrollToTop } from '$lib/utils';

  let scrollY = $state(0);

  $effect(() => {
    scrollY = Math.max(window.scrollY, 0);
    window.addEventListener('scroll', () => {
      scrollY = Math.max(window.scrollY, 0);
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  });

  $effect(() => {
    scrollY = Math.max(window.scrollY, 0);
    if (headerHeight - scrollY < headerCollapsedHeight) {
      headerState.isCollapsed = true;
    } else {
      headerState.isCollapsed = false;
    }
  });
</script>

<div
  class="fixed top-0 right-0 left-0 z-20 flex justify-center overflow-hidden border-b border-border bg-background"
  style={`height:${Math.max(headerCollapsedHeight, headerHeight - scrollY)}px`}
>
  <div class="w-full max-w-screen-lg border-x border-border p-6 pt-0">
    <div class="flex items-center justify-between py-4" style={`height${headerCollapsedHeight}px`}>
      <button
        type="button"
        class="cursor-pointer"
        onclick={() => scrollToTop()}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
          }
        }}
        style="background: none; border: none; padding: 0;"
      >
        <h1 class="mb-0 text-3xl font-bold whitespace-nowrap">Leonard Cseres</h1>
      </button>
      <Navigation />
    </div>
    <FrontMatter />
  </div>
</div>
