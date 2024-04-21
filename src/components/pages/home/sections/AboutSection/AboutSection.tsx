import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { Timeline } from "@components/Timeline/Timeline";
import GRADIENTS from "@lib/gradients";

const data = [
  {
    imagePath: "/images/logo_epfl.png",
    title: "Ecole Polytechnique Fédérale de Lausanne",
    description:
      "My time at EPFL was instrumental in taking the right development path. My passion for computer science was ignited here.",
    date: "2020-2023",
  },
  {
    imagePath: "/images/logo_epflentrepreneurclub.png",
    title: "EPFL Entrepeneur Club",
    description:
      "During my studies, I was a member of the EPFL Entrepreneur Club where I was able to learn from and collaborate with other entrepreneurs.",
    date: "2021-2023",
  },
  {
    imagePath: "/images/logo_scrapeout.png",
    title: "Scrapeout",
    description:
      "With interest in data analytics, I founded Scrapeout. I was able to learn about real life entrepreneurship and manage challenges along the business growth.",
    date: "2021-2023",
  },
  {
    imagePath: "/images/logo_heig-vd.png",
    title: "HEIG-VD",
    description:
      "I am currently studying at HEIG-VD in order to deepen my knowledge in software development. I am also working as a student assistant working on various ML and MLOps projects.",
    date: "2023-now",
  },
];

export const AboutSection: React.FC = () => {
  return (
    <>
      <section id="about">
        <SectionTitle title="My Story" subtitle="About" fade />
        <p>
          As a data-driven entrepreneur with a passion for tech, I bring a
          unique combination of skills to solve human problems. With my
          knowledge in UI/UX design, data analytics, software and web
          development combined with business mindset, I bring to life unique
          ideas.
        </p>
        <Timeline items={data} />
      </section>
      <BackgroundLines height={100} makeGradient={GRADIENTS.main} />
    </>
  );
};
