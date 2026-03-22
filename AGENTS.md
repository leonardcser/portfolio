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

- Use `cn()` from `$lib/utils` for merging Tailwind classes
- Components use Svelte 5 snippets for composition (not slots)
- Global state in `src/lib/state.svelte.ts` using runes
- Images use `enhanced:img` directive; `<Image>` component wires
  click-to-preview
- Dark mode via `.dark` class (managed by `mode-watcher`)
- Umami analytics: `data-umami-event="event-name"` on elements

## Adding Projects

1. Add image/video to `/static/images/` or `/static/videos/`
2. Add project entry in `src/lib/data/projects.ts` (`allProjects` array)
3. To feature on homepage, add the project ID to `featuredProjectIds`
4. To add to a category filter, update `projectCategories`
