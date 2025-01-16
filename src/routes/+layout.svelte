<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import '../app.css';
	let { children } = $props();

	afterNavigate(() => {
		// @ts-ignore
		window.HSStaticMethods.autoInit();
	});
</script>

{@render children()}
