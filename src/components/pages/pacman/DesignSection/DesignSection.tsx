import Image from "next/image";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";

import styles from "./DesignSection.module.scss";

export const DesignSection: React.FC = () => {
  return (
    <section id="design">
      <div className={styles.container}>
        <Image
          src="/images/pacmanArcade.png"
          alt="pacman arcade"
          width={129}
          height={242}
        />
        <div>
          <SectionTitle
            title="Design"
            subtitle="Arcade-inspired Design Elements"
            fade
          />
          <p>
            For the game&apos;s design, we opted to use custom assets that
            originated from the original game graphics. I added a unique field
            to the game by incorporating an arcade-inspired design with small
            details like glow, retro arcade style, VHS lines, and a joystick
            that moves based on user input. These elements created an immersive
            and nostalgic gaming experience.
          </p>
        </div>
      </div>
    </section>
  );
};
