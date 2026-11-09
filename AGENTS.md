# AGENTS.md

## Tech Stack

- **SvelteKit 2** with **Svelte 5** (runes: `$state`, `$derived`, snippets)
- **Tailwind CSS 4** with typography plugin
- **bun** as package manager and runtime
- **Static site generation** with `@sveltejs/adapter-static`
- **mdsvex** for markdown support

## Commands

```bash
bun dev             # Dev server
bun run check       # Type checking
bun run lint        # Formatting + lint
bun run format      # Auto-format (Prettier)
bun run build       # Production build
```

## Key Conventions

- Use `cn()` from `#lib/utils.ts` for merging Tailwind classes
- Components use Svelte 5 snippets for composition (not slots)
- Global state in `src/lib/state.svelte.ts` using runes
- Images use `enhanced:img` directive; `<Image>` component wires
  click-to-preview
- Dark mode via `.dark` class (managed by `mode-watcher`)
- Umami analytics: `data-umami-event="event-name"` on elements

## Components

`src/lib/components/` is grouped by how reusable a component is:

- `site/` - page chrome and page sections (Header, Layout, ProjectSection)
- `ui/` - small generic parts (Block, Tag, Image)
- `charts/` - chart parts that know nothing about a post (LineChart, Figure,
  `chart.ts`, `format.ts`)
- `icons/` - logos
- `posts/<slug>/` - components used by one blog post. When a second post needs
  one, move it to `charts/` or `ui/`.

Data for a post lives in `src/lib/data/`.

## Adding Projects

1. Add image/video to `/static/images/` or `/static/videos/`
2. Add project entry in `src/lib/data/projects.ts` (`allProjects` array)
3. To feature on homepage, add the project ID to `featuredProjectIds`
4. To add to a category filter, update `projectCategories`
