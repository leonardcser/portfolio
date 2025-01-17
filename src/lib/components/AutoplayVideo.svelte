<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
	}

	const { src }: Props = $props();
	let videoElement: HTMLVideoElement;
	let observer: IntersectionObserver;
	let isLoaded = $state(false);
	let isPlaying = $state(false);

	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !isLoaded) {
					// Create source elements programmatically
					const formats = [
						{ type: 'video/webm', ext: 'webm' },
						{ type: 'video/ogg', ext: 'ogg' },
						{ type: 'video/mp4', ext: 'mp4' }
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

					videoElement.addEventListener('error', (e) => {
						console.error('Video loading error:', e);
					});

					// Load the video
					videoElement.load();
					isLoaded = true;

					// Unobserve once loaded
					observer.unobserve(videoElement);
				}
			});
		});

		if (videoElement) {
			observer.observe(videoElement);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
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
	></video>
</div>
