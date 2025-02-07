<script>
	import HeroLink from '$lib/components/HeroLink.svelte';
</script>

<section
	id="hero"
	class="flex h-screen items-center"
	itemscope
	itemtype="https://schema.org/Person"
>
	<div>
		<h1 class="mb-1 inline-block font-sans text-4xl">
			My name is <span itemprop="name">Leonard Cseres</span>,<br />I'm a ML and software student<br
			/>based in Switzerland
		</h1>
		<small
			class="block text-base font-bold uppercase tracking-wider text-stone-400/75"
			itemprop="jobTitle"
		>
			Software Engineer
		</small>
		<small
			class="block text-base font-bold uppercase tracking-wider text-stone-400/75"
			itemprop="jobTitle"
		>
			Data Scientist
		</small>
		<p class="text-3xl font-medium text-blue-400" itemprop="description">
			I develop effective solutions that bring measurable results.
		</p>
		<div class="font-xl not-prose flex gap-6 font-semibold">
			<HeroLink title="GitHub" href="https://github.com/leonardcser" itemprop="sameAs" />
			<HeroLink
				title="Linkedin"
				href="https://www.linkedin.com/in/leonardcsrs/"
				itemprop="sameAs"
			/>
			<HeroLink title="Mail" href="mailto:leonard.cseres@devleo.ch" itemprop="email" />
		</div>
	</div>
</section>
