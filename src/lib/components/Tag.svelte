<script lang="ts">
	interface Props {
		tag: string;
	}

	const { tag }: Props = $props();
</script>

<span
	class="text-nowrap rounded border border-gray-800 px-1.5 py-0.5 text-xs font-medium text-gray-800 dark:border-stone-50 dark:text-white"
>
	{tag}
</span>
