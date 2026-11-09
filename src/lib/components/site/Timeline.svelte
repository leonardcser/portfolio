<script lang="ts">
  import TimelineItem, { type TimelineItemProps } from './TimelineItem.svelte';

  interface Props {
    items: TimelineItemProps[];
  }

  let { items }: Props = $props();
</script>

<div class="not-prose space-y-10">
  {#each items as item (item.title)}
    <TimelineItem {...item} />
  {/each}
</div>
