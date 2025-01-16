<script lang="ts">
	import Spotlight from '$lib/components/Spotlight.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import MainLayout from '$lib/layouts/MainLayout.svelte';
</script>

<Spotlight />
<MainLayout>
	<div class="flex h-screen items-center max-sm:justify-center max-sm:text-center">
		<div>
			<h1 class="mb-1 inline-block font-sans text-4xl">
				My name is Leonard Cseres,<br />I'm a ML and software student<br />based in Switzerland
			</h1>
			<small class="block text-base font-bold uppercase tracking-wider text-stone-400/75"
				>Software Engineer</small
			>
			<small class="block text-base font-bold uppercase tracking-wider text-stone-400/75"
				>Data Scientist</small
			>
			<p class="text-3xl font-medium text-blue-400">
				I develop effective solutions that bring mesurable results.
			</p>
			<div class="font-xl not-prose flex gap-6 font-semibold">
				<a>Github</a>
				<a>Linkedin</a>
				<a>Mail</a>
			</div>
		</div>
	</div>
	<h2>My Story</h2>
	<p>
		I'm a tech-savvy entrepreneur focused on solving real-world problems. With skills in UI/UX
		design, data analytics, software, and web development, combined with a business mindset, I turn
		ideas into practical solutions.
	</p>
	<Timeline />

	<h2>Projects</h2>
	<ThemeToggle />
</MainLayout>
