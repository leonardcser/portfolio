<script lang="ts">
	import { onMount } from 'svelte';

	const { src, type = 'video/mp4' } = $props();
	let videoElement: HTMLVideoElement;

	onMount(() => {
		if (videoElement) {
			videoElement.addEventListener('loadedmetadata', () => {
				videoElement.play().catch(() => {
					// silently ignore
				});
			});
		}
	});
</script>

<video bind:this={videoElement} autoplay loop playsinline muted class="m-0 rounded border-none">
	<source {src} {type} />
	Your browser does not support the video tag.
</video>
