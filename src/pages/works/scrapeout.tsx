import { Award } from "@components/Award/Award";
import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Header } from "@components/Header/Header";
import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import { NavLink } from "@components/NavLink/NavLink";
import { WorkTitleSection } from "@components/pages/works/WorkTitleSection/WorkTitleSection";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";
import { SectionImage } from "@components/sections/SectionImage/SectionImage";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import GRADIENTS from "@lib/gradients";

export default function Scrapeout() {
  return (
    <MainLayout
      preContent={
        <>
          <BackgroundLines
            makeGradient={GRADIENTS.scrapeout}
            height="66vh"
            absolute
          />
          <Header activeHeight="5vh" goHome>
            <NavLink name="Overview" to="overview" />
            <NavLink name="Technologies" to="technologies" />
            <NavLink name="Infrastructure" to="infrastructure" />
            <NavLink name="Design" to="design" />
            <NavLink name="Entreprenurship" to="entreprenurship" />
            <NavLink name="Reflexion" to="reflexion" />
          </Header>
        </>
      }
    >
      <WorkTitleSection title="Scrapeout" />
      <section id="overview">
        <SectionImage
          image={{
            src: "/gifs/scrapeout.gif",
            alt: "scrapeout homepage website",
            width: 1194,
            height: 720,
          }}
          order={0}
          href="/works/scrapeout"
        >
          <SectionTitle
            title="Overview"
            subtitle="What is Scrapeout?"
            tags={[
              "Typescript",
              "SASS",
              "UI/UX",
              "Django",
              "Terraform",
              "Docker",
              "AWS",
              "PostgreSQL",
              "Neo4j",
            ]}
            fade
          />
          <p>
            Scrapeout is my most ambitious project to date. It has now become a
            full web tool that helps companies identify conflict of interest in
            their data in order to take more informed decisions.
          </p>
          <ResponsiveSplitCols>
            <Award>
              Hackathon
              <br />
              1st Place
            </Award>
            <Award>
              AWS
              <br />
              Certified
            </Award>
          </ResponsiveSplitCols>
        </SectionImage>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.scrapeout} height={100} />
      <section id="technologies">
        <SectionMainTitle title="Development" />
        <SectionTitle
          title="Technologies"
          subtitle="From Flask to Nextjs"
          fade
        />
        <p>
          I started my web development journey with a simple Python Flask app.
          As the complexity of the project grew, I decided to use a frontend
          framework and chose React with JavaScript. This was my first rewrite.
          To further expand the project, I moved to Nextjs with TypeScript for
          the frontend and Django for the backend.
        </p>
      </section>
      <section id="infrastructure">
        <SectionTitle
          title="Infrastructure"
          subtitle="Setting up for Production"
          fade
        />
        <p>
          Setting up the infrastructure for production was the most complicated
          part of the project. I chose AWS with Terraform for the backend
          infrastructure and Vercel for the frontend. I also integrated a CI/CD
          pipeline with GitLab in order to automate everything. To ensure that
          the infrastructure was working properly, I went through the AWS
          Overdrive program to get a certification.
        </p>
      </section>
      <section id="design">
        <SectionTitle title="Design" subtitle="Customizing the Frontend" fade />
        <p>
          I also enjoyed working on the frontend, building a custom UI library
          with custom SCSS. To make the codebase easier to manage as the project
          grew, I moved the frontend into a monorepo with the documentation
          website and the UI library website. This allowed me to reuse the same
          code and styles for everything.
        </p>
      </section>
      <section id="entreprenurship">
        <SectionTitle
          title="Entrepreneurship"
          subtitle="Learning Beyond Coding"
          fade
        />
        <p>
          Working on this project also taught me a lot about entrepreneurship. I
          had to interact with clients, investors, and handle the
          administrative, legal, and accounting aspects of the project. This
          gave me a better understanding of the business side of things and how
          to manage a project. I also developed leardership and communication
          skills.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.scrapeout} height={100} />
      <section id="reflexion">
        <SectionMainTitle title="Conclusion" />
        <SectionTitle
          title="Reflexion"
          subtitle="A Rewarding Experience"
          fade
        />
        <p>
          Overall, this project was a rewarding experience. I was able to learn
          and apply a variety of skills, from coding to infrastructure and
          entrepreneurship. I am proud of the progress. I am looking forward to
          continuing to develop my skills.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.scrapeout} height="60vh" />
    </MainLayout>
  );
}
