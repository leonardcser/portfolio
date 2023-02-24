import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Header } from "@components/Header/Header";
import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import { NavLink } from "@components/NavLink/NavLink";
import { AboutSection } from "@components/pages/home/sections/AboutSection/AboutSection";
import { ContactSection } from "@components/pages/home/sections/ContactSection/ContactSection";
import { HomeSection } from "@components/pages/home/sections/HomeSection/HomeSection";
import { WorksSection } from "@components/pages/home/sections/WorksSection/WorksSection";
import GRADIENTS from "@lib/gradients";

export default function Home() {
  return (
    <MainLayout
      preContent={
        <>
          <BackgroundLines absolute makeGradient={GRADIENTS.main} />
          <Header>
            <NavLink name="About" to="about" />
            <NavLink name="Works" to="works" />
            <NavLink name="Contact" to="contact" />
          </Header>
        </>
      }
    >
      <HomeSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
    </MainLayout>
  );
}
