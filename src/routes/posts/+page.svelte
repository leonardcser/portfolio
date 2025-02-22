<script>
	import BackgroundLines from '$lib/components/BackgroundLines.svelte';
	import PostsList from '$lib/components/posts/PostsList.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Posts</title>
	<!-- <meta data-key="description" name="description" content={siteDescription} /> -->
</svelte:head>

<BackgroundLines />
<h1>Posts</h1>
<PostsList posts={data.posts} />

<style>
	h1 {
		margin-top: 5rem;
		font-size: 3rem;
	}
</style>
