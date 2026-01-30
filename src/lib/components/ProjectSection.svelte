<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Project } from '$lib/data/projects';
  import { groupByGridRow, groupFilteredProjects } from '$lib/data/projects';
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

  // When filtering is active, re-group to pair visible projects together
  // When no filter, use original groupByGridRow for stable layout
  const projectGroups = $derived(
    useGridLayout
      ? visibleProjectIds
        ? groupFilteredProjects(filteredProjects)
        : groupByGridRow(projects)
      : null
  );
</script>

<section class="*:border-b">
  {#if useGridLayout && projectGroups}
    <!-- Grid layout mode (personal projects) -->
    {#each projectGroups as group, groupIndex (group.gridRow ?? `single-${groupIndex}`)}
      <Block class={groupIndex === 0 && firstBlockPadding ? 'pt-12' : undefined}>
        {#if groupIndex === 0}
          <h2 id={sectionId}>{sectionTitle}</h2>
        {/if}

        {#if group.gridRow && group.projects.length > 1}
          <!-- Grid row with multiple projects -->
          <!-- When filtering, always use 2-col grid; otherwise respect original grid config -->
          {@const isFiltered = !!visibleProjectIds}
          {@const gridCols = isFiltered ? 2 : (group.projects[0].grid?.cols ?? 2)}
          <div
            class={cn(
              'max-sm:space-y-6 sm:grid sm:gap-6',
              gridCols === 5 ? 'sm:grid-cols-5' : 'sm:grid-cols-2'
            )}
          >
            {#each group.projects as project (project.id)}
              {@const colSpan = isFiltered ? 1 : (project.grid?.span ?? 1)}
              <!-- col-span-2 col-span-3 - explicit classes for Tailwind JIT -->
              <ProjectItem
                id={project.id}
                title={project.title}
                tags={project.tags}
                linkTags={project.linkTags}
                awards={project.awards}
                demo={project.demo}
                figureNumber={figureNumbers.get(project.id)}
                class={colSpan === 3 ? 'sm:col-span-3' : colSpan === 2 ? 'sm:col-span-2' : undefined}
              >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html project.description}
              </ProjectItem>
            {/each}
          </div>
        {:else}
          <!-- Single project (full width) -->
          {#each group.projects as project (project.id)}
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
          {/each}
        {/if}
      </Block>
    {/each}
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
