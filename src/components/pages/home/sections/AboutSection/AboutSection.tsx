import Image from "next/image";
import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Logos } from "@components/Logos/Logos";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { Timeline } from "@components/Timeline/Timeline";
import GRADIENTS from "@lib/gradients";

export const AboutSection = () => {
  return (
    <>
      <section id="about">
        <SectionTitle title="My Story" subtitle="About" />
        <p>
          As a data-driven entrepreneur with a passion for tech, I bring a
          unique combination of skills to solve human problems. My knowledge in
          UI/UX design, data analytics, software and web development combined
          with business mindset, I bring to life unique ideas.
        </p>
        <Timeline
          items={[
            {
              imagePath: "/images/logo_epfl.png",
              title: "Ecole Polytechnique Fédérale de Lausanne",
              description:
                "My time at EPFL was instrumental in taking the right development path. My passion for computer science was ignited here.",
              date: "2019-2023",
            },
            {
              imagePath: "/images/logo_epflentrepreneurclub.png",
              title: "EPFL Entrepeneur Club",
              description:
                "During my studies, I was a member of the EPFL Entrepreneur Club where I was able to learn from and collaborate with other entrepreneurs.",
              date: "2020-2023",
            },
            {
              imagePath: "/images/logo_scrapeout.png",
              title: "Scrapeout",
              description:
                "With interest in data analytics, I founded Scrapeout. I was able to learn about real life entrepreneurship and manage challenges along the business growth.",
              date: "2020-2023",
            },
          ]}
        />

        {/* <Logos
          logos={[
            {
              path: "logo_epfl.png",
              width: 175,
              height: 75,
              subtitle: "Ecole Polytechnique Fédérale de Lausanne",
              text: "My time at EPFL was instrumental in shaping my career path. My passion for computer science was ignited here.",
            },
            {
              path: "logo_epflentrepreneurclub.png",
              width: 75,
              height: 75,
              subtitle: "EPFL Entrepeneur Club",
              text: "During my studies, I was a member of the EPFL Entrepreneur Club. I was able to learn from and collaborate with other entrepreneurs.",
            },
            {
              path: "logo_scrapeout.png",
              width: 75,
              height: 75,
              subtitle: "Scrapeout",
              text: "With interest in data analytics, I founded Scrapeout, a data analytics company. I was able to learn about the ins and outs of running a business.",
            },
          ]}
        /> */}
      </section>
      <BackgroundLines height={100} makeGradient={GRADIENTS.main} />
    </>
  );
};
