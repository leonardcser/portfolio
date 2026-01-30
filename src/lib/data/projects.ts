import { BsGithub } from 'svelte-icons-pack/bs';
import { IoNewspaper } from 'svelte-icons-pack/io';
import { LuGlobe } from 'svelte-icons-pack/lu';
import type { IconType } from 'svelte-icons-pack';

export interface ProjectLinkTag {
  label: string;
  href: string;
  icon?: IconType;
}

export interface ProjectDemo {
  type: 'image' | 'video';
  src: string;
  description: string;
  class?: string;
}

export interface ProjectLayout {
  class?: string;
  demoClass?: string;
  contentClass?: string;
}

export interface GridConfig {
  row: string; // Identifier for projects in the same row
  cols: 2 | 5; // Number of grid columns
  span: number; // How many columns this project spans
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  linkTags?: ProjectLinkTag[];
  awards?: string[];
  description: string;
  demo?: ProjectDemo;
  layout?: ProjectLayout;
  grid?: GridConfig; // Grid layout configuration for /projects page
  category: 'professional' | 'personal';
}

export const allProjects: Project[] = [
  // Professional Work
  {
    id: 'greenland-lakes',
    title: 'Greenland Supraglacial Lakes Detection',
    tags: ['MLOps', 'PyTorch', 'DVC'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/swiss-ai-center/giscup2023-resnet-unet',
        icon: BsGithub,
      },
      {
        label: 'Read Paper',
        href: 'https://dl.acm.org/doi/10.1145/3589132.3629970',
        icon: IoNewspaper,
      },
    ],
    awards: ['1st Place ACM SIGSPATIAL 2023'],
    description:
      'This project was part of a ACM SIGSPATIAL competition. We segmented supraglacial lakes in Greenland using satellite images. We worked in a team of 5 at <strong class="text-red-600">HEIG-VD</strong> and obtained 1st place.',
    demo: {
      type: 'image',
      src: '/images/lakes.png',
      description:
        'Satellite imagery showing supraglacial lake segmentation results on Greenland ice sheet',
      class: 'h-40 w-full object-cover',
    },
    layout: {
      demoClass: 'w-full',
    },
    category: 'professional',
  },
  {
    id: 'dafthunk',
    title: 'Dafthunk',
    tags: ['React', 'Hono', 'Cloudflare'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/dafthunk-com/dafthunk',
        icon: BsGithub,
      },
      {
        label: 'Vist Site',
        href: 'https://dafthunk.com',
        icon: LuGlobe,
      },
    ],
    description:
      "Contributed in building a workflow execution platform on top of Cloudflare's infrastructure.",
    demo: {
      type: 'image',
      src: '/images/dafthunk.png',
      description: 'Dafthunk workflow execution platform interface',
    },
    category: 'professional',
  },
  {
    id: 'mlops-guide',
    title: 'A Guide To MLOps',
    tags: ['DVC', 'GCP', 'BentoML', 'LabelStudio', 'Kubernetes'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/swiss-ai-center/a-guide-to-mlops',
        icon: BsGithub,
      },
      {
        label: 'Visit Site',
        href: 'https://mlops.swiss-ai-center.ch',
        icon: LuGlobe,
      },
    ],
    description:
      'Collaborated on authoring a machine learning operations guide for companies and Master students. The guide covers training a model locally, creating a pipline to evalute, reproduce and deploy, and labelling new data with assisted predictions (Human-in-the-loop).',
    demo: {
      type: 'image',
      src: '/images/guide_mlops.png',
      description: 'A Guide to MLOps documentation homepage showcasing the complete ML pipeline',
    },
    category: 'professional',
  },
  {
    id: 'license-plate',
    title: 'Swiss License Plate Detection',
    tags: ['MLOps', 'PyTorch', 'Kubernetes', 'DVC'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/swiss-ai-center/pytorch-license-plate-with-mlops',
        icon: BsGithub,
      },
    ],
    description:
      'This project was part of research into Machine Learning Operations (MLOps) at <strong class="text-red-600">HEIG-VD</strong>. It is comprised of two models: one for detecting the license plate and another for recognizing the characters. The key feature is a custom license plate generator in order to train on synthetic data.',
    demo: {
      type: 'image',
      src: '/images/license_plate.png',
      description: 'DVC pipeline DAG for Swiss license plate detection and OCR model training',
    },
    layout: {
      class: 'grid-cols-5 items-center gap-10 sm:grid',
      demoClass: 'col-span-2',
      contentClass: 'col-span-3',
    },
    category: 'professional',
  },
  {
    id: 'mdwrap',
    title: 'mdwrap',
    tags: ['Python'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/swiss-ai-center/mdwrap',
        icon: BsGithub,
      },
    ],
    description:
      "Implemented a Python markdown formatter and line wrapper without any dependencies. It uses a simple state machine, tokenization and regex... (though I'd approach it differently now). This was used for the 'A Guide To MLOps'.",
    category: 'professional',
  },

  // Personal Projects
  {
    id: 'code-llm',
    title: 'CodeLLM',
    tags: ['PyTorch', 'C++', 'Transformers', 'Lightning', 'DVC'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/code-llm',
        icon: BsGithub,
      },
    ],
    description:
      'Training a code completion language model from scratch based on Qwen3 architecture using a custom BPE tokenizer implemented in C++. The model achieves 496 tokens/second inference on NVIDIA RTX 5070 Ti and converges to under 10 perplexity on Python code.',
    demo: {
      type: 'image',
      src: '/images/code-llm-perplexity.png',
      description:
        'Training metrics showing model perplexity converging below 10 on Python code dataset',
      class: 'h-40 w-full object-cover',
    },
    grid: { row: 'row-1', cols: 2, span: 1 },
    category: 'personal',
  },
  {
    id: 'mathsnip',
    title: 'MathSnip',
    tags: ['Swift', 'SwiftUI', 'CoreML', 'PyTorch'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/mathsnip',
        icon: BsGithub,
      },
    ],
    description:
      'A macOS menu bar app for converting mathematical equations into LaTeX and Typst formats. Uses on-device CoreML inference.',
    demo: {
      type: 'image',
      src: '/images/mathsnip.png',
      description: 'MathSnip macOS menu bar app for converting mathematical equations to LaTeX',
      class: 'h-40 w-full object-cover',
    },
    grid: { row: 'row-1', cols: 2, span: 1 },
    category: 'personal',
  },
  {
    id: 'texttap',
    title: 'TextTap',
    tags: ['Swift', 'WhisperKit', 'macOS'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/texttap',
        icon: BsGithub,
      },
    ],
    description:
      'A macOS menu bar app for hands-free voice-to-text dictation. Uses on-device Whisper speech recognition with automatic silence detection.',
    demo: {
      type: 'image',
      src: '/images/texttap.gif',
      description: 'TextTap demo showing voice-to-text dictation with cursor indicator',
    },
    grid: { row: 'row-2', cols: 2, span: 1 },
    category: 'personal',
  },
  {
    id: 'cursortab',
    title: 'cursortab.nvim',
    tags: ['Lua', 'Go', 'Neovim'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/cursortab.nvim',
        icon: BsGithub,
      },
    ],
    description:
      'A Neovim plugin for edit completions and cursor position predictions. Supports custom models and integrations with Zeta and SweepAI backends. Features multi-line completions with fast inference (~500ms CPU, <100ms GPU).',
    demo: {
      type: 'image',
      src: '/images/cursortab.gif',
      description: 'cursortab.nvim demo showing edit completions and cursor predictions in Neovim',
    },
    grid: { row: 'row-2', cols: 2, span: 1 },
    category: 'personal',
  },
  {
    id: 'memsched',
    title: 'MEMsched',
    tags: ['Typescript', 'SvelteKit', 'Stripe', 'SQLite', 'Cloudflare'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/memsched/memsched',
        icon: BsGithub,
      },
      {
        label: 'Visit Site',
        href: 'https://memsched.com',
        icon: LuGlobe,
      },
    ],
    description:
      'Built an online platform to create live widgets for users to share their progress with the world.',
    demo: {
      type: 'video',
      src: '/videos/memsched',
      description: 'MEMsched platform demo showing live widget creation and progress tracking',
    },
    category: 'personal',
  },
  {
    id: 'commit',
    title: 'commit.',
    tags: ['Figma', 'Expo', 'Hono', 'Stripe', 'Cloudflare', 'HEIG-VD'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/getcommitapp/commit',
        icon: BsGithub,
      },
      {
        label: 'Visit Site',
        href: 'https://commit.leo-c50.workers.dev',
        icon: LuGlobe,
      },
    ],
    description:
      'Developed an application for creating goals with money on the line. We built the project in 3 weeks during the PDG (projet de groupe) class at <strong class="text-red-600">HEIG-VD</strong> in a group of 4.',
    demo: {
      type: 'video',
      src: '/videos/commit',
      description: 'commit. app demo showing goal creation with financial accountability feature',
    },
    category: 'personal',
  },
  {
    id: 'scrapeout',
    title: 'Scrapeout',
    tags: ['Typescript', 'SCSS', 'Django', 'Terraform', 'Docker', 'AWS', 'PostgreSQL', 'Neo4j'],
    awards: ['1st Place Hackathon', 'AWS Certified'],
    description:
      'Built a platform for businesses to identify conflict of interest in their data in order to take more informed decisions. Neo4j was used extensively to model complex graph relations.',
    demo: {
      type: 'video',
      src: '/videos/scrapeout',
      description:
        'Scrapeout platform demo displaying conflict of interest graph visualization with Neo4j',
    },
    category: 'personal',
  },
  {
    id: 'captcha-solver',
    title: 'Captcha Solver',
    tags: ['Tensorflow', 'GCP', 'OpenCV'],
    description:
      'Built a neural network to solve 6 character captchas from Amazon along with a synthetic data generation using computer graphics techniques. I achieved an average accuracy of 93% on the test set.',
    demo: {
      type: 'image',
      src: '/images/amazoncaptcha.jpg',
      description:
        'Amazon CAPTCHA example with 6 distorted characters used for neural network training',
    },
    grid: { row: 'row-5', cols: 5, span: 3 },
    category: 'personal',
  },
  {
    id: 'chess-engine',
    title: 'Chess Engine',
    tags: ['Java', 'HEIG-VD'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/HEIG-VD-BA3-POO/labo08',
        icon: BsGithub,
      },
    ],
    description:
      'Developed a chess engine during OOP Java course at <strong class="text-red-600">HEIG-VD</strong>.',
    demo: {
      type: 'image',
      src: '/images/chess.png',
      description: 'Chess engine GUI showing an active game with piece movement and board state',
    },
    grid: { row: 'row-5', cols: 5, span: 2 },
    category: 'personal',
  },
  {
    id: 'slither-rl',
    title: 'Slither.io RL',
    tags: ['Tensorflow', 'Selenium', 'OpenCV'],
    description:
      'Created a neural network to play the game Slither.io. The agent was trained using A2C (actor to critic) reinforcement learning. The agent was able to collect food and avoid other snakes.',
    demo: {
      type: 'video',
      src: '/videos/SlitherIORL',
      description:
        'Reinforcement learning agent playing Slither.io, collecting food and avoiding collisions',
    },
    grid: { row: 'row-6', cols: 2, span: 1 },
    category: 'personal',
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    tags: ['Java', 'EPFL'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/CS107-MP2-2020-V2',
        icon: BsGithub,
      },
    ],
    awards: ['1st Place EPFL'],
    description:
      'Remake of the classic Pacman game. This project was done in a team of 2 for the Introduction to Programming (CS-107) course at <strong class="text-red-600">EPFL</strong>.<br />It includes all ghosts and their AI, a map editor, a leaderboard system, custom menu and more.',
    demo: {
      type: 'video',
      src: '/videos/pacman',
      description: 'Pac-Man remake gameplay showing ghost AI behavior and custom level design',
    },
    grid: { row: 'row-6', cols: 2, span: 1 },
    category: 'personal',
  },
  {
    id: 'mcp-nvim-lsp',
    title: 'mcp-nvim-lsp',
    tags: ['Lua', 'Go'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/nvim-lsp-mcp',
        icon: BsGithub,
      },
    ],
    description:
      'Created a MCP (Model Context Protocol) server for fetching Nvim LSP diagnostics through RPC.',
    category: 'personal',
  },
  {
    id: 'wpm-tracker',
    title: 'wpm-tracker.nvim',
    tags: ['Lua', 'Neovim'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/wpm-tracker.nvim',
        icon: BsGithub,
      },
    ],
    description:
      'A Neovim plugin for measuring typing speed with granular tracking. Distinguishes between unassisted keystrokes and AI-enhanced input, exports session data to CSV, and provides lualine integration.',
    category: 'personal',
  },
  {
    id: 'nvim-tree-crossclip',
    title: 'nvim-tree-crossclip.nvim',
    tags: ['Lua', 'Neovim'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/nvim-tree-crossclip.nvim',
        icon: BsGithub,
      },
    ],
    description:
      'A persistent clipboard plugin for nvim-tree.lua. Allows file copy/cut/paste operations to survive across Neovim sessions by storing selections to disk.',
    category: 'personal',
  },
  {
    id: 'web-mcp',
    title: 'web-mcp',
    tags: ['Go', 'MCP'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/web-mcp',
        icon: BsGithub,
      },
    ],
    description: 'A Model Context Protocol server providing web search and content retrieval.',
    category: 'personal',
  },
  {
    id: 'vite-react-ssr',
    title: 'vite-react-head-ssr',
    tags: ['React', 'Vite'],
    linkTags: [
      {
        label: 'GitHub',
        href: 'https://github.com/leonardcser/vite-react-head-ssr',
        icon: BsGithub,
      },
    ],
    description:
      'Built a custom server with vite to SSR (server side rendered) the HTML Head of the page and CSR (client side rendering) for the HTML body.',
    category: 'personal',
  },
];

