<script lang="ts">
  import Header, { headerHeight, headerLeftPadding } from '$lib/components/Header.svelte';
  import Block from '$lib/components/Block.svelte';
  import ProjectItem from '$lib/components/ProjectItem.svelte';
  import { BsGithub } from 'svelte-icons-pack/bs';
  import { IoNewspaper } from 'svelte-icons-pack/io';
  import AutoplayVideo from '$lib/components/AutoplayVideo.svelte';
  import { LuGlobe } from 'svelte-icons-pack/lu';
  import SwissFlag from '$lib/components/SwissFlag.svelte';
  import { Icon } from 'svelte-icons-pack';
  import WidgetImage from '$lib/components/WidgetImage.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';
  import Image from '$lib/components/Image.svelte';

  const journeyItems = [
    {
      logo: '/images/logo_epfl.png',
      title: 'École Polytechnique Fédérale de Lausanne (EPFL)',
      description:
        'I discoved my passion for computer science here at EPFL. I studied OOP in Java and Numerical Computation.',
      date: '2020 - 2023',
    },
    {
      logo: '/images/logo_epflentrepreneurclub.png',
      title: 'EPFL Entrepreneur Club',
      description:
        'During my studies, I was a member of the EPFL Entrepreneur Club where I was able to learn from and collaborate with other entrepreneurs.',
      date: '2021 - 2023',
    },
    {
      logo: '/images/logo_scrapeout.png',
      title: 'Scrapeout',
      description:
        'I founded a data analytics company tackling fraud prevention and detection of conflicts of interest. I was able to learn about real life entrepreneurship and manage challenges along the business growth.',
      date: '2021 - 2023',
    },
    {
      logo: '/images/logo_heig-vd.png',
      title: 'HEIG-VD',
      description:
        'I am currently studying at HEIG-VD in order to deepen my knowledge in machine learning. I am also working as a student assistant working on various ML and MLOps projects.',
      date: '2023 - Present',
    },
  ];
</script>

