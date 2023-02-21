import styles from "./FullSectionContainer.module.css";

interface Props {
  children: React.ReactNode;
  sectionId: string;
  style?: React.CSSProperties;
  height?: number | string;
}

export const FullSectionContainer: React.FC<Props> = ({
  children,
  sectionId,
  style,
  height = "100vh",
}) => {
  return (
    <section
      id={sectionId}
      className={styles["section-container"]}
      style={{ ...style, height }}
    >
      {children}
    </section>
  );
};
