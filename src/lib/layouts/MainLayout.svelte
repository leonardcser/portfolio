<script lang="ts">
	let { children } = $props();
</script>

<main class="container prose mx-auto p-6 dark:prose-invert">
	{@render children()}
</main>
