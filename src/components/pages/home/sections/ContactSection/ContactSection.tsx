import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import GRADIENTS from "@lib/gradients";

export const ContactSection = () => {
  return (
    <>
      <section id="contact">
        <SectionTitle title="Send me an Email" subtitle="Contact" />
        <p>leocser632@gmail.com</p>
      </section>
      <BackgroundLines height="60vh" makeGradient={GRADIENTS.main} />
    </>
  );
};
