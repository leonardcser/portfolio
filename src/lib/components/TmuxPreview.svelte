<script lang="ts">
  type Window = {
    id: number;
    name: string;
    html: string;
    lualine?: string;
    padding?: string;
    wrap?: boolean;
  };

  // Nord palette for nvim
  const n = {
    kw: 'color:#81A1C1',
    fn: 'color:#88C0D0',
    str: 'color:#A3BE8C',
    ty: 'color:#EBCB8B',
    op: 'color:#81A1C1',
    dim: 'color:#616E88',
    wht: 'color:#D8DEE9',
  } as const;

  // Terminal palette for zsh/claude
  const c = {
    dim: 'color:#5c6370',
    grn: 'color:#98c379',
    cyn: 'color:#56b6c2',
    wht: 'color:#c8c8c8',
    mag: 'color:#c678dd',
    ora: 'color:#d97757',
  } as const;

  const s = (style: string, text: string) => `<span style="${style}">${text}</span>`;
  const hr = (left: string = '', right: string = '') =>
    `<span style="${c.dim};display:flex;align-items:center;gap:0">${left ? `<span>─ </span>${left}<span> </span>` : ''}<span style="flex:1;overflow:hidden;white-space:nowrap">──────────────────────────────────────────────────────────────────────────────────────────────────</span>${right ? `<span> ${right} ─</span>` : ''}</span>`;

  const windows: Window[] = [
    {
      id: 1,
      name: 'nvim',
      padding: 'px-4 py-3',
      html: [
        `${s(n.dim, '  1')} ${s(n.kw, 'import')} { ${s(n.fn, 'json')} } ${s(n.kw, 'from')} ${s(n.str, "'@sveltejs/kit'")}${s(n.wht, ';')}`,
        `${s(n.dim, '  2')} ${s(n.kw, 'import')} ${s(n.kw, 'type')} { ${s(n.ty, 'RequestHandler')} } ${s(n.kw, 'from')} ${s(n.str, "'./$types'")}${s(n.wht, ';')}`,
        `${s(n.dim, '  3')}`,
        `${s(n.dim, '  4')} ${s(n.kw, 'export')} ${s(n.kw, 'const')} ${s(n.fn, 'GET')}${s(n.op, ':')} ${s(n.ty, 'RequestHandler')} ${s(n.op, '=')} ${s(n.kw, 'async')} () ${s(n.op, '=>')} {`,
        `${s(n.dim, '  5')}   ${s(n.kw, 'const')} <span style="background:#D8DEE9;color:#0a0a0a">p</span>osts ${s(n.op, '=')} ${s(n.kw, 'await')} ${s(n.fn, 'getPosts')}()${s(n.wht, ';')}`,
        `${s(n.dim, '  6')}   ${s(n.kw, 'return')} ${s(n.fn, 'json')}(posts)${s(n.wht, ';')}`,
        `${s(n.dim, '  7')} }${s(n.wht, ';')}`,
        `${s(n.dim, '  8')}`,
        `${s(n.dim, '  9')} ${s(n.kw, 'async')} ${s(n.kw, 'function')} ${s(n.fn, 'getPosts')}() {`,
        `${s(n.dim, ' 10')}   ${s(n.kw, 'const')} modules ${s(n.op, '=')} ${s(n.kw, 'import')}.meta.${s(n.fn, 'glob')}(${s(n.str, "'/src/posts/*.md'")})${s(n.wht, ';')}`,
        `${s(n.dim, ' 11')}   ${s(n.kw, 'const')} posts ${s(n.op, '=')} []${s(n.wht, ';')}`,
        `${s(n.dim, ' 12')}   ${s(n.kw, 'for')} (${s(n.kw, 'const')} [path, resolver] ${s(n.kw, 'of')} Object.${s(n.fn, 'entries')}(modules)) {`,
        `${s(n.dim, ' 13')}     ${s(n.kw, 'const')} post ${s(n.op, '=')} ${s(n.kw, 'await')} ${s(n.fn, 'resolver')}()${s(n.wht, ';')}`,
        `${s(n.dim, ' 14')}     posts.${s(n.fn, 'push')}(post.metadata)${s(n.wht, ';')}`,
        `${s(n.dim, ' 15')}   }`,
        `${s(n.dim, ' 16')}   ${s(n.kw, 'return')} posts.${s(n.fn, 'sort')}((a, b) ${s(n.op, '=>')} +${s(n.kw, 'new')} ${s(n.ty, 'Date')}(b.date) - +${s(n.kw, 'new')} ${s(n.ty, 'Date')}(a.date))${s(n.wht, ';')}`,
        `${s(n.dim, ' 17')} }`,
        `${s(n.dim, '~')}`,
      ].join('\n'),
      lualine: `<span style="background:#65D1FF;color:#112638;font-weight:bold;padding:0 6px;display:flex;align-items:center;margin:-2px 0;padding-top:2px;padding-bottom:2px"> NORMAL </span><span style="padding:0 8px;display:flex;align-items:center">+server.ts</span><span style="flex:1"></span><span style="color:#3EFFDC;padding:0 8px;display:flex;align-items:center">49 wpm</span><span style="padding:0 8px;display:flex;align-items:center">ts</span><span style="padding:0 8px;display:flex;align-items:center">utf-8</span><span style="padding:0 8px;display:flex;align-items:center">5:9</span><span style="padding:0 8px;display:flex;align-items:center">29%</span>`,
    },
    {
      id: 2,
      name: 'zsh',
      wrap: true,
      html: [
        `${s(c.cyn, '~/dev/web/portfolio')} ${s(c.grn, 'main')}`,
        `${s(c.mag, '&gt;')} bun dev`,
        `  ${s(c.dim, '$')} vite dev`,
        ``,
        `  ${s(c.cyn, 'VITE')} ${s(c.grn, 'v6.2.2')}  ${s(c.dim, 'ready in')} ${s(c.wht, '856 ms')}`,
        ``,
        `  ${s(c.grn, '➜')}  ${s(c.wht, 'Local:')}   ${s(c.cyn, 'http://localhost:5173/')}`,
        `  ${s(c.dim, '➜')}  ${s(c.wht, 'Network:')} ${s(c.dim, 'use --host to expose')}`,
        `  ${s(c.dim, '➜')}  ${s(c.dim, 'press')} ${s(c.wht, 'h + enter')} ${s(c.dim, 'to show help')}`,
      ].join('\n'),
    },
    {
      id: 3,
      name: 'claude',
      wrap: true,
      html: [
        `<span style="display:inline-grid;grid-template-columns:auto 1fr;column-gap:8px"><span style="${c.ora};line-height:1;padding-top:4px"> ▐▛██▜▌\n▝▜████▛▘\n  ▘▘▝▝</span><span style="display:flex;flex-direction:column;justify-content:center">${s(c.wht, 'Claude Code')} ${s(c.dim, 'v2.1.79')}\n${s(c.dim, 'Opus 4.6 · ~/dev/web/portfolio')}</span></span>`,
        ``,
        `<span style="background:#2a2a2a;color:#D8DEE9;padding:0 4px"> Add a new blog post component with tag filtering and search </span>`,
        ``,
        ` ${s(c.ora, '●')} I'll create a blog post component with tag filtering and search. Let me start by reading the existing code.`,
        ``,
        `   ${s(c.dim, 'Read')} ${s(c.cyn, 'src/routes/blog/+page.svelte')}`,
        ``,
        ` ${s(c.ora, '●')} Now I'll implement the filtered list...`,
        ``,
        `${hr()}❯\n${hr()}`,
      ].join('\n'),
    },
    {
      id: 4,
      name: 'smelt',
      wrap: true,
      html: [
        `<span style="background:#2a2a2a;color:#D8DEE9;padding:0 4px"> Fix the mobile nav overflow issue </span>`,
        ``,
        ` ${s(c.dim, '│')} The nav overflows on mobile. Let me find the component and fix it.`,
        ``,
        ` I'll fix the mobile nav overflow. Let me explore the navigation structure.`,
        ``,
        ` ${s(c.grn, '⏺')} ${s(c.dim, 'glob')} ${s(c.cyn, '**/*nav*.{svelte,ts,js}')}`,
        `   ${s(c.dim, '1 file')}`,
        ``,
        ` ${s(c.grn, '⏺')} ${s(c.dim, 'read_file')} ${s(c.cyn, 'src/lib/components/Nav.svelte')}`,
        `   ${s(c.dim, '42 lines')}`,
        ``,
        ` ${s(c.dim, '│')} Found it — the container needs overflow-x-hidden on mobile.`,
        ``,
        `${hr(`<span style="background:#4361ee;color:#000;padding:0 4px">fix-mobile-nav-overflow</span>`, `Qwen3.5-27B · 3.2k`)}\n${hr()}`,
      ].join('\n'),
    },
  ];

  let active = $state(1);
  const activeWindow = $derived(windows.find((w) => w.id === active));

  let now = $state(new Date());
  $effect(() => {
    const id = setInterval(() => (now = new Date()), 30_000);
    return () => clearInterval(id);
  });
  const clock = $derived(
    `"macair" ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}`,
  );

  let prefixActive = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey && (e.key === 'b' || e.key === 'a')) {
      e.preventDefault();
      prefixActive = true;
      return;
    }
    if (prefixActive) {
      prefixActive = false;
      const num = parseInt(e.key);
      if (num >= 1 && num <= windows.length) {
        e.preventDefault();
        active = num;
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="not-prose w-full overflow-hidden border border-border">
  <!-- Terminal content -->
  <div
    class="flex h-[18lh] flex-col overflow-hidden bg-black font-mono text-[13px] leading-normal text-[#D8DEE9]"
  >
    <div class="flex-1 overflow-hidden {activeWindow?.padding ?? 'py-1'}">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <pre
        class="m-0 border-none! bg-transparent! p-0! {activeWindow?.wrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}">{@html activeWindow?.html}</pre>
    </div>
    {#if activeWindow?.lualine}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="flex items-stretch bg-[#112638] py-0.5 text-xs leading-none text-[#c3ccdc]">
        {@html activeWindow.lualine}
      </div>
    {/if}
  </div>

  <!-- tmux status bar -->
  <div
    class="flex items-center gap-0 overflow-x-auto bg-black py-0.5 font-mono text-xs text-[#00cccc]"
  >
    <span class="mr-2 shrink-0">[portfolio]</span>
    {#each windows as w (w.id)}
      <button
        onclick={() => (active = w.id)}
        class="shrink-0 cursor-pointer border-none bg-transparent px-1 py-0.5 font-mono text-xs font-bold text-[#00cc00] hover:text-[#00ff00]"
      >
        {w.id}:{w.name}<span class={w.id === active ? '' : 'invisible'}>*</span>
      </button>
    {/each}
    <span class="ml-auto shrink-0 text-[#00cccc]">{clock}</span>
  </div>
</div>
