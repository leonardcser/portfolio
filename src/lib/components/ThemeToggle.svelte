<script lang="ts">
	import { mode, toggleMode } from 'mode-watcher';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { slide } from 'svelte/transition';
	import { Icon } from 'svelte-icons-pack';
	import { IoMoon, IoSunny } from 'svelte-icons-pack/io';

	import { cn } from '$lib/utils';

	const { ...props }: HTMLButtonAttributes = $props();
</script>

<button
	{...props}
	onclick={(e) => {
		e.preventDefault();
		toggleMode();
	}}
	class={cn(props.class, 'relative flex w-fit min-w-[32px] items-center px-2 py-1.5')}
	aria-label="Toggle theme"
>
	{#if $mode === 'dark'}
		<div in:slide={{ duration: 200 }} out:slide={{ duration: 200 }} class="absolute left-[8px]">
			<Icon src={IoMoon} size={16} />
		</div>
	{:else}
		<div in:slide={{ duration: 200 }} out:slide={{ duration: 200 }} class="absolute left-[8px]">
			<Icon src={IoSunny} size={16} />
		</div>
	{/if}
</button>
