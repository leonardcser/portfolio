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
  class="header-container fixed top-0 right-0 left-0 z-20 mx-0 flex items-center overflow-hidden border-b border-border/50 bg-background max-sm:px-6 sm:mx-12"
  style={`height: ${headerHeight}px`}
>
  <a
    href="#top"
    onclick={(e) => {
      e.preventDefault();
      scrollToTop();
    }}
  >
    <h1 class="text-sm font-bold whitespace-nowrap">Leonard Cseres</h1>
  </a>

  <!-- Desktop Navigation -->
  <nav class="hidden flex-1 items-center justify-between sm:flex">
    <div class="flex items-center gap-3 sm:gap-5">
      <div class="ms-3 w-px self-stretch bg-primary sm:ms-5"></div>
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
    <div class="flex items-center gap-3 sm:gap-5">
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

  <!-- Mobile Hamburger Button -->
  <button onclick={() => (navMenuOpen = true)} class="ml-auto p-2 sm:hidden" aria-label="Open menu">
    <Icon src={IoMenu} size={24} />
  </button>
</div>

<!-- Nav Menu -->
<NavMenu
  bind:open={navMenuOpen}
  onClose={() => (navMenuOpen = false)}
  {nav}
  {links}
  currentPath={page.url.pathname}
/>
