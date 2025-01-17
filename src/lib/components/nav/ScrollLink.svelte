<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		toId: string;
		yOffset?: number;
		class?: string;
		ariaLabel?: string;
		children: Snippet;
	}
	const { toId, yOffset = 0, class: className = '', ariaLabel = '', children }: Props = $props();
	const href = '#' + toId;

	function handleOnClick(e: MouseEvent) {
		e.preventDefault();
		if (toId == 'hero') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
			return;
		}
		const el = document.querySelector(href);
		if (!el) return;
		const elPos = el.getBoundingClientRect().top;
		const offsetPos = elPos + window.scrollY - yOffset;

		window.scrollTo({
			top: offsetPos + 2, // for good mesures
			behavior: 'smooth'
		});
	}
</script>

<a {href} class={className} onclick={handleOnClick} aria-label={ariaLabel}>
	{@render children()}
</a>
