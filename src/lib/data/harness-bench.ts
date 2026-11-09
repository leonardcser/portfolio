// Medians of 3 runs per case, measured 2026-11-08 and 2026-11-09 on one Ryzen 9 7900X host.
// https://github.com/leonardcser/harness-resource-bench (bench/results/published)

export type AgentId = 'smelt' | 'pi' | 'omp' | 'codex' | 'claude' | 'opencode' | 'fx';

export interface Agent {
  id: AgentId;
  name: string;
  language: string;
  // Compiled to a native binary, versus a JavaScript runtime plus bundled code.
  native: boolean;
}

// Line charts and ties use this order.
export const agentOrder: AgentId[] = ['claude', 'codex', 'fx', 'omp', 'opencode', 'pi', 'smelt'];

// Bar charts list agents by value, lowest cost first.
export const byValue = (value: (id: AgentId) => number): AgentId[] =>
  [...agentOrder].sort((a, b) => value(a) - value(b));

export const agents: Record<AgentId, Agent> = {
  smelt: { id: 'smelt', name: 'smelt', language: 'Rust', native: true },
  omp: { id: 'omp', name: 'omp', language: 'Bun', native: false },
  pi: { id: 'pi', name: 'pi', language: 'Node', native: false },
  codex: { id: 'codex', name: 'codex', language: 'Rust', native: true },
  claude: { id: 'claude', name: 'claude code', language: 'Bun', native: false },
  opencode: { id: 'opencode', name: 'opencode', language: 'Bun', native: false },
  fx: { id: 'fx', name: 'fx', language: 'Zig', native: true },
};

// Median, lowest and highest of the 3 runs.
export interface Stat {
  median: number;
  min: number;
  max: number;
}

// MiB after launch, all of an agent's processes together.
export const memory: Record<AgentId, Stat> = {
  claude: { median: 173.9, min: 173.7, max: 174.1 },
  codex: { median: 126.8, min: 126, max: 145.4 },
  fx: { median: 5.824, min: 5.824, max: 5.828 },
  omp: { median: 284.5, min: 255.5, max: 308.1 },
  opencode: { median: 430.3, min: 408, max: 430.7 },
  pi: { median: 100.7, min: 100.1, max: 100.8 },
  smelt: { median: 19.27, min: 19.17, max: 19.49 },
};

// Milliseconds from exec until a typed key is echoed.
export const startupMs: Record<AgentId, Stat> = {
  claude: { median: 267.1, min: 264.7, max: 269.5 },
  codex: { median: 75.85, min: 75.53, max: 80.64 },
  fx: { median: 6.973, min: 6.527, max: 7.245 },
  omp: { median: 822.2, min: 821.7, max: 823.2 },
  opencode: { median: 819.8, min: 818.9, max: 899.6 },
  pi: { median: 287.8, min: 284.4, max: 290.2 },
  smelt: { median: 35.53, min: 34.68, max: 37.04 },
};

// CPU seconds for one task with 24 tool calls, model streaming 120 tokens/s.
export const taskCpu: Record<AgentId, { headless: Stat; tui: Stat }> = {
  claude: {
    headless: { median: 1.406, min: 1.387, max: 1.558 },
    tui: { median: 3.482, min: 3.458, max: 3.545 },
  },
  codex: {
    headless: { median: 1.652, min: 1.606, max: 1.666 },
    tui: { median: 2.591, min: 2.59, max: 2.613 },
  },
  fx: {
    headless: { median: 0.1974, min: 0.1956, max: 0.2027 },
    tui: { median: 1.852, min: 1.827, max: 1.853 },
  },
  omp: {
    headless: { median: 1.563, min: 1.548, max: 1.566 },
    tui: { median: 2.872, min: 2.847, max: 2.936 },
  },
  opencode: {
    headless: { median: 2.73, min: 2.14, max: 2.761 },
    tui: { median: 3.933, min: 3.898, max: 3.937 },
  },
  pi: {
    headless: { median: 0.5066, min: 0.5065, max: 0.5069 },
    tui: { median: 1.361, min: 1.358, max: 1.362 },
  },
  smelt: {
    headless: { median: 0.1206, min: 0.1199, max: 0.1267 },
    tui: { median: 1.64, min: 1.635, max: 1.644 },
  },
};

// Percent of one core while the task runs, by model streaming speed.
export const streamRates = [30, 60, 120, 250, 1000];
export const streamCpu: Record<AgentId, number[]> = {
  claude: [3.252, 5.425, 8.593, 14.94, 43.25],
  codex: [2.948, 4.091, 6.337, 11.15, 34.89],
  fx: [3.9, 4.166, 4.603, 5.678, 11.15],
  omp: [2.982, 4.402, 7.072, 12.09, 33.73],
  opencode: [3.738, 5.788, 9.724, 16.4, 48.19],
  pi: [1.289, 2.048, 3.451, 5.498, 14.92],
  smelt: [1.912, 2.671, 4.099, 7.041, 13.21],
};

// One 64-turn session. CPU milliseconds per turn, averaged over turns 1-4, 4-16, 16-32 and 32-64.
export const sessionTurns = [4, 16, 32, 64];
export const sessionCpu: Record<AgentId, number[]> = {
  claude: [905.7, 2034, 1956, 2147],
  codex: [494.9, 1325, 1320, 1314],
  fx: [257.2, 2815, 5292, 7658],
  omp: [426, 904.3, 866.1, 875.3],
  opencode: [1080, 2600, 2971, 4147],
  pi: [255.1, 903.9, 911.3, 922.7],
  smelt: [310, 910.9, 967.7, 987.3],
};

// Memory in MiB after 4, 16, 32 and 64 turns of the same session.
export const sessionMemory: Record<AgentId, number[]> = {
  claude: [343.4, 457.7, 469.2, 496.8],
  codex: [206.5, 247, 269.8, 329],
  fx: [16.03, 76.66, 148.2, 253.2],
  omp: [368.7, 425.2, 433.8, 481.9],
  opencode: [513.7, 572.5, 649.3, 717.2],
  pi: [145.4, 204.1, 210.6, 211.1],
  smelt: [49.61, 85.27, 90.81, 101.8],
};

// Cumulative CPU milliseconds after a task, with nothing on screen changing.
export const idleSeconds = [0, 30, 60, 120, 300];
export const idleCpu: Record<AgentId, number[]> = {
  claude: [0, 200, 219, 359, 504],
  codex: [0, 7, 11, 18, 34],
  fx: [0, 85, 170, 337, 849],
  omp: [0, 157, 193, 371, 785],
  opencode: [0, 390, 454, 799, 1218],
  pi: [0, 89, 89, 89, 89],
  smelt: [0, 0, 0, 0, 0],
};
