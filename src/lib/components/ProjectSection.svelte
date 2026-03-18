<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Project } from '$lib/data/projects';
  import { cn } from '$lib/utils';
  import Block from './Block.svelte';
  import ProjectItem from './ProjectItem.svelte';

  interface Props {
    projects: Project[];
    sectionId: string;
    sectionTitle: string;
    figureNumbers: Map<string, number>;
    /** Use grid layout based on GridConfig (personal projects) vs custom layout (professional) */
    useGridLayout?: boolean;
    /** Add top padding to first block */
    firstBlockPadding?: boolean;
    /** Set of visible project IDs for filtering */
    visibleProjectIds?: Set<string>;
    /** Optional footer content rendered in a Block at the end of the section */
    children?: Snippet;
  }

  const {
    projects,
    sectionId,
    sectionTitle,
    figureNumbers,
    useGridLayout = false,
    firstBlockPadding = false,
    visibleProjectIds,
    children,
  }: Props = $props();

  // Filter projects based on visibility
  const filteredProjects = $derived(
    visibleProjectIds ? projects.filter((p) => visibleProjectIds.has(p.id)) : projects
  );

  // Group projects into rows based on span (for grid layout)
  function groupIntoRows(projects: Project[]): Project[][] {
    const rows: Project[][] = [];
    let currentRow: Project[] = [];
    let currentSpan = 0;

    for (const project of projects) {
      const span = project.grid?.span === 1 ? 1 : 2;

      if (currentSpan + span > 2) {
        // Start new row
        if (currentRow.length > 0) rows.push(currentRow);
        currentRow = [project];
        currentSpan = span;
      } else {
        currentRow.push(project);
        currentSpan += span;
      }

      if (currentSpan === 2) {
        rows.push(currentRow);
        currentRow = [];
        currentSpan = 0;
      }
    }

    if (currentRow.length > 0) rows.push(currentRow);
    return rows;
  }

  const projectRows = $derived(useGridLayout ? groupIntoRows(filteredProjects) : null);
</script>

<section class="*:border-b">
  {#if useGridLayout && projectRows}
    <!-- Grid layout mode (personal projects) - rows with dividers -->
    <Block class={firstBlockPadding ? 'pt-12' : undefined}>
      <h2 id={sectionId}>{sectionTitle}</h2>
      <div class="divide-y divide-dashed divide-border">
        {#each projectRows as row, rowIndex (rowIndex)}
          <div
            class={cn(
              'max-md:space-y-6 md:grid md:grid-cols-2 md:gap-6',
              rowIndex > 0 && 'pt-6',
              rowIndex < projectRows.length - 1 && 'pb-6'
            )}
          >
            {#each row as project (project.id)}
              {@const isHalfWidth = project.grid?.span === 1}
              <ProjectItem
                id={project.id}
                title={project.title}
                tags={project.tags}
                linkTags={project.linkTags}
                awards={project.awards}
                demo={project.demo}
                figureNumber={figureNumbers.get(project.id)}
                class={cn(!isHalfWidth && 'sm:col-span-2', project.layout?.class)}
                demoClass={project.layout?.demoClass}
                contentClass={project.layout?.contentClass}
              >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html project.description}
              </ProjectItem>
            {/each}
          </div>
        {/each}
      </div>
    </Block>
  {:else}
    <!-- Custom layout mode (professional projects) -->
    {#each filteredProjects as project, index (project.id)}
      <Block>
        {#if index === 0}
          <h2 id={sectionId}>{sectionTitle}</h2>
        {/if}
        <ProjectItem
          id={project.id}
          title={project.title}
          tags={project.tags}
          linkTags={project.linkTags}
          awards={project.awards}
          demo={project.demo}
          figureNumber={figureNumbers.get(project.id)}
          class={project.layout?.class}
          demoClass={project.layout?.demoClass}
          contentClass={project.layout?.contentClass}
        >
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html project.description}
        </ProjectItem>
      </Block>
    {/each}
  {/if}
  {#if children}
    <Block>
      {@render children()}
    </Block>
  {/if}
</section>
