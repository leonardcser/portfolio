<script lang="ts">
	import Brand from './Brand.svelte';
	import NavLink from './NavLink.svelte';
</script>

<header
	class="fixed z-50 flex h-[60px] w-full flex-wrap items-center text-sm max-xl:backdrop-blur-lg sm:flex-nowrap sm:justify-start"
>
	<nav class="mx-auto w-full max-w-[85rem] px-5 sm:flex sm:items-center sm:justify-between">
		<div class="flex w-full items-center justify-between">
			<Brand />
			<!-- 	<div class="sm:hidden"> -->
			<!-- 		<button -->
			<!-- 			type="button" -->
			<!-- 			class="hs-collapse-toggle relative flex size-7 items-center justify-center gap-x-2 text-gray-800 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" -->
			<!-- 			id="hs-navbar-example-collapse" -->
			<!-- 			aria-expanded="false" -->
			<!-- 			aria-controls="hs-navbar-example" -->
			<!-- 			aria-label="Toggle navigation" -->
			<!-- 			data-hs-collapse="#hs-navbar-example" -->
			<!-- 		> -->
			<!-- 			<svg -->
			<!-- 				class="size-4 shrink-0 hs-collapse-open:hidden" -->
			<!-- 				xmlns="http://www.w3.org/2000/svg" -->
			<!-- 				width="24" -->
			<!-- 				height="24" -->
			<!-- 				viewBox="0 0 24 24" -->
			<!-- 				fill="none" -->
			<!-- 				stroke="currentColor" -->
			<!-- 				stroke-width="2" -->
			<!-- 				stroke-linecap="round" -->
			<!-- 				stroke-linejoin="round" -->
			<!-- 				><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line -->
			<!-- 					x1="3" -->
			<!-- 					x2="21" -->
			<!-- 					y1="18" -->
			<!-- 					y2="18" -->
			<!-- 				/></svg -->
			<!-- 			> -->
			<!-- 			<svg -->
			<!-- 				class="hidden size-4 shrink-0 hs-collapse-open:block" -->
			<!-- 				xmlns="http://www.w3.org/2000/svg" -->
			<!-- 				width="24" -->
			<!-- 				height="24" -->
			<!-- 				viewBox="0 0 24 24" -->
			<!-- 				fill="none" -->
			<!-- 				stroke="currentColor" -->
			<!-- 				stroke-width="2" -->
			<!-- 				stroke-linecap="round" -->
			<!-- 				stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg -->
			<!-- 			> -->
			<!-- 			<span class="sr-only">Toggle navigation</span> -->
			<!-- 		</button> -->
			<!-- 	</div> -->
			<!-- </div> -->
			<div class="hidden overflow-hidden sm:block">
				<div
					class="mt-5 flex flex-col gap-5 font-semibold sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5"
				>
					<NavLink href="#hero">Contact</NavLink>
					<NavLink href="#about">About</NavLink>
					<NavLink href="#works">Works</NavLink>
				</div>
			</div>
		</div>
	</nav>
</header>
