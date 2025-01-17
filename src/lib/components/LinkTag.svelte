<script module lang="ts">
	interface Props {
		tag: string;
		href: string;
		Icon?: Component;
	}

	export type LinkTagProps = Props;
</script>

<script lang="ts">
	import type { Component } from 'svelte';
	import LinkArrowIcon from './icons/LinkArrowIcon.svelte';

	const { tag, href, Icon }: Props = $props();
</script>

<a
	{href}
	target="_blank"
	class="flex items-center gap-1 text-nowrap rounded bg-gray-800 px-1.5 py-0.5 text-xs font-medium leading-normal text-white no-underline dark:bg-stone-50 dark:text-stone-950"
>
	<Icon />
	{tag}
	<LinkArrowIcon />
</a>
