<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import type { TOCItem } from '$lib/types';
  import Block from '$lib/components/Block.svelte';
  import { BsGithub } from 'svelte-icons-pack/bs';
  import SwissFlag from '$lib/components/SwissFlag.svelte';
  import { Icon } from 'svelte-icons-pack';
  import WidgetImage from '$lib/components/WidgetImage.svelte';
  import GitHubActivity from '$lib/components/GitHubActivity.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import { getFeaturedProjects, computeFigureNumbers } from '$lib/data/projects';
  import { FiArrowRight } from 'svelte-icons-pack/fi';
  import ProjectSection from '$lib/components/ProjectSection.svelte';

  const featuredProjects = getFeaturedProjects();
  const professionalProjects = featuredProjects.filter((p) => p.category === 'professional');
  const personalProjects = featuredProjects.filter((p) => p.category === 'personal');

  // Figure numbers are sequential across all featured projects
  const figureNumbers = computeFigureNumbers(featuredProjects);

  const journeyItems = [
    {
      logo: '/images/logo_epfl.png',
      logoClass: 'w-18',
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
      logoClass: 'w-8',
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

  const tocItems: TOCItem[] = [
    { id: 'journey', label: 'Journey' },
    {
      id: 'professional-work',
      label: 'Professional Work',
      subsections: professionalProjects.map((p) => ({ id: p.id, label: p.title })),
    },
    {
      id: 'projects',
      label: 'Projects',
      subsections: personalProjects.map((p) => ({ id: p.id, label: p.title })),
    },
  ];
</script>

<Layout {tocItems}>
  <Block>
    <h1>Hello.</h1>
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
    <GitHubActivity username="leonardcser" class="mt-4" />
  </Block>
  <Block>
    <h2 id="journey">Journey</h2>
    <Timeline items={journeyItems} />
  </Block>
  <ProjectSection
    projects={professionalProjects}
    sectionId="professional-work"
    sectionTitle="Professional Work"
    {figureNumbers}
  />

  <ProjectSection
    projects={personalProjects}
    sectionId="projects"
    sectionTitle="Projects"
    {figureNumbers}
    useGridLayout
    firstBlockPadding
  >
    <a
      href="/projects"
      class="not-prose inline-flex items-center gap-2 text-muted transition-colors hover:text-primary"
      data-umami-event="see-all-projects"
    >
      See all projects
      <Icon src={FiArrowRight} />
    </a>
  </ProjectSection>
</Layout>
