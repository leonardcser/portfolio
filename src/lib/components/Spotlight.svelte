<script lang="ts">
	import BackgroundLines from './BackgroundLines.svelte';

	interface Props {
		gradient?: 'default' | 'scrapeout';
	}
	const { gradient = 'default' }: Props = $props();
</script>

<BackgroundLines />
<div class="absolute left-0 top-0 -z-10 flex w-screen justify-center overflow-hidden">
	<div class={'spotlight spotlight-' + gradient}></div>
</div>

<style>
	:global(.spotlight) {
		height: 130vh;
		width: 130vw;
		opacity: 0.75;
	}

	:global(.spotlight-default) {
		background: radial-gradient(
			circle at center -40%,
			theme('colors.blue.400') 0%,
			rgb(from theme('colors.blue.600') r g b / 30%) 50%,
			transparent 75%
		);
	}
	:global(.spotlight-scrapeout) {
		background: radial-gradient(
			circle at center -40%,
			theme('colors.purple.400') 0%,
			rgb(from theme('colors.blue.600') r g b / 30%) 50%,
			transparent 75%
		);
	}
</style>
