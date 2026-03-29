---
title: Agents for Programming
date: 2026-03-27
description: My agentic development workflow
tags:
  - ai
  - agents
---

Agents changed how I write software. Here's what actually mattered.

## Use multiple agents

I found it hard working on multiple things at the same time. Context switching
is hard —
[research shows even 23,000 practice attempts can't eliminate the cost](https://link.springer.com/article/10.3758/CABN.7.3.192).

The biggest breakthrough was running multiple agents in the same project. One
implements a feature, another reviews the code, a third explores an approach I'm
not sure about. They share the same codebase but don't block each other.

I also run agents across projects for lighter work — research, chores, quick
fixes.

I never let agents notify me. I make the context switch when I'm ready.

## Build incrementally

I tried the spec-first approach with agents. Write a detailed plan, iterate on
it, then execute. The problem: you can't predict every edge case from a
document. Now I skip the big plan and build incrementally. Small changes,
reviewed and tested one at a time. The code ends up better because I catch
issues early instead of drowning in a massive diff.

## Stay critical

Agents tend to go with the first reasonable solution, not the best one. Whenever
an agent proposes a plan or a fix, I ask for alternatives. They're also
agreeable by default — asking "would you do X?" almost always gets a yes. Asking
"what are the tradeoffs of X?" gets a real answer.

## Get a second opinion

An agent that just implemented something is biased toward its own solution. I
ask a fresh agent to review the work — it catches things the first one won't,
but it also lacks context, so some suggestions are false positives. I pass them
back to the original:

> Investigate each of these suggestions and check if they are false positives or
> we should address them.

The combination of both perspectives leads to a better result than either would
have reached alone.

## Make agents self-reflect

You have to write the code to see what's wrong with it. Once an agent finishes a
task, I ask it to critique its own work. Peter Steinberger
[put it well](https://x.com/steipete/status/1982563870138081790) — "now that you
wrote the code, what would you do better?" This has been one of the highest ROI
things I do. The prompts I use:

> Now that you did these changes, what would you refactor/change to
> simplify/improve the code. Only include things that are really worth it if
> anything.

> Now that you did these changes, would there be better ways of doing this. Only
> include things that are really worth it if anything.

The "only worth it" part matters — without it, agents will suggest rewrites for
the sake of rewriting.

## Source code is the best documentation

I point agents at source code — to debug issues, compare implementations,
understand how a library is architected, or just get ideas. It works better than
any docs page. Mitchell Hashimoto
[saw this play out](https://x.com/mitchellh/status/2029348087538565612) — a
six-month bug solved by an agent that finally read the source.

## Configure your harness

I wasn't used to trusting LLMs so I was manually approving every file move,
every search, every shell command. Permissions and sandboxing fixed that. I let
it do anything within the sandbox except write to git — I commit and push
myself.

The harness configuration goes deeper than permissions. I set up a CLAUDE.md
with my code standards and conventions, added custom slash commands for things I
do often, and connected MCP servers to extend its capabilities. Each of these
was a small investment that compounded over time.

One quick tip: run `/insights` in Claude Code to have it give you feedback. I
was surprised how many quick wins it suggested.

## Build your own tools

If something in your workflow feels off, don't work around it — build what's
missing.
