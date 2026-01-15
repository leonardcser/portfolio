<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import NavItem from './NavItem.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { IoClose } from 'svelte-icons-pack/io';

  interface Link {
    href: string;
    label: string;
  }

  interface Props {
    open: boolean;
    onClose: () => void;
    nav: Link[];
    links: Link[];
    currentPath: string;
  }

  let { open = $bindable(false), onClose, nav, links, currentPath }: Props = $props();

  // Handle escape key
  $effect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  });

  // Prevent body scroll when menu is open
  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
</script>

<!-- Full Screen Menu -->
<div
  class="fixed inset-0 z-40 bg-background transition-opacity duration-300 {open
    ? 'pointer-events-auto opacity-100'
    : 'pointer-events-none opacity-0'}"
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation menu"
>
  <div class="flex h-full flex-col items-center justify-center p-8">
    <!-- Close button -->
    <button onclick={onClose} class="absolute top-5 right-6 p-2" aria-label="Close menu">
      <Icon src={IoClose} size={24} />
    </button>

    <!-- Navigation items -->
    <nav class="flex flex-col items-center gap-8">
      {#each nav as item (item.label)}
        <NavItem
          href={item.href}
          label={item.label}
          umamiEventPrefix={'navigation-' + item.label.toLowerCase()}
          active={item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href)}
          onclick={onClose}
          class="text-2xl!"
        />
      {/each}

      {#each links as link (link.label)}
        <NavItem
          href={link.href}
          label={link.label}
          umamiEventPrefix={'navigation-' + link.label}
          onclick={onClose}
          class="text-2xl!"
        />
      {/each}

      <div class="mt-4">
        <ThemeToggle />
      </div>
    </nav>
  </div>
</div>
