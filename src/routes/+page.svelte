<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Section from '$lib/components/Section.svelte';
  import MainScrollSheet from '$lib/components/MainScrollSheet.svelte';
</script>

<div class="relative flex min-h-screen flex-col">
  <Header />
  <MainScrollSheet>
    <Section>
      <p>Welcome to my portfolio, I'm a ML and software student based in Switzerland.</p>
      <p>
        I develop effective solutions that bring measurable results. I'm a fast learner and I'm
        always looking for new challenges.
      </p>
    </Section>
    <Section>
      <h2>Works</h2>
    </Section>
  </MainScrollSheet>
</div>
