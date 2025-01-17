<script>
	import HeroLink from '$lib/components/HeroLink.svelte';
</script>

<div class="flex h-screen items-center">
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
			<HeroLink title="GitHub" href="https://github.com/leonardcser" />
			<HeroLink title="Linkedin" href="https://www.linkedin.com/in/leonardcsrs/" />
			<HeroLink title="Mail" href="mailto:leonard.cseres@devleo.ch" />
		</div>
	</div>
</div>
