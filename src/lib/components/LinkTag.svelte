<script module lang="ts">
	interface Props {
		tag: string;
		href: string;
		umamiEventPrefix: string;
		Icon?: Component;
	}

	export type LinkTagProps = Props;
</script>

<script lang="ts">
	import type { Component } from 'svelte';
	import LinkArrowIcon from './icons/LinkArrowIcon.svelte';

	const { tag, href, umamiEventPrefix, Icon }: Props = $props();

	const umamiEvent = umamiEventPrefix + '-' + tag.toLowerCase().replaceAll(' ', '-') + '-link';
</script>

<a
	{href}
	target="_blank"
	class="flex items-center gap-1 text-nowrap rounded bg-gray-800 px-1.5 py-0.5 text-xs font-medium leading-normal text-white no-underline dark:bg-stone-50 dark:text-stone-950"
	data-umami-event={umamiEvent}
>
	<Icon />
	{tag}
	<LinkArrowIcon />
</a>
