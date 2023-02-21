import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Cursor } from "@components/Cursor/Cursor";
import { Header } from "@components/Header/Header";
import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import { NavLink } from "@components/NavLink/NavLink";
import { HighlightsSection } from "@components/pages/autoscout24/sections/HighlightsSection/HighlightsSection";
import { SectionCodeBlock } from "@components/sections/SectionCodeBlock/SectionCodeBlock";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { WorkTitleSection } from "@components/works/WorkTitleSection/WorkTitleSection";
import { AUTOSCOUT24_EXAMPLE_SHORT } from "@lib/codeSnippets";
import GRADIENTS from "@lib/gradients";

export default function AutoScout24() {
  return (
    <MainLayout
      preContent={
        <>
          <BackgroundLines
            makeGradient={GRADIENTS.autoscout24}
            height="66vh"
            absolute
          />
          <Header activeHeight="66vh">
            <NavLink name="Overview" to="overview" />
            <NavLink name="Highlights" to="highlights" />
            <NavLink name="Packaging" to="packaging" />
            <NavLink name="Reflexion" to="reflexion" />
          </Header>
        </>
      }
    >
      <WorkTitleSection title="AutoScout24 API" />
      <section id="overview">
        <SectionCodeBlock
          codeBlockProps={{
            ...AUTOSCOUT24_EXAMPLE_SHORT,
            style: { fontSize: "0.9rem" },
          }}
        >
          <SectionTitle
            title="Overview"
            subtitle="AutoScout24 API Wrapper"
            tags={["Selenium", "Python"]}
            fade
          />
          <p>
            This project involved building an API wrapper for the popular car
            listing website, AutoScout24, using Python and various libraries
            such as Selenium and Beautiful Soup.
          </p>
          <p>
            The aim was to create a user-friendly API with custom validator
            classes, a query encoder factory, headless support with connection
            retries, custom exceptions, and enums for search or details function
            parameters. The end product was packaged into a pip package.
          </p>
        </SectionCodeBlock>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.autoscout24} height={100} />
      <HighlightsSection />
      <section id="packaging">
        <SectionTitle title="Packaging" subtitle="Python Pip" fade />
        <p>
          The AutoScout24 API wrapper was packaged into a pip package, making it
          easy for other developers to use the project in their own code. The
          package includes all of the necessary files and dependencies, and can
          be installed with a single command.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.autoscout24} height={100} />
      <section id="reflexion">
        <SectionMainTitle title="Conclusion" />
        <SectionTitle title="Reflexion" subtitle="Learning Experience" fade />
        <p>
          The AutoScout24 API wrapper was packaged into a pip package, making it
          easy for other developers to use the project in their own code. The
          package includes all of the necessary files and dependencies, and can
          be installed with a single command.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.autoscout24} height="60vh" />
    </MainLayout>
  );
}
