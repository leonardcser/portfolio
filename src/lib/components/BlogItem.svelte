<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    title: string;
    description: string;
    date: string;
    slug: string;
    class?: string;
  }

  const { title, description, date, slug, class: className = '' }: Props = $props();

  const formattedDate = $derived(
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  );
</script>

<a
  href="/blog/{slug}"
  class={cn(
    'group relative grid grid-cols-1 no-underline transition-colors sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-x-4',
    className
  )}
>
  <time
    datetime={date}
    class="order-first flex items-center text-sm text-muted tabular-nums sm:col-span-1"
  >
    {formattedDate}
  </time>

  <div class="sm:col-span-1">
    <h2
      class="mt-0 mb-1 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent"
    >
      {title}
    </h2>
    <p class="text-base leading-relaxed text-muted">
      {description}
    </p>
  </div>
</a>
