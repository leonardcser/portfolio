<script lang="ts" module>
  export interface TimelineItemProps {
    logo: string;
    title: string;
    description: string;
    date: string;
    logoClass?: string;
  }
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  let { logo, title, description, date, logoClass }: TimelineItemProps = $props();
</script>

<div class="grid grid-cols-[3rem_1fr] items-start gap-x-6">
  <img src={logo} alt={title} class={cn('size-12 object-contain', logoClass)} loading="lazy" />
  <div>
    {#if date}
      <div class="text-sm text-muted/50">{date}</div>
    {/if}
    <h3 class="text-base font-semibold">{title}</h3>
  </div>
  <div></div>
  <p class="text-muted">{description}</p>
</div>
