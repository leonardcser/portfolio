<script>
	import TimelineItem from './TimelineItem.svelte';
</script>

<!-- Timeline -->
<div class="not-prose">
	<TimelineItem
		date="2023 - Present"
		title="HEIG-VD"
		description="I am currently studying at HEIG-VD in order to deepen my knowledge in machine learning. I am also working as a student assistant working on various ML and MLOps projects."
		itemscope
		itemtype="https://schema.org/EducationalOrganization"
	>
		{#snippet icon()}
			<img src="/images/logo_heig-vd.png" alt="Heig-vd logo" itemprop="image" />
		{/snippet}
	</TimelineItem>

	<TimelineItem
		date="2021 - 2023"
		title="Scrapeout"
		description="A data analytics company I founded focused on fraud prevention and detecting conflicts of interest. I was able to learn about real life entrepreneurship and manage challenges along the business growth."
		itemscope
		itemtype="https://schema.org/Organization"
	>
		{#snippet icon()}
			<img src="/images/logo_scrapeout.png" alt="Scrapeout logo" class="p-1" itemprop="image" />
		{/snippet}
	</TimelineItem>

	<TimelineItem
		date="2021 - 2023"
		title="EPFL Entrepeneur Club"
		description="During my studies, I was a member of the EPFL Entrepreneur Club where I was able to learn from and collaborate with other entrepreneurs."
		itemscope
		itemtype="https://schema.org/Organization"
	>
		{#snippet icon()}
			<img
				src="/images/logo_epflentrepreneurclub.png"
				alt="Entrepreneur club association logo"
				class="p-1"
				itemprop="image"
			/>
		{/snippet}
	</TimelineItem>

	<TimelineItem
		date="2020 - 2023"
		title="Ecole Polytechnique Fédérale de Lausanne"
		description="I discoved my passion for computer science here at EPFL. I studied Java OOP programming and numerical analysis."
		itemscope
		itemtype="https://schema.org/EducationalOrganization"
	>
		{#snippet icon()}
			<img src="/images/logo_epfl.png" alt="EPFL logo" itemprop="image" />
		{/snippet}
	</TimelineItem>
</div>
<!-- End Timeline -->
