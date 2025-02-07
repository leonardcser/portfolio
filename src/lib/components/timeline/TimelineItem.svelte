<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		icon: Snippet;
		date: string;
		title: string;
		description: string;
		points?: string[];
		card?: {
			title: string;
			description: string;
			url: string;
			imageUrl: string;
			alt: string;
		};
	}

	let { icon, date, title, description, points, card, ...other }: Props = $props();
</script>

<div class="group relative flex gap-x-5" {...other}>
	<!-- Icon -->
	<div
		class="relative after:absolute after:bottom-2 after:start-3 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 group-last:after:hidden dark:after:bg-neutral-700"
	>
		<div class="relative z-10 flex size-8 items-center justify-center">
			{@render icon()}
		</div>
	</div>
	<!-- End Icon -->

	<!-- Right Content -->
	<div class="grow pb-8 group-last:pb-0">
		<small class="mb-1 text-xs text-stone-600 dark:text-stone-400">{date}</small>

		<h3 itemprop="name">{title}</h3>

		<p class="text-sm">
			{description}
		</p>

		<ul class="ms-6 mt-3 list-disc space-y-1.5 text-stone-600 dark:text-stone-400">
			{#each points || [] as point}
				<li class="ps-1 text-sm">
					{point}
				</li>
			{/each}
		</ul>

		{#if card}
			<div class="mt-3">
				<!-- Card -->
				<a
					class="block rounded-lg border border-gray-200 hover:shadow-sm focus:outline-none dark:border-neutral-700"
					href={card.url}
				>
					<div class="relative flex items-center overflow-hidden">
						<enhanced:img
							class="absolute inset-0 h-full w-32 rounded-s-lg object-cover sm:w-48"
							loading="lazy"
							fetchpriority="low"
							src={card.imageUrl}
							alt={card.alt}
						/>

						<div class="ms-32 grow p-4 sm:ms-48">
							<div class="flex min-h-24 flex-col justify-center">
								<h3 class="text-sm font-semibold text-stone-800 dark:text-stone-300">
									{card.title}
								</h3>
								<p class="mt-1 text-sm">
									{card.description}
								</p>
							</div>
						</div>
					</div>
				</a>
				<!-- End Card -->
			</div>
		{/if}
	</div>
	<!-- End Right Content -->
</div>
