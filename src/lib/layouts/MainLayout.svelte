<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/nav/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<main class="container prose mx-auto min-h-screen p-6 dark:prose-invert">
	{@render children()}
	<Footer />
</main>
