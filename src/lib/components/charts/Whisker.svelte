<script lang="ts">
  interface Props {
    // Ends of the whisker, as CSS lengths from the left of the bar track.
    from: string;
    to: string;
  }

  let { from, to }: Props = $props();
</script>

<span
  class="pointer-events-none absolute top-1/2 h-2.5 -translate-y-1/2 border-x border-primary/70"
  style:left={from}
  style:width="calc({to} - {from})"
  aria-hidden="true"
>
  <span class="absolute inset-x-0 top-1/2 h-px bg-primary/70"></span>
</span>
