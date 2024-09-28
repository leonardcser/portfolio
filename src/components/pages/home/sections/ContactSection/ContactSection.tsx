import { FiArrowUpRight } from "react-icons/fi";
import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import GRADIENTS from "@lib/gradients";

import styles from "./ContactSection.module.scss";

export const ContactSection: React.FC = () => {
  const email = "leonard.cseres@devleo.ch";
  return (
    <>
      <section id="contact">
        <SectionTitle title="Send me an Email" subtitle="Contact" />
        <a className={styles["email-container"]} href={`mailto:${email}`}>
          <p className={styles.email}>{email}</p>
          <FiArrowUpRight size={35} />
        </a>
      </section>
      <BackgroundLines height="60vh" makeGradient={GRADIENTS.main} />
    </>
  );
};
