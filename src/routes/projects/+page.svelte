<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import type { TOCItem } from '$lib/types';
  import Block from '$lib/components/Block.svelte';
  import { getAllProjects, projectCategories, computeFigureNumbers } from '$lib/data/projects';
  import { cn } from '$lib/utils';
  import ProjectSection from '$lib/components/ProjectSection.svelte';

  const allProjects = getAllProjects();
  const allProfessional = allProjects.filter((p) => p.category === 'professional');
  const allPersonal = allProjects.filter((p) => p.category === 'personal');

  // Filter to only categories that have existing projects
  const allProjectIds = new Set(allProjects.map((p) => p.id));
  const availableCategories = projectCategories
    .map((cat) => ({
      name: cat.name,
      projectIds: cat.projectIds.filter((id) => allProjectIds.has(id)),
    }))
    .filter((cat) => cat.projectIds.length > 0);

  // Reactive state for selected categories
  let selectedCategories = $state<string[]>([]);

  // Get all project IDs from selected categories (used for visibility)
  const visibleProjectIds = $derived(
    selectedCategories.length === 0
      ? undefined // undefined means all visible
      : new Set(
          availableCategories
            .filter((cat) => selectedCategories.includes(cat.name))
            .flatMap((cat) => cat.projectIds)
        )
  );

  // Filter projects based on selected categories (for counting and TOC)
  const filteredProjects = $derived(
    !visibleProjectIds ? allProjects : allProjects.filter((p) => visibleProjectIds.has(p.id))
  );

  const filteredProfessional = $derived(
    filteredProjects.filter((p) => p.category === 'professional')
  );
  const filteredPersonal = $derived(filteredProjects.filter((p) => p.category === 'personal'));

  const isFiltered = $derived(selectedCategories.length > 0);

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
  }

  function clearFilters() {
    selectedCategories = [];
  }

  // Pre-compute figure numbers for ALL projects (so numbers stay stable)
  const figureNumbers = $derived(computeFigureNumbers(allProjects));

  // TOC needs to be reactive to show filtered projects
  const tocItems: TOCItem[] = $derived([
    {
      id: 'professional-work',
      label: 'Professional Work',
      subsections: filteredProfessional.map((p) => ({ id: p.id, label: p.title })),
    },
    {
      id: 'projects',
      label: 'Projects',
      subsections: filteredPersonal.map((p) => ({ id: p.id, label: p.title })),
    },
  ]);
</script>

<svelte:head>
  <title>All Projects | Leonard Cseres</title>
</svelte:head>

<Layout {tocItems}>
  <Block>
    <h1>All Projects</h1>
    <p>
      A complete collection of my professional work and personal projects. For featured highlights,
      visit the <a href="/">homepage</a>.
    </p>

    <!-- Category Filter -->
    <div class="not-prose mt-6">
      <div class="mb-3 flex items-center gap-2">
        <span class="text-sm font-medium text-muted">Filter by category</span>
        {#if selectedCategories.length > 0}
          <span class="text-xs text-muted/70">{filteredProjects.length}/{allProjects.length}</span>
        {/if}
      </div>
      <div class="flex flex-wrap gap-1">
        {#each availableCategories as category (category.name)}
          {@const isSelected = selectedCategories.includes(category.name)}
          {@const count = category.projectIds.length}
          <button
            onclick={() => toggleCategory(category.name)}
            class={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-150',
              isSelected
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-border/50 text-muted hover:border-border hover:bg-muted/5 hover:text-primary'
            )}
          >
            <span>{category.name}</span>
            <span
              class={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] leading-none',
                isSelected ? 'bg-accent/20' : 'bg-muted/10'
              )}
            >
              {count}
            </span>
          </button>
        {/each}
        {#if selectedCategories.length > 0}
          <button
            onclick={clearFilters}
            class="cursor-pointer px-2 py-1 text-xs text-muted transition-all hover:text-primary"
          >
            Clear
          </button>
        {/if}
      </div>
    </div>
  </Block>

  <ProjectSection
    projects={allProfessional}
    sectionId="professional-work"
    sectionTitle="Professional Work"
    {figureNumbers}
    {visibleProjectIds}
  />

  <ProjectSection
    projects={allPersonal}
    sectionId="projects"
    sectionTitle="Projects"
    {figureNumbers}
    {visibleProjectIds}
    useGridLayout
    filteredMode={isFiltered}
    firstBlockPadding
  />

  {#if filteredProjects.length === 0}
    <Block>
      <p class="text-muted">No projects match the selected filters.</p>
    </Block>
  {/if}
</Layout>
