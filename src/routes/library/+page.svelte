<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import { bookSpineWidth, books } from '$lib/data/books';
  import { SITE_NAME, SITE_URL } from '$lib/constants';
  import { afterNavigate } from '$app/navigation';
  import { tick } from 'svelte';
  let selectedTags = $state<string[]>([]);
  let status = $state<'read' | 'queue'>('read');
  let view = $state<'gallery' | 'shelf' | 'pile'>('gallery');

  const currentBook = books.find((book) => book.status === 'reading');
  const readCount = books.filter((book) => book.status === 'read').length;
  const queueCount = books.filter((book) => book.status === 'queue').length;

  afterNavigate(async ({ from }) => {
    if (!from?.url.pathname.startsWith('/library/')) return;
    const savedView = sessionStorage.getItem('library-view');
    view = savedView === 'shelf' || savedView === 'pile' ? savedView : 'gallery';
    status = sessionStorage.getItem('library-status') === 'queue' ? 'queue' : 'read';
    await tick();
    const scrollY = sessionStorage.getItem('library-scroll-y');
    if (scrollY) requestAnimationFrame(() => window.scrollTo(0, Number(scrollY)));
  });

  function rememberPosition() {
    sessionStorage.setItem('library-scroll-y', String(window.scrollY));
    sessionStorage.setItem('library-view', view);
    sessionStorage.setItem('library-status', status);
  }

  function selectStatus(next: 'read' | 'queue') {
    status = next;
    selectedTags = [];
  }

  const statusBooks = $derived(books.filter((book) => book.status === status));
  const visibleBooks = $derived(
    statusBooks.filter(
      (book) => selectedTags.length === 0 || book.tags.some((tag) => selectedTags.includes(tag))
    )
  );
  const pileBooks = $derived(visibleBooks.map((book) => ({ book, pose: pilePose(book.slug) })));
  const availableTags = $derived(
    [...new Set(statusBooks.flatMap((book) => book.tags))]
      .sort()
      .map((tag) => ({ tag, count: statusBooks.filter((book) => book.tags.includes(tag)).length }))
  );

  function shelfFor(book: (typeof books)[number]) {
    if (book.tags.some((tag) => ['Fiction', 'Memoir', 'Biography'].includes(tag)))
      return 'Stories & lives';
    if (book.tags.some((tag) => ['Communication', 'Relationships'].includes(tag)))
      return 'People & connection';
    if (book.tags.some((tag) => ['Science', 'History'].includes(tag))) return 'Science & history';
    if (
      book.tags.some((tag) => ['Business', 'Leadership', 'Productivity', 'Learning'].includes(tag))
    )
      return 'Work & learning';
    return 'Mind & meaning';
  }

  const shelves = $derived(
    [
      'Stories & lives',
      'People & connection',
      'Science & history',
      'Work & learning',
      'Mind & meaning',
    ]
      .map((name) => ({ name, books: visibleBooks.filter((book) => shelfFor(book) === name) }))
      .filter((shelf) => shelf.books.length > 0)
  );

  const shelfItems = $derived(
    status === 'queue'
      ? visibleBooks.map((book) => ({ type: 'book' as const, book, group: undefined }))
      : shelves.flatMap((shelf, index) => [
          ...(index > 0 ? [{ type: 'divider' as const, name: shelf.name }] : []),
          ...shelf.books.map((book, bookIndex) => ({
            type: 'book' as const,
            book,
            group: bookIndex === 0 ? shelf.name : undefined,
          })),
        ])
  );

  function pilePose(slug: string) {
    let hash = 2166136261;
    for (let i = 0; i < slug.length; i++) hash = Math.imul(hash ^ slug.charCodeAt(i), 16777619);
    hash >>>= 0;
    return {
      x: `${((hash >>> 1) % 29) - 14}px`,
      roll: `${-90 + ((hash >>> 7) % 91) - 45}deg`,
      inset: `${((hash >>> 26) % 16) + 3}px`,
    };
  }

  function toggleTag(tag: string) {
    selectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selected) => selected !== tag)
      : [...selectedTags, tag];
  }

  function revealArtwork(node: HTMLElement) {
    const images = [...node.querySelectorAll('img')];
    let decoding = false;
    let destroyed = false;
    const reveal = () => {
      if (decoding || !images.every((image) => image.complete && image.naturalWidth > 0)) return;
      decoding = true;
      void Promise.all(images.map((image) => image.decode()))
        .then(() => {
          if (!destroyed) node.dataset.artReady = '';
        })
        .catch(() => (decoding = false));
    };
    for (const image of images) image.addEventListener('load', reveal);
    reveal();

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        for (const image of images) image.loading = 'eager';
        observer.disconnect();
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(node);
    return {
      destroy: () => {
        destroyed = true;
        observer.disconnect();
        for (const image of images) image.removeEventListener('load', reveal);
      },
    };
  }

  function varyPileGroupPull(node: HTMLElement) {
    let active: HTMLElement | null = null;
    const bookFor = (target: EventTarget | null) => {
      const book = target instanceof Element ? target.closest<HTMLElement>('.pile-book') : null;
      return book?.parentElement === node ? book : null;
    };
    const vary = (target: EventTarget | null) => {
      const book = bookFor(target);
      if (!book || book === active) return;
      active = book;
      for (const [property, min, max] of [
        ['--pile-group-pull', 8, 22],
        ['--pile-group-pull-mobile', 4, 10],
      ] as const) {
        let next: string;
        do next = `${min + Math.floor(Math.random() * (max - min + 1))}px`;
        while (next === node.style.getPropertyValue(property));
        node.style.setProperty(property, next);
      }
    };
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') vary(event.target);
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!bookFor(event.relatedTarget)) active = null;
    };
    const onFocusIn = (event: FocusEvent) => vary(event.target);
    const onFocusOut = (event: FocusEvent) => {
      if (!bookFor(event.relatedTarget)) active = null;
    };
    node.addEventListener('pointerover', onPointerOver);
    node.addEventListener('pointerout', onPointerOut);
    node.addEventListener('focusin', onFocusIn);
    node.addEventListener('focusout', onFocusOut);
    return {
      destroy: () => {
        node.removeEventListener('pointerover', onPointerOver);
        node.removeEventListener('pointerout', onPointerOut);
        node.removeEventListener('focusin', onFocusIn);
        node.removeEventListener('focusout', onFocusOut);
      },
    };
  }

  function markTouchingBooks(node: HTMLElement) {
    const update = () => {
      node.style.setProperty('--shelf-perspective-x', `${node.clientWidth / 2}px`);
      const dividers = [...node.querySelectorAll<HTMLElement>(':scope > .shelf-divider')];
      for (const divider of dividers) divider.style.removeProperty('width');
      for (const divider of dividers) {
        const previousBook = divider.previousElementSibling;
        const nextBook = divider.nextElementSibling;
        if (
          previousBook instanceof HTMLElement &&
          nextBook instanceof HTMLElement &&
          previousBook.offsetTop !== nextBook.offsetTop
        ) {
          divider.style.width = `${Math.max(
            0,
            node.clientWidth - previousBook.offsetLeft - previousBook.offsetWidth - 1
          )}px`;
        }
      }
      let previous: HTMLElement | undefined;
      for (const child of node.children) {
        if (!(child instanceof HTMLElement) || !child.classList.contains('shelf-book')) {
          previous = undefined;
          continue;
        }
        child.toggleAttribute(
          'data-touching-left',
          previous !== undefined &&
            child.offsetTop === previous.offsetTop &&
            Math.abs(child.offsetLeft - previous.offsetLeft - previous.offsetWidth) < 2
        );
        previous = child;
      }
    };
    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(scheduleUpdate);
    resize.observe(node);
    const mutations = new MutationObserver(scheduleUpdate);
    mutations.observe(node, { childList: true });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const minimumHoverMs = 80;
    const activeSince = new WeakMap<HTMLElement, number>();
    const hoverTimers = new WeakMap<HTMLElement, number>();
    const bookFor = (target: EventTarget | null) => {
      const book = target instanceof Element ? target.closest<HTMLElement>('.shelf-book') : null;
      return book?.parentElement === node ? book : null;
    };
    const onPointerOver = (event: PointerEvent) => {
      const book = bookFor(event.target);
      if (
        !book ||
        book === bookFor(event.relatedTarget) ||
        event.pointerType === 'touch' ||
        reducedMotion.matches
      )
        return;
      const timer = hoverTimers.get(book);
      if (timer !== undefined) {
        clearTimeout(timer);
        hoverTimers.delete(book);
      } else {
        activeSince.set(book, performance.now());
      }
      book.setAttribute('data-hover-active', '');
    };
    const onPointerOut = (event: PointerEvent) => {
      const book = bookFor(event.target);
      if (!book || book === bookFor(event.relatedTarget) || !book.hasAttribute('data-hover-active'))
        return;
      const pending = hoverTimers.get(book);
      if (pending !== undefined) clearTimeout(pending);
      const remaining = Math.max(
        0,
        minimumHoverMs - (performance.now() - (activeSince.get(book) ?? 0))
      );
      hoverTimers.set(
        book,
        window.setTimeout(() => {
          book.removeAttribute('data-hover-active');
          hoverTimers.delete(book);
          activeSince.delete(book);
        }, remaining)
      );
    };
    node.addEventListener('pointerover', onPointerOver);
    node.addEventListener('pointerout', onPointerOut);
    return {
      destroy: () => {
        resize.disconnect();
        mutations.disconnect();
        cancelAnimationFrame(frame);
        node.removeEventListener('pointerover', onPointerOver);
        node.removeEventListener('pointerout', onPointerOut);
        for (const book of node.querySelectorAll<HTMLElement>(':scope > .shelf-book')) {
          const timer = hoverTimers.get(book);
          if (timer !== undefined) clearTimeout(timer);
          book.removeAttribute('data-hover-active');
        }
      },
    };
  }

  function keepShelfLabelVisible(node: HTMLElement) {
    const shelf = node.closest<HTMLElement>('.bookshelf');
    if (!shelf) return;

    const update = () => {
      node.style.translate = 'none';
      const overflow = node.getBoundingClientRect().right - shelf.getBoundingClientRect().right;
      if (overflow > 0) node.style.translate = `${-Math.ceil(overflow)}px 0`;
    };
    const observer = new ResizeObserver(update);
    observer.observe(shelf);
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<svelte:head>
  <title>Library - {SITE_NAME}</title>
  <meta name="description" content="Books I've read, what I'm reading, and what's next." />
  <link rel="canonical" href="{SITE_URL}/library" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Library - {SITE_NAME}" />
  <meta property="og:description" content="Books I've read, what I'm reading, and what's next." />
  <meta property="og:url" content="{SITE_URL}/library" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content="{SITE_URL}/og/library.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Library - {SITE_NAME}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Library - {SITE_NAME}" />
  <meta name="twitter:description" content="Books I've read, what I'm reading, and what's next." />
  <meta name="twitter:image" content="{SITE_URL}/og/library.png" />
</svelte:head>

{#snippet cover(book: (typeof books)[number])}
  <span class="book-front relative block h-full w-full overflow-hidden">
    <img
      src={book.cover}
      alt="Cover of {book.title}"
      loading="lazy"
      width="300"
      height="450"
      class="h-full w-full object-cover"
    />
  </span>
{/snippet}

<Layout>
  <Block class="pb-2!">
    <h1>Library</h1>
    <p>Books I've read, what I'm reading, and what's next.</p>
  </Block>

  <Block class="pt-2!">
    {#if currentBook}
      <section
        class="not-prose mb-10 rounded-lg border border-border bg-card/40 p-4 sm:p-5"
        aria-label="Currently reading"
      >
        <div class="flex items-center gap-5 sm:gap-7">
          <a
            href="/library/{currentBook.slug}"
            aria-label="About {currentBook.title} by {currentBook.author}"
            onclick={rememberPosition}
            use:revealArtwork
            style:view-transition-name={`book-${currentBook.slug}`}
            style:--book-cover-color={currentBook.coverColor}
            class="book-cover library-artwork relative block aspect-[2/3] w-24 shrink-0 bg-muted/10 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:w-32"
          >
            {@render cover(currentBook)}
          </a>
          <div class="min-w-0">
            <p class="mb-2 text-xs font-semibold tracking-widest text-accent uppercase">
              Currently reading
            </p>
            <h2 class="font-serif text-xl leading-tight font-semibold text-primary sm:text-2xl">
              <a
                href="/library/{currentBook.slug}"
                onclick={rememberPosition}
                class="hover:text-accent focus-visible:outline-accent">{currentBook.title}</a
              >
            </h2>
            <p class="mt-2 text-sm text-muted">by {currentBook.author}</p>
          </div>
        </div>
      </section>
    {/if}
    <div class="not-prose mb-8 space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-1" aria-label="Reading status">
          {#each [{ value: 'read' as const, label: 'Read', count: readCount }, { value: 'queue' as const, label: 'Queue', count: queueCount }] as option (option.value)}
            <button
              type="button"
              aria-pressed={status === option.value}
              onclick={() => selectStatus(option.value)}
              class="flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-150 {status ===
              option.value
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-border/50 text-muted hover:border-border hover:bg-muted/5 hover:text-primary'}"
            >
              <span>{option.label}</span>
              <span
                class="rounded-full px-1.5 py-0.5 text-[10px] leading-none {status === option.value
                  ? 'bg-accent/20'
                  : 'bg-muted/10'}">{option.count}</span
              >
            </button>
          {/each}
        </div>
        <div
          class="flex rounded-full border border-border p-1"
          role="group"
          aria-label="Library view"
        >
          <button
            type="button"
            aria-pressed={view === 'gallery'}
            onclick={() => (view = 'gallery')}
            class="cursor-pointer rounded-full px-3 py-1 text-xs transition-colors {view ===
            'gallery'
              ? 'bg-primary text-background'
              : 'text-muted hover:text-primary'}">Gallery</button
          >
          <button
            type="button"
            aria-pressed={view === 'shelf'}
            onclick={() => (view = 'shelf')}
            class="cursor-pointer rounded-full px-3 py-1 text-xs transition-colors {view === 'shelf'
              ? 'bg-primary text-background'
              : 'text-muted hover:text-primary'}">Bookshelf</button
          >
          <button
            type="button"
            aria-pressed={view === 'pile'}
            onclick={() => (view = 'pile')}
            class="cursor-pointer rounded-full px-3 py-1 text-xs transition-colors {view === 'pile'
              ? 'bg-primary text-background'
              : 'text-muted hover:text-primary'}">Pile</button
          >
        </div>
      </div>
      <div aria-label="Filter by topic">
        <p class="mb-3 text-sm font-medium text-muted">Filter by topic</p>
        <div class="flex flex-wrap gap-1">
          {#each availableTags as { tag, count } (tag)}
            <button
              type="button"
              aria-pressed={selectedTags.includes(tag)}
              onclick={() => toggleTag(tag)}
              class="flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-150 {selectedTags.includes(
                tag
              )
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-border/50 text-muted hover:border-border hover:bg-muted/5 hover:text-primary'}"
            >
              <span>{tag}</span>
              <span
                class="rounded-full px-1.5 py-0.5 text-[10px] leading-none {selectedTags.includes(
                  tag
                )
                  ? 'bg-accent/20'
                  : 'bg-muted/10'}">{count}</span
              >
            </button>
          {/each}
          {#if selectedTags.length > 0}
            <button
              type="button"
              onclick={() => (selectedTags = [])}
              class="cursor-pointer px-2 py-1 text-xs text-muted transition-all hover:text-primary"
              >Clear</button
            >
          {/if}
        </div>
      </div>
    </div>
    {#if view === 'gallery'}
      <div
        class="not-prose grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {#each visibleBooks as book (book.slug)}
          <figure class="relative min-w-0">
            <a
              href="/library/{book.slug}"
              aria-label="About {book.title} by {book.author}"
              onclick={rememberPosition}
              use:revealArtwork
              style:view-transition-name={`book-${book.slug}`}
              style:--book-cover-color={book.coverColor}
              class="book-cover library-artwork relative block aspect-[2/3] bg-muted/10 transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.02] focus-visible:z-10 focus-visible:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
            >
              {@render cover(book)}
            </a>
            <figcaption class="mt-3 text-sm leading-snug font-medium text-primary">
              {book.title}
            </figcaption>
          </figure>
        {/each}
      </div>
    {:else if view === 'shelf'}
      <div use:markTouchingBooks class="bookshelf not-prose flex flex-wrap">
        {#each shelfItems as item (`${item.type}-${item.type === 'divider' ? item.name : item.book.slug}`)}
          {#if item.type === 'divider'}
            <div class="shelf-divider" aria-hidden="true"></div>
          {:else}
            <div
              class="shelf-book"
              style:--spine-width={`${bookSpineWidth(item.book.pages)}px`}
              style:--book-cover-color={item.book.coverColor}
            >
              <div use:revealArtwork class="shelf-book-visual library-artwork">
                <a
                  href="/library/{item.book.slug}"
                  tabindex="-1"
                  aria-hidden="true"
                  onclick={rememberPosition}
                  class="shelf-sides"
                >
                  <span class="shelf-cover-face">
                    <img src={item.book.cover} alt="" width="300" height="450" loading="lazy" />
                  </span>
                </a>
                <a
                  href="/library/{item.book.slug}"
                  title="{item.book.title} by {item.book.author}{item.book.pages
                    ? ` (${item.book.pages} pages in a published edition)`
                    : ''}"
                  aria-label="About {item.book.title} by {item.book.author}"
                  onclick={rememberPosition}
                  class="shelf-spine relative block"
                >
                  <span class="shelf-spine-front">
                    <img
                      src={item.book.spine}
                      alt=""
                      width={bookSpineWidth(item.book.pages) * 2}
                      height="520"
                      class="h-full w-full"
                      loading="lazy"
                    />
                  </span>
                </a>
              </div>
              {#if item.group}
                <h2
                  use:keepShelfLabelVisible
                  class="absolute top-full left-0 mt-1 text-xs font-medium whitespace-nowrap text-muted"
                >
                  {item.group}
                </h2>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {:else if visibleBooks.length > 0}
      <div use:varyPileGroupPull class="book-pile not-prose">
        {#each pileBooks as { book, pose }, index (book.slug)}
          <a
            href="/library/{book.slug}"
            aria-label="About {book.title} by {book.author}"
            title="{book.title} by {book.author}"
            onclick={rememberPosition}
            style:--book-cover-color={book.coverColor}
            style:--pile-thickness={`${Math.round(5 + bookSpineWidth(book.pages) * 0.75)}px`}
            style:--pile-layer={pileBooks.length - index}
            style:--pile-x={pose.x}
            style:--pile-roll={pose.roll}
            style:--pile-inset={pose.inset}
            class="pile-book"
          >
            <span use:revealArtwork class="pile-book-visual library-artwork">
              <span class="pile-book-cover">
                <img
                  src={book.cover}
                  alt=""
                  width="300"
                  height="450"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </span>
              <span class="pile-book-bottom"></span>
              <span class="pile-book-spine">
                <img
                  src={book.spine}
                  alt=""
                  width={bookSpineWidth(book.pages) * 2}
                  height="520"
                  loading="lazy"
                />
              </span>
              <span class="pile-book-back"></span>
              <span class="pile-book-pages"></span>
              <span class="pile-book-pages pile-book-pages-end"></span>
            </span>
          </a>
        {/each}
      </div>
    {/if}
    {#if visibleBooks.length === 0}
      <p class="text-sm text-muted">No books match the selected filters.</p>
    {/if}
  </Block>
</Layout>
