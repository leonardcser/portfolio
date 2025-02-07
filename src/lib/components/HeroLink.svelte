<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import LinkArrowIcon from './icons/LinkArrowIcon.svelte';

	interface Props extends HTMLAnchorAttributes {
		title: string;
	}
	const { title, ...other }: Props = $props();
</script>

<a {...other} target="_blank" class="inline-flex items-center gap-1">
	{title}
	<LinkArrowIcon />
</a>

<style>
	/* https://tobiasahlin.com/blog/css-trick-animating-link-underlines/ */
	a {
		position: relative;
		text-decoration: none;
	}

	a::before {
		content: '';
		position: absolute;
		display: block;
		width: 100%;
		height: 1px;
		bottom: 2px;
		left: 0;
		transform: scaleX(0);
		transform-origin: top left;
		transition: transform 0.3s ease;
	}

	a:hover::before {
		transform: scaleX(1);
	}
</style>
