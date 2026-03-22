<script lang="ts">
  import type { PostMeta } from '$lib/types';

  let { post }: { post: PostMeta } = $props();

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
</script>

<a
  href="/blog/{post.slug}"
  class="group -mx-3 grid grid-cols-[4rem_1fr] gap-x-4 rounded-lg p-3 transition-colors hover:bg-border/20 sm:gap-x-6"
>
  <time datetime={post.date} class="shrink-0 text-sm leading-snug text-muted tabular-nums">
    {formatDate(post.date)}
  </time>
  <h3 class="leading-snug font-semibold text-primary transition-colors group-hover:text-accent">
    {post.title}
  </h3>
  <div></div>
  <div>
    <div class="mt-1 text-sm text-muted">
      {post.description}
    </div>
    <div class="mt-2 flex flex-wrap gap-1.5">
      {#each post.tags as tag (tag)}
        <span class="rounded-full border border-border bg-card px-2 py-0.5 text-xs text-muted">
          {tag}
        </span>
      {/each}
    </div>
  </div>
</a>