<Header />
<div class="main-container flex" style:padding-top="{headerHeight}px">
  <aside class="hidden shrink-0 lg:block" style={`width:${headerLeftPadding}px`}>
    <TableOfContents />
  </aside>
  <main class="relative flex min-h-screen flex-1 flex-col items-center lg:items-start">
    <Block>
      <p>Welcome to my portfolio!</p>
      <p>
        I'm a <span class="font-semibold">ML and software</span> student based in Switzerland <SwissFlag
          class="me-1 mb-1 inline size-3.5"
        />. I love working problems and I am a curious learner.
      </p>
      <p>I've built these live widgets to share my current goals:</p>
      <div class="not-prose flex flex-wrap gap-2">
        <WidgetImage
          widget={{
            id: '02d23572-ad59-4ea2-8a97-ed209251f83b',
            title: 'Understanding Deep Learning',
            subtitle: 'Machine learning book',
          }}
          width={430}
          height={75}
          href="https://github.com/leonardcser/understanding-deep-learning"
          data-umami-event="understanding-deep-learning-widget-link"
        />
        <WidgetImage
          widget={{
            id: '7f24d256-c9df-4f6d-9094-37811e56e0a7',
            title: 'Introduction to Deep Learning - MIT 6.S191',
            subtitle: 'MIT 6.S191',
          }}
          width={360}
          height={75}
          href="https://github.com/leonardcser/introtodeeplearning"
          data-umami-event="github-commits-widget-link"
        />
        <WidgetImage
          widget={{
            id: '77178590-1aa8-4ab4-bfbf-2c6abe0c367f',
            title: 'GitHub Commits - Public contributions',
            subtitle: 'Public contributions',
          }}
          width={327}
          height={75}
          href="https://github.com/leonardcser"
          data-umami-event="github-commits-widget-link"
        />
        <WidgetImage
          widget={{
            id: '4fa0ef32-09d6-4038-94d8-e7caf8672c0f',
            title: 'LeetCode - Problems Solved',
            subtitle: 'Problems solved',
          }}
          width={333}
          height={75}
          href="https://github.com/leonardcser/leetcode"
          data-umami-event="leetcode-widget-link"
        />
      </div>
      <p>
        You can find more technical details of my projects on my
        <a
          href="https://github.com/leonardcser"
          class="inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <Icon src={BsGithub} />
        </a>
        .
      </p>
    </Block>
    <Block>
      <h2 id="journey">Journey</h2>
      <Timeline items={journeyItems} />
    </Block>
    <section class="*:border-b">
      <Block>
        <h2 id="professional-work">Professional Work</h2>
        <p>
          This section showcases selected projects and achievements from my professional experience.
        </p>
        <ProjectItem
          id="greenland-lakes"
          title="Greenland Supraglacial Lakes Detection"
          tags={['MLOps', 'PyTorch', 'DVC']}
          linkTags={[
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
          ]}
          awards={['1st Place ACM SIGSPATIAL 2023']}
          demoClass="w-full"
        >
          {#snippet demo()}
            <Image
              src="/images/lakes.png"
              description="Satellite imagery showing supraglacial lake segmentation results on Greenland ice sheet"
              figureNumber={1}
              class="h-40 w-full object-cover"
            />
          {/snippet}
          This project was part of a ACM SIGSPATIAL competition. We segmented supraglacial lakes in Greenland
          using satellite images. We worked in a team of 5 at
          <strong class="text-red-600">HEIG-VD</strong> and obtained 1st place.
        </ProjectItem>
      </Block>
      <Block>
        <ProjectItem
          id="dafthunk"
          title="Dafthunk"
          tags={['React', 'Hono', 'Cloudflare']}
          linkTags={[
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
          ]}
        >
          {#snippet demo()}
            <Image
              src="/images/dafthunk.png"
              description="Dafthunk workflow execution platform interface"
              figureNumber={2}
            />
          {/snippet}
          Contributed in building a workflow execution platform on top of Cloudflare's infrastructure.
        </ProjectItem>
      </Block>

      <Block>
        <ProjectItem
          id="mlops-guide"
          title="A Guide To MLOps"
          tags={['DVC', 'GCP', 'BentoML', 'LabelStudio', 'Kubernetes']}
          linkTags={[
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
          ]}
        >
          {#snippet demo()}
            <Image
              src="/images/guide_mlops.png"
              description="A Guide to MLOps documentation homepage showcasing the complete ML pipeline"
              figureNumber={3}
            />
          {/snippet}
          Collaborated on authoring a machine learning operations guide for companies and Master students.
          The guide covers training a model locally, creating a pipline to evalute, reproduce and deploy,
          and labelling new data with assisted predictions (Human-in-the-loop).
        </ProjectItem>
      </Block>
      <Block>
        <ProjectItem
          id="license-plate"
          class="grid-cols-5 items-center gap-10 sm:grid"
          demoClass="col-span-2"
          contentClass="col-span-3"
          title="Swiss License Plate Detection"
          tags={['MLOps', 'PyTorch', 'Kubernetes', 'DVC']}
          linkTags={[
            {
              label: 'GitHub',
              href: 'https://github.com/swiss-ai-center/pytorch-license-plate-with-mlops',
              icon: BsGithub,
            },
          ]}
        >
          {#snippet demo()}
            <Image
              src="/images/license_plate.png"
              description="DVC pipeline DAG for Swiss license plate detection and OCR model training"
              figureNumber={4}
            />
          {/snippet}
          This project was part of research into Machine Learning Operations (MLOps) at
          <strong class="text-red-600">HEIG-VD</strong>. It is comprised of two models: one for
          detecting the license plate and another for recognizing the characters. The key feature is
          a custom license plate generator in order to train on synthetic data.
        </ProjectItem>
      </Block>
      <Block>
        <ProjectItem
          id="mdwrap"
          title="mdwrap"
          tags={['Python']}
          linkTags={[
            {
              label: 'GitHub',
              href: 'https://github.com/swiss-ai-center/mdwrap',
              icon: BsGithub,
            },
          ]}
        >
          Implemented a Python markdown formatter and line wrapper without any dependencies. It uses
          a simple state machine, tokenization and regex... (though I'd approach it differently
          now). This was used for the 'A Guide To MLOps'.
        </ProjectItem>
      </Block>
    </section>

    <section class="*:border-b">
      <Block class="pt-12">
        <h2 id="projects">Projects</h2>
        <p>The following are a selection of projects that I have accomplished over time.</p>
        <div class="grid-cols-2 max-sm:space-y-6 sm:grid sm:gap-6">
          <ProjectItem
            id="code-llm"
            title="CodeLLM"
            tags={['PyTorch', 'C++', 'Transformers', 'Lightning', 'DVC']}
            linkTags={[
              {
                label: 'GitHub',
                href: 'https://github.com/leonardcser/code-llm',
                icon: BsGithub,
              },
            ]}
          >
            {#snippet demo()}
              <Image
                src="/images/code-llm-perplexity.png"
                description="Training metrics showing model perplexity converging below 10 on Python code dataset"
                figureNumber={5}
                class="h-40 w-full object-cover"
              />
            {/snippet}
            Training a code completion language model from scratch based on Qwen3 architecture using a
            custom BPE tokenizer implemented in C++. The model achieves 496 tokens/second inference on
            NVIDIA RTX 5070 Ti and converges to under 10 perplexity on Python code.
          </ProjectItem>
          <ProjectItem
            id="mathsnip"
            title="MathSnip"
            tags={['Swift', 'SwiftUI', 'CoreML', 'PyTorch']}
            linkTags={[
              {
                label: 'GitHub',
                href: 'https://github.com/leonardcser/mathsnip',
                icon: BsGithub,
              },
            ]}
          >
            {#snippet demo()}
              <Image
                src="/images/mathsnip.png"
                description="MathSnip macOS menu bar app for converting mathematical equations to LaTeX"
                figureNumber={6}
                class="h-40 w-full object-cover"
              />
            {/snippet}
            A macOS menu bar app for converting mathematical equations into LaTeX and Typst formats. Uses
            on-device CoreML inference.
          </ProjectItem>
        </div>
      </Block>
      <Block>
        <ProjectItem
          id="memsched"
          title="MEMsched"
          tags={['Typescript', 'SvelteKit', 'Stripe', 'SQLite', 'Cloudflare']}
          linkTags={[
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
          ]}
        >
          {#snippet demo()}
            <AutoplayVideo
              src="/videos/memsched"
              description="MEMsched platform demo showing live widget creation and progress tracking"
              figureNumber={7}
            />
          {/snippet}
          Built an online platform to create live widgets for users to share their progress with the world.
        </ProjectItem>
      </Block>
      <Block>
        <ProjectItem
          id="commit"
          title="commit."
          tags={['Figma', 'Expo', 'Hono', 'Stripe', 'Cloudflare', 'HEIG-VD']}
          linkTags={[
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
          ]}
        >
          {#snippet demo()}
            <AutoplayVideo
              src="/videos/commit"
              description="commit. app demo showing goal creation with financial accountability feature"
              figureNumber={8}
            />
          {/snippet}
          Developed an application for creating goals with money on the line. We built the project in
          3 weeks during the PDG (projet de groupe) class at
          <strong class="text-red-600">HEIG-VD</strong> in a group of 4.
        </ProjectItem>
      </Block>

      <Block>
        <ProjectItem
          id="scrapeout"
          title="Scrapeout"
          tags={[
            'Typescript',
            'SCSS',
            'Django',
            'Terraform',
            'Docker',
            'AWS',
            'PostgreSQL',
            'Neo4j',
          ]}
          awards={['1st Place Hackathon', 'AWS Certified']}
        >
          {#snippet demo()}
            <AutoplayVideo
              src="/videos/scrapeout"
              description="Scrapeout platform demo displaying conflict of interest graph visualization with Neo4j"
              figureNumber={9}
            />
          {/snippet}
          Built a platform for businesses to identify conflict of interest in their data in order to take
          more informed decisions. Neo4j was used extensively to model complex graph relations.
        </ProjectItem>
      </Block>

      <Block>
        <div class="grid-cols-5 max-sm:space-y-6 sm:grid sm:gap-6">
          <ProjectItem
            id="captcha-solver"
            class="col-span-3"
            title="Captcha Solver"
            tags={['Tensorflow', 'GCP', 'OpenCV']}
          >
            {#snippet demo()}
              <Image
                src="/images/amazoncaptcha.jpg"
                description="Amazon CAPTCHA example with 6 distorted characters used for neural network training"
                figureNumber={10}
              />
            {/snippet}
            Built a neural network to solve 6 character captchas from Amazon along with a synthetic data
            generation using computer graphics techniques. I achieved an average accuracy of 93% on the
            test set.
          </ProjectItem>
          <ProjectItem
            id="chess-engine"
            class="col-span-2"
            title="Chess Engine"
            tags={['Java', 'HEIG-VD']}
            linkTags={[
              {
                label: 'GitHub',
                href: 'https://github.com/HEIG-VD-BA3-POO/labo08',
                icon: BsGithub,
              },
            ]}
          >
            {#snippet demo()}
              <Image
                src="/images/chess.png"
                description="Chess engine GUI showing an active game with piece movement and board state"
                figureNumber={11}
              />
            {/snippet}
            Developed a chess engine during OOP Java course at
            <strong class="text-red-600">HEIG-VD</strong>.
          </ProjectItem>
        </div>
      </Block>
      <Block>
        <div class="grid-cols-2 max-sm:space-y-6 sm:grid sm:gap-6">
          <ProjectItem
            id="slither-rl"
            title="Slither.io RL"
            tags={['Tensorflow', 'Selenium', 'OpenCV']}
          >
            {#snippet demo()}
              <AutoplayVideo
                src="/videos/SlitherIORL"
                description="Reinforcement learning agent playing Slither.io, collecting food and avoiding collisions"
                figureNumber={12}
              />
            {/snippet}
            Created a neural network to play the game Slither.io. The agent was trained using A2C (actor
            to critic) reinforcement learning. The agent was able to collect food and avoid other snakes.
          </ProjectItem>
          <ProjectItem
            id="pacman"
            title="Pac-Man"
            tags={['Java', 'EPFL']}
            linkTags={[
              {
                label: 'GitHub',
                href: 'https://github.com/leonardcser/CS107-MP2-2020-V2',
                icon: BsGithub,
              },
            ]}
            awards={['1st Place EPFL']}
          >
            {#snippet demo()}
              <AutoplayVideo
                src="/videos/pacman"
                description="Pac-Man remake gameplay showing ghost AI behavior and custom level design"
                figureNumber={13}
              />
            {/snippet}
            Remake of the classic Pacman game. This project was done in a team of 2 for the Introduction
            to Programming (CS-107) course at
            <strong class="text-red-600">EPFL</strong>.
            <br />
            It includes all ghosts and their AI, a map editor, a leaderboard system, custom menu and more.
          </ProjectItem>
        </div>
      </Block>
      <Block>
        <ProjectItem
          id="mcp-nvim-lsp"
          title="MCP Nvim LSP"
          tags={['Lua', 'Go']}
          linkTags={[
            {
              label: 'GitHub',
              href: 'https://github.com/leonardcser/nvim-lsp-mcp',
              icon: BsGithub,
            },
          ]}
        >
          Created a MCP (Model Context Protocol) server for fetching Nvim LSP diagnostics through
          RPC.
        </ProjectItem>
      </Block>
      <Block>
        <ProjectItem
          id="vite-react-ssr"
          title="Vite React Head SSR"
          tags={['React', 'Vite']}
          linkTags={[
            {
              label: 'GitHub',
              href: 'https://github.com/leonardcser/vite-react-head-ssr',
              icon: BsGithub,
            },
          ]}
        >
          Built a custom server with vite to SSR (server side rendered) the HTML Head of the page
          and CSR (client side rendering) for the HTML body.
        </ProjectItem>
      </Block>
    </section>
    <Block class="mask-b-from-50% pt-20 pb-12">
      <Footer />
    </Block>
  </main>
</div>
