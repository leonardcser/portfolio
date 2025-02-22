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
			<div class="hidden overflow-hidden sm:block">
				<div
					class="mt-5 flex flex-col gap-5 font-semibold sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5"
				>
					<NavLink href="/">Contact</NavLink>
					<NavLink href="/#works">Works</NavLink>
					<NavLink href="/certs">Certifications</NavLink>
					<NavLink href="/posts">Posts</NavLink>
				</div>
			</div>
		</div>
	</nav>
</header>
