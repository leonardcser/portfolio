---
title: What a coding agent costs your machine
date: 2026-11-09
description: Benchmarking the CPU, memory and startup of coding agents
tags:
  - ai
  - agents
  - benchmarks
---

<script>
  import BenchCpuSplit from '#lib/components/posts/coding-agent-benchmarks/BenchCpuSplit.svelte';
  import BenchStream from '#lib/components/posts/coding-agent-benchmarks/BenchStream.svelte';
  import BenchFootprint from '#lib/components/posts/coding-agent-benchmarks/BenchFootprint.svelte';
  import ClaudeLogo from '#lib/components/icons/ClaudeLogo.svelte';
  import CodexLogo from '#lib/components/icons/CodexLogo.svelte';
  import FxLogo from '#lib/components/icons/FxLogo.svelte';
  import OmpLogo from '#lib/components/icons/OmpLogo.svelte';
  import OpencodeLogo from '#lib/components/icons/OpencodeLogo.svelte';
  import PiLogo from '#lib/components/icons/PiLogo.svelte';
  import SmeltLogo from '#lib/components/icons/SmeltLogo.svelte';
</script>

I'm working on an open-source coding agent called smelt. I want it to be fast
and lean, with all the features of the other agents. I'm biased, so I needed an
honest way to check my progress.

<!-- prettier-ignore -->
I wrote a [benchmark](https://leonardcser.github.io/harness-resource-bench) that captures the cost of running an agent. I ran it on
<ClaudeLogo />, <CodexLogo />, <FxLogo />, <OmpLogo />, <OpencodeLogo />, <PiLogo /> and <SmeltLogo />.
Here are the best results, including where smelt falls short.

## Takeaways

1. Memory use differs by up to 74x between agents.
2. The TUI adds as much CPU as the work itself.
3. smelt has the cheapest engine, but the TUI adds 13 times more CPU.

## How I measured

1. All agents get the same scripted model, so their replies and tool calls are
   identical.
2. Each run uses a new container with 2 CPUs.
3. CPU and memory are read every 100 ms, from outside the container.
4. Each case runs 3 times. The charts show the median, and the whiskers are the
   lowest and highest run.

The
[benchmark is open source](https://github.com/leonardcser/harness-resource-bench)
and I ran the following versions: claude code 2.1.319, codex 0.167.0, fx 0.0.16,
omp 18.18.0, opencode 2.2.6, pi 1.5.0 and smelt 0.8.0. Newer versions may
differ.

## Memory varies 74x

<BenchFootprint />

opencode takes 430 MiB directly after starting. fx takes 5.8 MiB. smelt takes 19
MiB.

## The TUI costs as much as the task

<BenchCpuSplit />

Drawing onto the terminal costs as much CPU as the task itself or more. codex,
omp and opencode are exceptions.

<BenchStream />

A faster model makes it worse. From 30 to 1,000 tokens per second, claude code
goes from 3% to 43% of one core, opencode from 4% to 48%.

## Where smelt falls short

The smelt engine uses the least CPU. 0.12 s is spent on the task. The TUI adds
1.5 s to it. That's 13 times more. With the TUI, smelt uses more CPU than pi
(1.4 s). The UI is where smelt can improve most.

## Limits

I wrote the benchmark as well as smelt, and I built smelt with these numbers in
front of me. It's a scripted model, so none of this gives us any idea of the
quality of answers. It all ran on one Ryzen 9 7900X machine. The specifics of
each agent's setup are in the repo.

The [full results](https://leonardcser.github.io/harness-resource-bench) have
every chart, including idle CPU, startup and long sessions.
