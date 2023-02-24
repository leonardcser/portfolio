import { GoHome } from "@components/GoHome/GoHome";
import { FullSectionContainer } from "@components/sections/FullSectionContainer/FullSectionContainer";

import styles from "./ErrorTitleSection.module.scss";

interface Props {
  title: string;
  code: number;
}

export const ErrorTitleSection: React.FC<Props> = ({ title, code }) => {
  return (
    <FullSectionContainer
      sectionId="errorTitleSection"
      height="100vh"
      className={styles.container}
    >
      <GoHome back={false} />
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.code}>{code}</h2>
    </FullSectionContainer>
  );
};
