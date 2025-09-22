<script lang="ts">
  import type { Snippet } from 'svelte';
  import Tag from './Tag.svelte';
  import LinkTag, { type LinkTagProps } from './LinkTag.svelte';
  import { RiBusinessAwardFill } from 'svelte-icons-pack/ri';
  import { cn } from '$lib/utils';

  interface Props {
    title: string;
    tags: string[];
    linkTags?: Omit<LinkTagProps, 'umamiEventPrefix'>[];

    class?: string;
    contentClass?: string;
    demo: Snippet;
    demoClass?: string;
    awards?: string[];
    children: Snippet;
  }

  const {
    title,
    tags,
    linkTags,
    class: className = '',
    contentClass = '',
    demo,
    demoClass,
    awards,
    children,
  }: Props = $props();
</script>

<div class={cn('not-prose', className)} itemscope itemtype="https://schema.org/CreativeWork">
  <div class={cn('mb-4 w-fit overflow-hidden rounded', demoClass)}>
    {@render demo()}
  </div>
  <div class={contentClass}>
    <div class="flex flex-wrap gap-1">
      {#each tags as tag}
        <Tag {tag} />
      {/each}
      {#each linkTags || [] as props}
        <LinkTag {...props} umamiEventPrefix={title.toLowerCase().replaceAll(' ', '-')} />
      {/each}
      {#each awards || [] as award}
        <Tag
          tag={award}
          icon={RiBusinessAwardFill}
          class="border border-amber-500 bg-transparent text-amber-500"
        />
      {/each}
    </div>
    <div class="mt-1.5 mb-1">
      <h3 class="inline text-base font-semibold" itemprop="name">{title}</h3>
      <span class="m-0 ms-1 text-muted" itemprop="abstract">
        {@render children()}
      </span>
    </div>
  </div>
</div>
