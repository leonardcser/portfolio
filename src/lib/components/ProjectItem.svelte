<script lang="ts">
	import type { Snippet } from 'svelte';
	import Tag from './Tag.svelte';
	import LinkTag, { type LinkTagProps } from './LinkTag.svelte';

	interface Props {
		title: string;
		tags: string[];
		linkTags?: LinkTagProps[];

		class?: string;
		demo: Snippet;
		awards?: Snippet;
		children: Snippet;
	}

	const { title, tags, linkTags, class: className = '', demo, awards, children }: Props = $props();
</script>

<div class={'h-fit ' + className}>
	<div class="overflow-hidden rounded">{@render demo()}</div>
	<div class="mt-[-1px] w-full py-3">
		<div class="mb-2 mt-1 flex flex-wrap gap-1">
			{#each tags as tag}
				<Tag {tag} />
			{/each}
			{#each linkTags || [] as props}
				<LinkTag {...props} />
			{/each}
		</div>
		<h3 class="mt-1">{title}</h3>
		<p class="mb-3 mt-0 text-sm">
			{@render children()}
		</p>
		<div class="flex gap-4">
			{@render awards?.()}
		</div>
	</div>
</div>
