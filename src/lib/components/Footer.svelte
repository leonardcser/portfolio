<script lang="ts">
  import { scrollToTop } from '$lib/utils';
  import { Icon } from 'svelte-icons-pack';
  import { FiArrowUp } from 'svelte-icons-pack/fi';
</script>

<footer class="flex flex-nowrap justify-center gap-2">
  <a
    href="#top"
    onclick={(e) => {
      e.preventDefault();
      scrollToTop();
    }}
    class="flex items-center gap-1 text-sm text-muted no-underline! transition-colors hover:text-primary"
  >
    Back to top
    <Icon src={FiArrowUp} />
  </a>
</footer>
