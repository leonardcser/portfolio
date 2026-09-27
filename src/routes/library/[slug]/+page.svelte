<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Block from '$lib/components/Block.svelte';
  import { SITE_NAME, SITE_URL } from '$lib/constants';
  import { latestRead } from '$lib/data/books';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || event.defaultPrevented || event.repeat) return;
    if (document.querySelector('[aria-modal="true"]:not(.pointer-events-none)')) return;

    event.preventDefault();
    void goto('/library');
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
  <title>{data.book.title} - Library - {SITE_NAME}</title>
  <meta name="description" content={data.book.description} />
  <link rel="canonical" href="{SITE_URL}/library/{data.book.slug}" />
  <meta property="og:type" content="book" />
  <meta property="og:title" content="{data.book.title} - Library - {SITE_NAME}" />
  <meta property="og:description" content={data.book.description} />
  <meta property="og:url" content="{SITE_URL}/library/{data.book.slug}" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content="{SITE_URL}/og/library/{data.book.slug}.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="{data.book.title} by {data.book.author}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{data.book.title} - Library - {SITE_NAME}" />
  <meta name="twitter:description" content={data.book.description} />
  <meta name="twitter:image" content="{SITE_URL}/og/library/{data.book.slug}.png" />
</svelte:head>

<Layout>
  <Block>
    <a href="/library" class="not-prose text-sm text-muted no-underline hover:text-accent"
      >← Library</a
    >
    <div class="not-prose mt-8 flex flex-col items-start gap-8 sm:flex-row sm:gap-12">
      <div
        class="book-cover relative aspect-[2/3] w-44 shrink-0 sm:w-56"
        style:view-transition-name={`book-${data.book.slug}`}
        style:--book-cover-color={data.book.coverColor}
      >
        <span class="book-front relative block h-full w-full overflow-hidden">
          <img
            src={data.book.cover}
            alt="Cover of {data.book.title}"
            width="300"
            height="450"
            class="h-full w-full object-cover"
          />
        </span>
      </div>
      <div class="min-w-0">
        <p class="mb-2 text-xs font-semibold tracking-widest text-accent uppercase">
          {data.book.status === 'reading'
            ? 'Currently reading'
            : data.book.status === 'queue'
              ? 'Want to read'
              : data.book.title === latestRead
                ? 'Last read'
                : 'Read'}
        </p>
        <h1 class="font-serif text-3xl font-semibold sm:text-4xl">{data.book.title}</h1>
        <p class="mt-2 text-sm text-muted">by {data.book.author}</p>
        <p class="mt-6 leading-relaxed text-muted">{data.book.description}</p>
        {#if data.book.review}
          <section class="mt-10 border-t border-border pt-6" aria-label="My review">
            <h2 class="font-serif text-xl font-semibold">My review</h2>
            <div
              class="mt-3 text-xl tracking-widest text-accent"
              aria-label="{data.book.review.rating} out of 5 stars"
            >
              <span aria-hidden="true"
                >{'★'.repeat(data.book.review.rating)}{'☆'.repeat(
                  5 - data.book.review.rating
                )}</span
              >
            </div>
            <p class="mt-4 leading-relaxed text-muted">{data.book.review.text}</p>
          </section>
        {/if}
      </div>
    </div>
  </Block>
</Layout>
