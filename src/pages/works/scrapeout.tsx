import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Cursor } from "@components/Cursor/Cursor";
import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { WorkTitleSection } from "@components/works/WorkTitleSection/WorkTitleSection";
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
        </>
      }
    >
      <WorkTitleSection title="Scrapeout" />
      <section id="technologies">
        <SectionTitle title="Description" subtitle="What is Scrapeout" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          veniam porro sit error eligendi quasi odio, nesciunt cumque blanditiis
          et quas consequuntur alias architecto sequi in, hic animi velit?
          Labore?
        </p>
      </section>
    </MainLayout>
  );
}
