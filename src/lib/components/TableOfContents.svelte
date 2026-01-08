<script lang="ts">
  import { headerCollapsedHeight } from '$lib/components/Header.svelte';
  import { onMount } from 'svelte';

  interface TOCSubItem {
    id: string;
    label: string;
  }

  interface TOCItem {
    id: string;
    label: string;
    subsections?: TOCSubItem[];
  }

  let activeSection = $state('');

  const sections: TOCItem[] = [
    { id: 'journey', label: 'Journey' },
    {
      id: 'professional-work',
      label: 'Professional Work',
      subsections: [
        { id: 'greenland-lakes', label: 'Greenland Lakes Detection' },
        { id: 'dafthunk', label: 'Dafthunk' },
        { id: 'mlops-guide', label: 'A Guide To MLOps' },
        { id: 'license-plate', label: 'License Plate Detection' },
        { id: 'mdwrap', label: 'mdwrap' },
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      subsections: [
        { id: 'code-llm', label: 'CodeLLM' },
        { id: 'memsched', label: 'MEMsched' },
        { id: 'commit', label: 'commit.' },
        { id: 'scrapeout', label: 'Scrapeout' },
        { id: 'captcha-solver', label: 'Captcha Solver' },
        { id: 'chess-engine', label: 'Chess Engine' },
        { id: 'slither-rl', label: 'Slither.io RL' },
        { id: 'pacman', label: 'Pac-Man' },
        { id: 'mcp-nvim-lsp', label: 'MCP Nvim LSP' },
        { id: 'vite-react-ssr', label: 'Vite React Head SSR' },
      ],
    },
  ];

  // activeSection now only contains main section IDs, so we can use it directly
  let activeParentSection = $derived(activeSection);

  onMount(() => {
    const handleScroll = () => {
      updateActiveSection();
    };

    const updateActiveSection = () => {
      // Get the offset to account for the header
      const offset = headerCollapsedHeight + 50;

      // Find all main section elements with their positions (only main sections, not subsections)
      const sectionPositions = sections
        .map((section) => {
          const element = document.getElementById(section.id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const absoluteTop = window.scrollY + rect.top;

          return {
            id: section.id,
            top: absoluteTop,
          };
        })
        .filter((item): item is { id: string; top: number } => item !== null);

      // Find the current section based on scroll position
      // The active section is the last one whose top is above the current scroll + offset
      let currentSection = '';
      const scrollPosition = window.scrollY + offset;

      for (const section of sectionPositions) {
        if (section.top <= scrollPosition) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      activeSection = currentSection;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -headerCollapsedHeight - 20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
</script>

<nav class="sticky z-10 mt-5 ml-5" style="top: calc({headerCollapsedHeight}px + 1.25rem);">
  <div class="flex flex-col space-y-2">
    <h3 class="text-muted-foreground mb-2 text-sm font-semibold">On this page</h3>
    <ul class="flex flex-col space-y-1.5 text-sm">
      {#each sections as section}
        <li class="flex flex-col">
          <a
            href="#{section.id}"
            onclick={(e) => {
              e.preventDefault();
              scrollToSection(section.id);
            }}
            class="hover:text-foreground relative w-full pl-3 text-left transition-colors {activeSection ===
            section.id
              ? 'text-foreground font-semibold'
              : 'text-muted'}"
          >
            {#if activeSection === section.id}
              <div class="absolute top-0 bottom-0 left-0 w-px bg-primary"></div>
            {/if}
            {section.label}
          </a>
          {#if section.subsections && activeParentSection === section.id}
            <ul class="relative flex flex-col space-y-0.5 pt-1 text-sm" id="toc-subsections">
              {#each section.subsections as subsection}
                <li>
                  <a
                    href="#{subsection.id}"
                    onclick={(e) => {
                      e.preventDefault();
                      scrollToSection(subsection.id);
                    }}
                    class="relative block w-full px-2 py-1 text-left transition-colors"
                    style="padding-left: 1.5rem;"
                  >
                    {subsection.label}
                    <div class="absolute top-1/2 left-0 h-px w-4 bg-border"></div>
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  ul#toc-subsections::before {
    content: '';
    position: absolute;
    width: 1px;
    height: calc(100% - 14px);
    top: 0;
    left: 0;
    background-color: var(--color-border);
  }
</style>
