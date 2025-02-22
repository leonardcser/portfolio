<script lang="ts">
	let { posts = [] } = $props();
</script>

<ul class="posts-list">
	{#each posts as post}
		<li class="flex gap-4">
			<div class="whitespace-nowrap text-stone-400">{post.date}</div>
			<div>
				<a href="/posts/{post.slug}">
					<h2 class="m-0 text-xl font-semibold">
						{post.title}
					</h2>
				</a>
				<!-- <p class="my-1">{post.description}</p> -->
			</div>
		</li>
	{/each}
</ul>
