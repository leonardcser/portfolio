<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import ScrollLink from './ScrollLink.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		href: string;
		yOffset?: number;
		children: Snippet;
	}

	const { href, yOffset = 60, children }: Props = $props();
	const isScrollLink = href.startsWith('#');
	const toId = href.substring(1);

	let active = $state(false);

	const handleScroll = () => {
		const section = document.getElementById(toId);
		if (section) {
			const rect = section.getBoundingClientRect();
			active = rect.top <= yOffset && rect.height + rect.top - yOffset >= 0;
		}
	};

	onMount(() => {
		if (isScrollLink) {
			window.addEventListener('scroll', handleScroll);
			handleScroll();
		}

		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if isScrollLink}
	<ScrollLink
		{toId}
		{yOffset}
		class={cn(
			'text-gray-600 transition-colors hover:text-gray-400 focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500',
			active && 'text-blue-400 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-500'
		)}
	>
		{@render children()}
	</ScrollLink>
{:else}
	<a
		{href}
		class={cn(
			'text-gray-600 transition-colors hover:text-gray-400 focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500',
			active && 'text-blue-400 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-500'
		)}
	>
		{@render children()}
	</a>
{/if}
