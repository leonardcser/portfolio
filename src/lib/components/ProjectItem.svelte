<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ProjectDemo } from '$lib/data/projects';
  import Tag from './Tag.svelte';
  import LinkTag, { type LinkTagProps } from './LinkTag.svelte';
  import ProjectDemoComponent from './ProjectDemo.svelte';
  import { RiBusinessAwardFill } from 'svelte-icons-pack/ri';
  import { cn } from '$lib/utils';

  interface Props {
    title: string;
    tags: string[];
    linkTags?: Omit<LinkTagProps, 'umamiEventPrefix'>[];

    id?: string;
    class?: string;
    contentClass?: string;
    demo?: ProjectDemo;
    figureNumber?: number;
    demoClass?: string;
    awards?: string[];
    children: Snippet;
  }

  const {
    title,
    tags,
    linkTags,
    id,
    class: className = '',
    contentClass = '',
    demo,
    figureNumber,
    demoClass,
    awards,
    children,
  }: Props = $props();
</script>

<div {id} class={cn('not-prose', className)} itemscope itemtype="https://schema.org/CreativeWork">
  {#if demo && figureNumber !== undefined}
    <div class={cn('mb-4 w-fit overflow-hidden border border-border/50', demoClass)}>
      <ProjectDemoComponent {demo} {figureNumber} />
    </div>
  {/if}
  <div class={contentClass}>
    <div class="flex flex-wrap gap-1">
      {#each tags as tag, index (index)}
        <Tag {tag} />
      {/each}
      {#each linkTags || [] as props, index (index)}
        <LinkTag {...props} umamiEventPrefix={title.toLowerCase().replaceAll(' ', '-')} />
      {/each}
      {#each awards || [] as award, index (index)}
        <Tag
          tag={award}
          icon={RiBusinessAwardFill}
          class="border border-amber-500 bg-transparent text-amber-500"
        />
      {/each}
    </div>
    <div class="mt-1.5">
      <h3 class="inline text-base font-semibold" itemprop="name">{title}</h3>
      <span class="m-0 ms-1 text-muted" itemprop="abstract">
        {@render children()}
      </span>
    </div>
  </div>
</div>
