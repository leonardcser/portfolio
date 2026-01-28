<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Project } from '$lib/data/projects';
  import { groupByGridRow } from '$lib/data/projects';
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
    /** Set of visible project IDs for CSS-based filtering (keeps DOM elements for caching) */
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

  // Check visibility inline - all visible if no filter set
  function isVisible(projectId: string): boolean {
    return !visibleProjectIds || visibleProjectIds.has(projectId);
  }

  // Compute groups based on ALL projects (stable DOM structure)
  // This runs once per projects array, not per filter change
  const projectGroups = $derived(useGridLayout ? groupByGridRow(projects) : null);
</script>

<section class="*:border-b">
  {#if useGridLayout && projectGroups}
    <!-- Grid layout mode (personal projects) -->
    {#each projectGroups as group, groupIndex (group.gridRow ?? `single-${groupIndex}`)}
      {@const groupHasVisible = group.projects.some((p) => isVisible(p.id))}
      <Block
        class={cn(
          groupIndex === 0 && firstBlockPadding ? 'pt-12' : '',
          !groupHasVisible && 'filter-hidden'
        )}
      >
        {#if groupIndex === 0}
          <h2 id={sectionId}>{sectionTitle}</h2>
        {/if}

        {#if group.gridRow && group.projects.length > 1}
          <!-- Grid row with multiple projects -->
          {@const gridCols = group.projects[0].grid?.cols ?? 2}
          <div
            class={cn(
              'max-sm:space-y-6 sm:grid sm:gap-6',
              gridCols === 5 ? 'grid-cols-5' : 'grid-cols-2'
            )}
          >
            {#each group.projects as project (project.id)}
              {@const colSpan = project.grid?.span ?? 1}
              {@const visible = isVisible(project.id)}
              <!-- col-span-2 col-span-3 - explicit classes for Tailwind JIT -->
              <ProjectItem
                id={project.id}
                title={project.title}
                tags={project.tags}
                linkTags={project.linkTags}
                awards={project.awards}
                demo={project.demo}
                figureNumber={figureNumbers.get(project.id)}
                class={cn(
                  colSpan === 3 ? 'col-span-3' : colSpan === 2 ? 'col-span-2' : undefined,
                  !visible && 'filter-hidden'
                )}
              >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html project.description}
              </ProjectItem>
            {/each}
          </div>
        {:else}
          <!-- Single project (full width) -->
          {#each group.projects as project (project.id)}
            {@const visible = isVisible(project.id)}
            <ProjectItem
              id={project.id}
              title={project.title}
              tags={project.tags}
              linkTags={project.linkTags}
              awards={project.awards}
              demo={project.demo}
              figureNumber={figureNumbers.get(project.id)}
              class={cn(project.layout?.class, !visible && 'filter-hidden')}
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
    {#each projects as project, index (project.id)}
      {@const visible = isVisible(project.id)}
      <Block class={!visible ? 'filter-hidden' : undefined}>
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
