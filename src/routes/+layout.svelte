<script lang="ts">
	import MainLayout from '$lib/layouts/MainLayout.svelte';
	import '../app.css';
	import SvelteSeo from 'svelte-seo';
	import { DOMAIN } from '$lib/constants';

	let { children } = $props();
</script>

<SvelteSeo
	title="Leonard Cseres - Personal Portfolio"
	description="Explore my personal portfolio, showcasing projects, skills, and achievements in software engineering, development, design, and technology. Learn more about my journey and how I can help bring your ideas to life."
	canonical={DOMAIN}
	keywords="Leonard Cseres, personal portfolio, software, engineer, developer, designer, projects, achievements, skills, creative portfolio, technology, innovation, web design, development"
	themeColor="#000"
	openGraph={{
		title: 'Leonard Cseres - Personal Portfolio',
		description:
			'Explore my personal portfolio, showcasing projects, skills, and achievements in software engineering, development, design, and technology. Learn more about my journey and how I can help bring your ideas to life.',
		url: DOMAIN,
		type: 'website',
		site_name: 'Leonard Cseres Portfolio',
		images: [
			{
				url: `${DOMAIN}/opengraph-image.png`,
				width: 1200,
				height: 628,
				alt: 'Leonard Cseres - Personal Portfolio'
			}
		]
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@devleo',
		title: 'Leonard Cseres - Personal Portfolio',
		description:
			'Explore my personal portfolio, showcasing projects, skills, and achievements in software engineering, development, design, and technology. Learn more about my journey and how I can help bring your ideas to life.',
		image: `${DOMAIN}/twitter-image.png`,
		imageAlt: 'Leonard Cseres - Personal Portfolio'
	}}
/>

<!-- Umami Web Analytics -->
<svelte:head>
	{#if import.meta.env.PROD}
		<script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="2ba65529-9b41-416a-9983-6697888e6b50"
		></script>
	{/if}
</svelte:head>

<MainLayout>
	{@render children()}
</MainLayout>
