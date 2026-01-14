<script lang="ts" module>
  export interface TimelineItemProps {
    logo: string;
    title: string;
    description: string;
    date: string;
  }
</script>

<script lang="ts">
  let { logo, title, description, date }: TimelineItemProps = $props();
</script>

<div class="relative flex gap-4">
  <div class="z-10 flex h-fit justify-center bg-card px-3 py-2">
    <img src={logo} alt={title} class="size-10 object-contain" />
  </div>
  <div class="flex-1">
    {#if date}
      <div class="mb-1 text-sm text-muted/50">{date}</div>
    {/if}
    <h3 class="text-lg font-semibold">{title}</h3>
    <p class="text-muted">{description}</p>
  </div>
</div>
