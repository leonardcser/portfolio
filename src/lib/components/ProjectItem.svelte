<script lang="ts">
	import type { Snippet } from 'svelte';
	import Tag from './Tag.svelte';
	import LinkTag, { type LinkTagProps } from './LinkTag.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		title: string;
		tags: string[];
		linkTags?: Omit<LinkTagProps, 'umamiEventPrefix'>[];

		class?: string;
		demo: Snippet;
		awards?: Snippet;
		children: Snippet;
	}

	const { title, tags, linkTags, class: className = '', demo, awards, children }: Props = $props();
</script>

<div class={cn('h-fit ', className)} itemscope itemtype="https://schema.org/CreativeWork">
	<div class="overflow-hidden rounded border dark:border-stone-700">{@render demo()}</div>
	<div class="mt-[-1px] w-full py-3">
		<div class="mb-2 mt-1 flex flex-wrap gap-1">
			{#each tags as tag}
				<Tag {tag} />
			{/each}
			{#each linkTags || [] as props}
				<LinkTag {...props} umamiEventPrefix={title.toLowerCase().replaceAll(' ', '-')} />
			{/each}
		</div>
		<h3 class="mt-1" itemprop="name">{title}</h3>
		<p class="mb-3 mt-0 text-sm" itemprop="abstract">
			{@render children()}
		</p>
		<div class="flex gap-4">
			{@render awards?.()}
		</div>
	</div>
</div>
