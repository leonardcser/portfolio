import { FullSectionContainer } from "@components/sections/FullSectionContainer/FullSectionContainer";

import styles from "./HomeSection.module.scss";

export const HomeSection: React.FC = () => {
  return (
    <FullSectionContainer sectionId="home" style={{ justifyContent: "center" }}>
      <div className={styles.container}>
        <h1 className={styles.title}>Leonard Cseres</h1>
        <h3 className={styles.subtitle}>Data Scientist</h3>
        <h3 className={styles.subtitle}>Web Developer</h3>
        <h3 className={styles.subtitle}>Designer</h3>
      </div>
    </FullSectionContainer>
  );
};
