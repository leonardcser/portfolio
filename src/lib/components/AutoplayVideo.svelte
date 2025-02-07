<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
	}

	const { src }: Props = $props();
	let videoElement: HTMLVideoElement;
	let isLoaded = $state(false);
	let isPlaying = $state(false);

	onMount(() => {
		if (isLoaded) {
			return;
		}
		// Create source elements programmatically
		const formats = [
			{ type: 'video/mp4', ext: 'mp4' },
			{ type: 'video/ogg', ext: 'ogg' },
			{ type: 'video/webm', ext: 'webm' }
		];

		formats.forEach((format) => {
			const source = document.createElement('source');
			source.src = `${src}.${format.ext}`;
			source.type = format.type;
			videoElement.appendChild(source);
		});

		// Add event listeners before loading
		videoElement.addEventListener('canplay', () => {
			isPlaying = true;
		});

		// Load the video
		videoElement.load();
		isLoaded = true;
	});
</script>

<div class="relative">
	<!-- Skeleton loader -->
	{#if !isPlaying}
		<div
			class="absolute left-0 top-0 aspect-video h-full w-full animate-pulse bg-stone-300 dark:bg-stone-800"
		></div>
	{/if}

	<!-- Video element -->
	<video
		bind:this={videoElement}
		autoplay
		loop
		playsinline
		muted
		class="m-0 rounded border-none"
		style="opacity: {isPlaying ? '1' : '0'}"
		itemprop="video"
	></video>
</div>
