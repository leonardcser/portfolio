import { GoHome } from "@components/GoHome/GoHome";
import { FullSectionContainer } from "@components/sections/FullSectionContainer/FullSectionContainer";

import styles from "./WorkTitleSection.module.scss";

interface Props {
  title: string;
}

export const WorkTitleSection: React.FC<Props> = ({ title }) => {
  return (
    <FullSectionContainer sectionId="workTitleSection" height="66vh">
      <GoHome />
      <h1 className={styles.title}>{title}</h1>
    </FullSectionContainer>
  );
};
