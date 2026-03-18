<script lang="ts" module>
  export const headerHeight = 80;
</script>

<script lang="ts">
  import { scrollToTop } from '$lib/utils';
  import NavItem from './NavItem.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import NavMenu from './NavMenu.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { IoMenu } from 'svelte-icons-pack/io';
  import { page } from '$app/state';

  let navMenuOpen = $state(false);

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
  ];

  const links = [
    {
      href: 'https://github.com/leonardcser',
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/leonardcsrs/',
      label: 'LinkedIn',
    },
    {
      href: 'mailto:leonard.cseres@devleo.ch',
      label: 'Contact',
    },
  ];
</script>

<div
  class="header-container fixed top-0 right-0 left-0 z-20 mx-0 flex items-center overflow-hidden border-b border-border/50 bg-background max-md:px-6 md:mx-12"
  style={`height: ${headerHeight}px`}
>
  <a
    href="/"
    class="text-sm font-bold whitespace-nowrap"
    onclick={(e) => {
      if (page.url.pathname === '/') {
        e.preventDefault();
        scrollToTop();
      }
      // Otherwise, let default navigation to "/" happen
    }}
  >
    Leonard Cseres
  </a>

  <!-- Navigation -->
  <nav class="hidden flex-1 items-center justify-between sm:flex">
    <div class="flex items-center gap-3 md:gap-5">
      <div class="ms-5 w-px self-stretch bg-primary"></div>
      {#each nav as item (item.label)}
        <NavItem
          href={item.href}
          label={item.label}
          umamiEventPrefix={'navigation-' + item.label.toLowerCase()}
          active={item.href === '/'
            ? page.url.pathname === '/'
            : page.url.pathname.startsWith(item.href)}
        />
      {/each}
    </div>
    <div class="hidden items-center gap-5 md:flex">
      {#each links as link (link.label)}
        <NavItem
          href={link.href}
          label={link.label}
          umamiEventPrefix={'navigation-' + link.label.toLowerCase()}
        />
      {/each}
      <ThemeToggle />
    </div>
  </nav>

  <div class="ml-auto flex items-center gap-2 md:hidden">
    <ThemeToggle />
    <button onclick={() => (navMenuOpen = true)} class="p-2" aria-label="Open menu">
      <Icon src={IoMenu} size={24} className="[&>line]:stroke-primary!" />
    </button>
  </div>
</div>

<!-- Nav Menu -->
<NavMenu
  bind:open={navMenuOpen}
  onClose={() => (navMenuOpen = false)}
  {nav}
  {links}
  currentPath={page.url.pathname}
/>