export const featuredProjectIds = [
  'greenland-lakes',
  'dafthunk',
  'mlops-guide',
  'code-llm',
  'mathsnip',
  'memsched',
];

export function getFeaturedProjects(): Project[] {
  return featuredProjectIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);
}

export function getAllProjects(): Project[] {
  return allProjects;
}

// Project categories for filtering (by project ID)
export const projectCategories: { name: string; projectIds: string[] }[] = [
  {
    name: 'ML/AI',
    projectIds: [
      'greenland-lakes',
      'mlops-guide',
      'license-plate',
      'code-llm',
      'cursortab',
      'mathsnip',
      'texttap',
      'captcha-solver',
      'slither-rl',
    ],
  },
  {
    name: 'Web',
    projectIds: ['dafthunk', 'memsched', 'commit', 'scrapeout', 'vite-react-ssr'],
  },
  {
    name: 'Native',
    projectIds: ['mathsnip', 'texttap', 'commit'],
  },
  {
    name: 'Games',
    projectIds: ['chess-engine', 'pacman', 'slither-rl'],
  },
  {
    name: 'MCP',
    projectIds: ['mcp-nvim-lsp', 'web-mcp'],
  },
  {
    name: 'Neovim',
    projectIds: ['cursortab', 'mcp-nvim-lsp', 'wpm-tracker', 'nvim-tree-crossclip'],
  },
];

