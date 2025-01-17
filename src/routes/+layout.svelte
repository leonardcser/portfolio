<script lang="ts">
	import MainLayout from '$lib/layouts/MainLayout.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<MainLayout>
	{@render children()}
</MainLayout>
