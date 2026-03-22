---
title: Build Your Own Workflow
date: 2026-03-18
description: Why your workflow should be personal, and why agents make that easy
tags:
  - ai
  - tooling
---

<script>
  import AiCodeChart from '$lib/components/AiCodeChart.svelte';
  import CursorLogo from '$lib/components/icons/CursorLogo.svelte';
  import ClaudeLogo from '$lib/components/icons/ClaudeLogo.svelte';
  import OpencodeLogo from '$lib/components/icons/OpencodeLogo.svelte';
</script>

The best developer tool doesn't exist yet — because you haven't built it.

I started using agents for programming at the start of 2025. Since then, the
amount of code I write has kept decreasing, and the way I use AI has kept
evolving.

If I had to plot it, it would look something like this:

<div class="flex justify-center">
    <AiCodeChart />
</div>

Every time something didn't work like I wanted it to, I built something that
did. Agents made that easy.

## Humble beginnings

In February 2025, I got started with <CursorLogo />. At the time, I was only
using their (insanely good) edit completions.

My workflow changed from just Neovim to jumping between Cursor and Neovim. The
constant context-switching between two editors was not ideal, but I was able to
speed up repetitive/boilerplate tasks.

## The shift

Jumping between two editors every day got old fast. So when Cursor's pricing
went up and quotas went down, I took it as a reason to move to<ClaudeLogo />.

There were features I missed, so I reimplemented them for Neovim: edit
completions as a [plugin](https://github.com/cursortab/cursortab.nvim), and LSP
diagnostics as an [MCP server](https://github.com/leonardcser/nvim-lsp-mcp). The
MCP server is ~500 LOC and I still use it every day.

## The inflection point

In December 2025, Opus 4.5 was the first model I could trust to write software
from scratch without compilation errors (at least most of the time).

So good in fact that I could start a task, context-switch to something else, and
come back to a working result. Running agents unsupervised meant running several
in parallel — which created a new problem: managing multiple sessions. So I
built [`agent-mux`](https://github.com/leonardcser/agent-mux) in an afternoon.

![agent-mux](/images/agent-mux.gif)

## Building what's missing

But no tool fits perfectly. Claude Code felt sluggish in my setup,
and<OpencodeLogo class="ms-1.5"/> doesn't work with tmux scrollback. All I
wanted was a fast agent that fits in naturally.

So I built [`agent`](https://github.com/leonardcser/agent).

![agent](/images/agent/demo2.gif)

It's a lightweight Rust CLI for agentic coding — tool use, sessions,
permissions, the whole package. 20K LOC. Written by Claude Code. In a weekend.

Your workflow should be your own. No one else knows where it hurts. So next time
something feels off, don't work around it. Build what's missing.
