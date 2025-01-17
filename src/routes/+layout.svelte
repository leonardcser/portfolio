<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import MainLayout from '$lib/layouts/MainLayout.svelte';
	import '../app.css';
	let { children } = $props();

	afterNavigate(() => {
		// @ts-ignore
		window.HSStaticMethods.autoInit();
	});
</script>

<MainLayout>
	{@render children()}
</MainLayout>