// Utility: compute figure numbers for projects with demos
export function computeFigureNumbers(projects: Project[]): Map<string, number> {
  const numbers = new Map<string, number>();
  let counter = 0;
  for (const project of projects) {
    if (project.demo) {
      numbers.set(project.id, ++counter);
    }
  }
  return numbers;
}

// Utility: group projects by grid row for layout
export interface ProjectGroup {
  gridRow: string | null;
  projects: Project[];
}

export function groupByGridRow(projects: Project[]): ProjectGroup[] {
  const groups: ProjectGroup[] = [];
  let currentGroup: ProjectGroup | null = null;

  for (const project of projects) {
    const gridRow = project.grid?.row ?? null;

    if (gridRow !== null && currentGroup !== null && currentGroup.gridRow === gridRow) {
      // Add to existing grid group
      currentGroup.projects.push(project);
    } else {
      // Start a new group
      currentGroup = { gridRow, projects: [project] };
      groups.push(currentGroup);
    }
  }

  return groups;
}

// Group projects for filtered view - pairs grid projects together, full-width projects stay alone
export function groupFilteredProjects(projects: Project[]): ProjectGroup[] {
  const groups: ProjectGroup[] = [];
  let currentPair: Project[] = [];
  let pairIndex = 0;

  for (const project of projects) {
    if (!project.grid) {
      // Full-width project - flush current pair first, then add as own group
      if (currentPair.length > 0) {
        groups.push({ gridRow: `filtered-pair-${pairIndex++}`, projects: currentPair });
        currentPair = [];
      }
      groups.push({ gridRow: null, projects: [project] });
    } else {
      // Grid project - add to current pair
      currentPair.push(project);
      if (currentPair.length === 2) {
        groups.push({ gridRow: `filtered-pair-${pairIndex++}`, projects: currentPair });
        currentPair = [];
      }
    }
  }

  // Flush remaining pair
  if (currentPair.length > 0) {
    groups.push({ gridRow: `filtered-pair-${pairIndex++}`, projects: currentPair });
  }

  return groups;
}
