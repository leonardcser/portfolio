# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **SvelteKit 2** with **Svelte 5** (using modern runes: `$state`, `$derived`)
- **TypeScript** in strict mode
- **Tailwind CSS 4** with typography plugin
- **pnpm** as package manager (required by packageManager field)
- **Static site generation** with `@sveltejs/adapter-static`
- **mdsvex** for markdown support

## Development Commands

```bash
# Start development server
pnpm dev

# Type checking
pnpm check
pnpm check:watch    # Watch mode

# Linting and formatting
pnpm lint           # Check formatting and lint
pnpm format         # Auto-format with Prettier

# Building
pnpm build          # Production build
pnpm preview        # Preview production build

# Git date generation (auto-runs via pre-commit hook)
pnpm generate-date
```

## Architecture Overview

### Project Structure

```
/src
  /lib
    /components     - 18+ reusable Svelte components
    /app.css        - Global Tailwind + custom CSS variables
    state.svelte.ts - Global reactive state (Svelte 5 format)
    utils.ts        - Helper functions (cn, scrollTo, etc.)
  /routes
    +page.svelte    - Single-page portfolio site
```

### State Management

Uses **Svelte 5 runes** exclusively - no external state libraries:

- Global state in `src/lib/state.svelte.ts`
- Exports reactive state objects (`headerState`, `mediaPreviewState`)
- Pure functions to update state (`openMediaPreview()`, `closeMediaPreview()`)

### Component Patterns

**Snippet-based composition:**
All major components use Svelte 5 snippets for flexible children:

```svelte
<ProjectItem>
  {#snippet demo()}
    <Image src="..." />
  {/snippet}
  Description text here
</ProjectItem>
```

**Class merging utility:**
Always use `cn()` from `utils.ts` when merging Tailwind classes:

```typescript
import { cn } from '$lib/utils';
class={cn('base-class', props.class)}
```

**Exported module constants:**
Components like `Header.svelte` export constants at module level for cross-component coordination:

```typescript
export const headerHeight = 100;
export const headerCollapsedHeight = 50;
```

### Media Handling

**Global modal system:**

- `MediaPreview.svelte` component in root layout handles all fullscreen image/video displays
- Use `openMediaPreview()` from `state.svelte.ts` to trigger modal
- Images use `enhanced:img` directive for optimization
- Videos support multiple formats (MP4, OGG, WebM)

**Image component:**

```svelte
<Image src="/images/example.png" description="Caption text" figureNumber={1} />
```

Automatically wires up click-to-preview functionality.

### Styling Conventions

**Tailwind-first approach:**

- All styling via Tailwind utilities
- Custom theme variables in `app.css` using CSS custom properties
- Dark mode via `.dark` class (managed by `mode-watcher`)
- Custom utilities: `.bg-dotted` for dotted background pattern

**Responsive patterns:**

- Mobile-first design
- Common breakpoints: `max-sm:`, `sm:`, `lg:`
- Table of Contents hidden on mobile, sticky on `lg+`

### TypeScript Patterns

- Strict mode enabled
- Interfaces for all component props
- Module resolution: "bundler"
- Keep `app.d.ts` minimal (SvelteKit handles most type generation)

## Important Workflows

### Adding Projects

1. Add image to `/static/images/`
2. Add project to `src/routes/+page.svelte` using `ProjectItem` component
3. Update `figureNumber` props sequentially for all subsequent media
4. Add entry to `src/lib/components/TableOfContents.svelte` subsections array
5. Run `pnpm lint` to check formatting

### Pre-commit Hook

A pre-commit hook automatically runs `generate-date` to update `src/lib/gitDate.ts` with the last modified timestamp. If it fails, run manually:

```bash
pnpm generate-date
```

### Progressive Enhancement

Components with JavaScript functionality should have `<noscript>` fallbacks:

- Header, Navigation, ThemeToggle, AutoplayVideo all include noscript blocks
- Videos load without autoplay in noscript mode
- Theme toggle hidden in noscript (requires localStorage)

## Linting Configuration

**ESLint 9** with flat config:

- Modern `eslint.config.js` format
- Svelte + TypeScript plugins
- Prettier compatibility layer

**Prettier:**

- 2-space indentation, single quotes
- Tailwind class sorting (via `prettier-plugin-tailwindcss`)
- Print width: 100 characters

## Analytics

Umami Analytics injected conditionally in production only. Track events with:

```svelte
<a data-umami-event="event-name-here">...</a>
```

## Key Dependencies

- `clsx` + `tailwind-merge` - Combined in `cn()` utility for class merging
- `mode-watcher` - Dark mode detection and management
- `svelte-icons-pack` - Icon library (BsGithub, IoNewspaper, LuGlobe, etc.)
- `@sveltejs/enhanced-img` - Optimized image loading

## Additional Working Directory

The mathsnip project is available at `/Users/leo/dev/swift/mathsnip` for reference when needed.
