<script lang="ts">
	import WidgetImage from '$lib/components/WidgetImage.svelte';
</script>

<section id="learning">
	<h2>What I'm Leanring Now</h2>
	<div class="not-prose flex flex-wrap gap-2">
		<!-- <WidgetImage -->
		<!-- 	widget={{ -->
		<!-- 		id: '02d23572-ad59-4ea2-8a97-ed209251f83b', -->
		<!-- 		title: 'Understanding Deep Learning', -->
		<!-- 		subtitle: 'Machine learning book' -->
		<!-- 	}} -->
		<!-- 	href="https://github.com/leonardcser/understanding-deep-learning" -->
		<!-- 	data-umami-event="understanding-deep-learning-widget-link" -->
		<!-- /> -->
		<WidgetImage
			widget={{
				id: '4fa0ef32-09d6-4038-94d8-e7caf8672c0f',
				title: 'LeetCode - Problems Solved',
				subtitle: 'Problems solved'
			}}
			height={75}
			href="https://github.com/leonardcser/leetcode"
			data-umami-event="leetcode-widget-link"
		/>
		<WidgetImage
			widget={{
				id: '77178590-1aa8-4ab4-bfbf-2c6abe0c367f',
				title: 'GitHub Commits - Public contributions',
				subtitle: 'Public contributions'
			}}
			height={75}
			href="https://github.com/leonardcser"
			data-umami-event="github-commits-widget-link"
		/>
	</div>
</section>
