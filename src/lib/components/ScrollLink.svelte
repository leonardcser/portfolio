<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		toId: string;
		yOffset: number;
		class?: string;
		children: Snippet;
	}
	const { toId, yOffset, class: className = '', children }: Props = $props();
	const href = '#' + toId;

	function handleOnClick(e: MouseEvent) {
		e.preventDefault();
		const el = document.querySelector(href);
		if (!el) return;
		const elPos = el.getBoundingClientRect().top;
		const offsetPos = elPos + window.scrollY - yOffset;

		window.scrollTo({
			top: offsetPos + 2, // +2 for good mesures
			behavior: 'smooth'
		});
	}
</script>

<a {href} class={className} onclick={handleOnClick}>
	{@render children()}
</a>
