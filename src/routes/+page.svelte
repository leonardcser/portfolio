<script lang="ts">
  import Header, { headerHeight } from '$lib/components/Header.svelte';
  import Block from '$lib/components/Block.svelte';
  import ProjectItem from '$lib/components/ProjectItem.svelte';
  import { BsGithub } from 'svelte-icons-pack/bs';
  import { IoNewspaper } from 'svelte-icons-pack/io';
  import AutoplayVideo from '$lib/components/AutoplayVideo.svelte';
  import { LuGlobe } from 'svelte-icons-pack/lu';
  import SwissFlag from '$lib/components/SwissFlag.svelte';
</script>

<Header />
<div class="relative flex min-h-screen flex-col items-center" style:padding-top="{headerHeight}px">
  <Block>
    <p>Welcome to my portfolio!</p>
    <p>
      I'm a ML and software student based in Switzerland <SwissFlag class="mb-1 inline size-3.5" />.
      I love working problems and I am a curious learner.
    </p>
    <p>I've organized this page into three sections:</p>
    <ol>
      <li>Journey - My journey into the world of ML and software</li>
      <li>Professional Work - A selection of work projects</li>
      <li>Personal Projects - A collection of personal projects</li>
    </ol>
    <p>
      You can find more technical details of my projects on my <a
        href="https://github.com/leonardcser">GitHub</a
      >.
    </p>
  </Block>
  <Block>
    <h2>Journey</h2>
    <p>
      I develop effective solutions that bring measurable results. I'm a fast learner and I'm always
      looking for new challenges.
    </p>
  </Block>
  <section class="*:not-last:border-b">
    <Block>
      <h2>Professional Work</h2>
      <p>The following are a selection of works/projects that I acomplished over time.</p>
      <ProjectItem
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
      >
        {#snippet demo()}
          <enhanced:img
            loading="lazy"
            fetchpriority="low"
            src="/static/images/lakes.png"
            alt="lake segmentation"
            class="h-40 w-full object-cover"
            itemprop="image"
          />
        {/snippet}
        This project was part of a ACM SIGSPATIAL competition. The goal was to segment supraglacial lakes
        in Greenland using satellite images. We worked in a team of 5 at
        <strong class="text-red-600">HEIG-VD</strong> and obtained 1st place.
      </ProjectItem>
    </Block>
    <Block>
      <ProjectItem
        class="grid grid-cols-5 items-center gap-10"
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
          <enhanced:img
            loading="lazy"
            fetchpriority="low"
            src="/static/images/license_plate.png"
            alt="chess game"
            class="m-0"
            itemprop="image"
          />
        {/snippet}
        This project was part of research into Machine Learning Operations (MLOps) at
        <strong class="text-red-600">HEIG-VD</strong>. It is comprised of two models: one for
        detecting the license plate and another for recognizing the characters. The key feature is a
        custom license plate generator in order to train on synthetic data.
      </ProjectItem>
    </Block>
    <Block>
      <ProjectItem
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
          <enhanced:img
            loading="lazy"
            fetchpriority="low"
            src="/static/images/guide_mlops.png"
            alt="mlops guide homepage"
            class="m-0"
            itemprop="image"
          />
        {/snippet}
        Contributed in building a machine leaning operations guide for companies and Master students
        to apply.
      </ProjectItem>
    </Block>
  </section>

  <section class="*:not-last:border-b">
    <Block class="pt-12">
      <h2>Projects</h2>
      <p>The following are a selection of works/projects that I acomplished over time.</p>
      <ProjectItem
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
          <AutoplayVideo src="/videos/memsched" />
        {/snippet}
        MEMsched is an online platform that allows users to create widgets to share their progress with
        the world.
      </ProjectItem></Block
    >

    <Block>
      <ProjectItem
        title="Scrapeout"
        tags={['Typescript', 'SCSS', 'Django', 'Terraform', 'Docker', 'AWS', 'PostgreSQL', 'Neo4j']}
        awards={['1st Place Hackathon', 'AWS Certified']}
      >
        {#snippet demo()}
          <AutoplayVideo src="/videos/scrapeout" />
        {/snippet}
        Scrapeout is my most ambitious project to date. It has now become a full web tool that helps
        companies identify conflict of interest in their data in order to take more informed decisions.
      </ProjectItem>
    </Block>

    <Block>
      <div class="grid-cols-5 max-sm:space-y-6 sm:grid sm:gap-6">
        <ProjectItem
          class="col-span-3"
          title="Captcha Solver"
          tags={['Tensorflow', 'GCP', 'OpenCV']}
        >
          {#snippet demo()}
            <enhanced:img
              loading="lazy"
              fetchpriority="low"
              src="/static/images/amazoncaptcha.jpg"
              alt="amazon captcha"
              class="m-0"
              itemprop="image"
            />
          {/snippet}
          The goal of this project was to create a neural network that could solve 6 character captchas
          from Amazon. I achieved an average accuracy of 93%.
        </ProjectItem>
        <ProjectItem
          class="col-span-2"
          title="Chess Engine"
          tags={['Java', 'HEIG-VD']}
          linkTags={[
            { label: 'GitHub', href: 'https://github.com/HEIG-VD-BA3-POO/labo08', icon: BsGithub },
          ]}
        >
          {#snippet demo()}
            <enhanced:img
              loading="lazy"
              fetchpriority="low"
              src="/static/images/chess.png"
              alt="chess game"
              class="m-0"
              itemprop="image"
            />
          {/snippet}
          A simple chess engine based on OOP principles
        </ProjectItem>
      </div>
    </Block>
    <Block>
      <div class="grid-cols-2 max-sm:space-y-6 sm:grid sm:gap-6">
        <ProjectItem title="SlitherIO RL" tags={['Tensorflow', 'Selenium', 'OpenCV']}>
          {#snippet demo()}
            <AutoplayVideo src="/videos/SlitherIORL" />
          {/snippet}
          The project was to create a neural network that could play the game SlitherIO. The agent was
          trained using A2C (actor to critic) reinforcement learning. The agent was able to collect food
          and avoid other snakes.
        </ProjectItem>
        <ProjectItem
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
            <AutoplayVideo src="/videos/pacman" />
          {/snippet}
          Remake of the classic Pacman game. This project was done in a team of 2 for the Introduction
          to Programming (CS-107) course at
          <strong class="text-red-600">EPFL</strong>.
          <br />
          It includes all ghosts and their AI, a map editor, a leaderboard system, custom menu and more.
        </ProjectItem>
      </div>
    </Block>
  </section>
</div>
