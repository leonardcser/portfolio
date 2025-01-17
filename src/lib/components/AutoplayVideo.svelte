<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		src: string;
	}

	const { src }: Props = $props();
	let videoElement: HTMLVideoElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Set the src and type only when the video is in view
					if (!videoElement.src) {
						videoElement.innerHTML = `<source src="${src}.webm" type="video/webm"  />
											      <source src="${src}.ogg" type="video/ogg" />
												  <source src="${src}.mp4" type="video/mp4" />`;
						videoElement.load(); // Trigger loading
					}
				}
			});
		});

		if (videoElement) {
			observer.observe(videoElement);
		}
	});

	onDestroy(() => {
		if (observer && videoElement) {
			observer.unobserve(videoElement);
			observer.disconnect();
		}
	});
</script>

<video bind:this={videoElement} autoplay loop playsinline muted class="m-0 rounded border-none">
	<!-- Empty initially; source will be dynamically set when in view -->
	Your browser does not support the video tag.
</video>
