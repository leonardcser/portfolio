<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<main class="container prose mx-auto p-6 dark:prose-invert">
	{@render children()}
</main>
