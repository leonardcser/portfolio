<script lang="ts">
	import Spotlight from '$lib/components/Spotlight.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import MainLayout from '$lib/layouts/MainLayout.svelte';
	import HeroSection from '$lib/sections/HeroSection.svelte';
	import StorySection from '$lib/sections/StorySection.svelte';
	import WorksSection from '$lib/sections/WorksSection.svelte';
</script>

<Spotlight />
<MainLayout>
	<HeroSection />
	<StorySection />
	<WorksSection />

	<div class="mb-72"></div>
	<hr />
	<ThemeToggle />
</MainLayout>
