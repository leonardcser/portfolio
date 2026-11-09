<script lang="ts">
  interface Props {
    label: string;
    tone: 'accent' | 'gray';
  }

  let { label, tone }: Props = $props();
</script>

<span class="inline-flex items-center gap-1.5">
  <i class="inline-block size-2.5 {tone === 'accent' ? 'bg-accent' : 'bg-muted'}"></i>
  {label}
</span>
